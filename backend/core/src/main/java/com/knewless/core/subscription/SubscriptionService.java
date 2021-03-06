package com.knewless.core.subscription;

import com.knewless.core.author.AuthorRepository;
import com.knewless.core.author.model.Author;
import com.knewless.core.db.SourceType;
import com.knewless.core.exception.custom.ResourceNotFoundException;
import com.knewless.core.messaging.MessageSender;
import com.knewless.core.messaging.userMessage.NotificationsMessage;
import com.knewless.core.messaging.userMessage.UserMessageType;
import com.knewless.core.notification.NotificationService;
import com.knewless.core.notification.dto.NotificationDto;
import com.knewless.core.student.StudentRepository;
import com.knewless.core.subscription.dto.SubscriptionDto;
import com.knewless.core.subscription.mapper.SubscriptionMapper;
import com.knewless.core.subscription.model.Subscription;
import com.knewless.core.user.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;
import java.util.UUID;

@Service
public class SubscriptionService {

    private final SubscriptionRepository subscriptionRepository;
    private final UserRepository userRepository;
    private final MessageSender messageSender;
    private final NotificationService notificationService;
    private final AuthorRepository authorRepository;
    private final StudentRepository studentRepository;

    @Autowired
    public SubscriptionService(SubscriptionRepository subscriptionRepository, UserRepository userRepository,
                               MessageSender messageSender, NotificationService notificationService,
                               AuthorRepository authorRepository, StudentRepository studentRepository) {
        this.subscriptionRepository = subscriptionRepository;
        this.userRepository = userRepository;
        this.messageSender = messageSender;
        this.notificationService = notificationService;
        this.authorRepository = authorRepository;
        this.studentRepository = studentRepository;
    }

    public void subscribe(SubscriptionDto subscription) {
        var user = userRepository.findById(subscription.getUserId()).orElseThrow(
                () -> new ResourceNotFoundException("User", "id", subscription.getUserId())
        );
        if (isAuthorSelfSubscription(subscription)) {
            return;
        }
        var result = subscriptionRepository.findBySource(
                subscription.getUserId(), subscription.getSourceId(), subscription.getSourceType()
        );
        if (result.isEmpty()) {
            subscriptionRepository.save(SubscriptionMapper.fromDto(subscription, user));
            if (subscription.getSourceType() == SourceType.AUTHOR) {
                String message = studentRepository.getStudentNameByUserId(subscription.getUserId()) + " follows you.";
                var build = NotificationDto.builder()
                        .id(UUID.randomUUID())
                        .sourceId(subscription.getSourceId().toString())
                        .date(new Date())
                        .isRead(false)
                        .text(message)
                        .sourceType(subscription.getSourceType().toString())
                        .build();
                Author author = authorRepository.findOneById(subscription.getSourceId()).orElseThrow();
                notificationService.createNotification(build, author.getUser().getId());
                NotificationsMessage notificationsMessage = new NotificationsMessage();
                notificationsMessage.setReceiverId(author.getUser().getId().toString());
                notificationsMessage.setBody(build);
                notificationsMessage.setType(UserMessageType.PERSONAL);
                messageSender.notifyUser(notificationsMessage);
            }

        }
    }

    public boolean isSubscribe(UUID userId, UUID sourceId, SourceType sourceType) {
        List<Subscription> result = subscriptionRepository.findBySource(userId, sourceId, sourceType);
        return !result.isEmpty();
    }

    public void unsubscribe(SubscriptionDto subscription) {
        if (isAuthorSelfSubscription(subscription)) {
            return;
        }
        subscriptionRepository.deleteBySource(
                subscription.getUserId(), subscription.getSourceId(), subscription.getSourceType()
        );
    }

    public void notifySubscribers(UUID subscriberId, SourceType subscriberType, UUID sourceId, SourceType sourceType,
                                  String message) {
        var build = NotificationDto.builder()
                .id(UUID.randomUUID())
                .sourceId(sourceId.toString())
                .date(new Date())
                .isRead(false)
                .text(message)
                .sourceType(sourceType.toString())
                .build();
        var subscribers = subscriptionRepository.findAllBySource(subscriberId, subscriberType);
        for (UUID subscriber : subscribers) {
            notificationService.createNotification(build, subscriber);
            NotificationsMessage notificationsMessage = new NotificationsMessage();
            notificationsMessage.setReceiverId(subscriber.toString());
            notificationsMessage.setBody(build);
            notificationsMessage.setType(UserMessageType.PERSONAL);
            messageSender.notifyUser(notificationsMessage);
        }
    }

    private boolean isAuthorSelfSubscription(SubscriptionDto subscription) {
        var author = authorRepository.findByUserId(subscription.getUserId());
        return author.isPresent() && subscription.getSourceId().equals(author.get().getId());
    }

}
