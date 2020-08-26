package com.knewless.core.notification;

import com.knewless.core.notification.dto.NotificationDto;
import com.knewless.core.notification.mapper.NotificationMapper;
import com.knewless.core.notification.model.Notification;
import com.knewless.core.user.UserRepository;
import com.knewless.core.user.UserService;
import com.knewless.core.user.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class NotificationService {

    @Autowired
    NotificationRepository notificationRepository;
    @Autowired
    UserRepository userRepository;

    public List<NotificationDto> getUnreadNotifications(UUID userId) {
        return notificationRepository.findUsersUnreadNotifications(userId)
                .stream().map(NotificationDto::fromEntity).collect(Collectors.toList());
    }

    public void setNotificationRead(UUID notificationId) {
        notificationRepository.readNotification(notificationId);
    }

    public List<NotificationDto> getInitNotifications(UUID userId) {
        var unread = notificationRepository.findUsersUnreadNotifications(userId)
                .stream().map(NotificationDto::fromEntity).collect(Collectors.toList());
        if (unread.size() < 10) {
            var read = notificationRepository.getRead(userId, PageRequest.of(0, 10 - unread.size()))
                    .stream().map(NotificationDto::fromEntity).collect(Collectors.toList());
            read.addAll(unread);
            return read;
        }
        Collections.reverse(unread);
        return unread;
    }

    public void createNotification(NotificationDto notificationDto, UUID userId) {
        User user = userRepository.findById(userId).orElseThrow();
        notificationRepository.save(NotificationMapper.fromDto(notificationDto, user));

    }

    public void deleteNotification(UUID id) {
        notificationRepository.deleteById(id);
    }

    public void deleteAllByUserId(UUID userId) {
        notificationRepository.deleteAllByUser_Id(userId);
    }

    public void readAllUserNotifications(UUID userId) {
        notificationRepository.readAllUserNotifications(userId);
    }

    public List<NotificationDto> getAll(UUID userId) {
        return notificationRepository.findAllByUser(userId).stream()
                .map(NotificationDto::fromEntity).collect(Collectors.toList());
    }
}
