package com.knewless.core.notification;

import com.knewless.core.notification.model.Notification;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.sql.Timestamp;
import java.util.List;
import java.util.UUID;

@Repository
public interface NotificationRepository extends JpaRepository<Notification, UUID> {

    @Query("select n from Notification n where n.user.id = :userId and n.isRead = false order by n.createdAt")
    List<Notification> findUsersUnreadNotifications(@Param("userId") UUID userId);

    @Query("select n from Notification n where n.user.id = :userId order by n.isRead desc, n.createdAt ")
    List<Notification> findAllByUser(@Param("userId") UUID userId);

    @Transactional
    @Modifying
    void deleteById(UUID id);

    @Transactional
    @Modifying
    @Query("update Notification n set n.isRead = true where n.id = :notificationId")
    void readNotification(@Param("notificationId") UUID notificationId);

    @Query("select n from Notification n where n.user.id = :userId and n.isRead = true order by n.createdAt")
    List<Notification> getRead(@Param("userId") UUID userId, Pageable page);

    @Transactional
    @Modifying
    void deleteAllByUser_Id(UUID id);

    @Transactional
    @Modifying
    @Query("update Notification n set n.isRead = true where n.user.id = :userId")
    void readAllUserNotifications(@Param("userId") UUID userId);
    
    @Query("select (count(n) > 0) from Notification n where n.user.id = :userId and n.sourceId = :goalId " +
            "and n.sourceType = 'PERSONAL_GOAL_COMPLETION' and n.createdAt >= :from and n.createdAt <= :to")
    boolean dailyProgressNotificationForGoalByRange(Timestamp from, Timestamp to, UUID goalId, UUID userId);
}
