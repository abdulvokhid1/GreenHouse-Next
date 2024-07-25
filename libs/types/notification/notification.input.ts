import { NotificationGroup, NotificationStatus, NotificationType } from '../../enums/notification.enum';

export interface notificationInput {
	notificationType: NotificationType;

	notificationStatus: NotificationStatus;

	notificationGroup: NotificationGroup;

	notificationTitle: string;

	notificationDesc: string;

	authorId: string;

	receiverId: string;

	propertyId?: string;

	articleId?: string;

	/** from aggregation **/
}
