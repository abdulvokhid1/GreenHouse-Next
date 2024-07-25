import { Member } from '../member/member';
import { NotificationGroup, NotificationStatus, NotificationType } from '../../enums/notification.enum';

export interface Notification {
	_id: string;

	notificationType: NotificationType;

	notificationStatus: NotificationStatus;

	notificationGroup: NotificationGroup;

	notificationTitle: string;

	notificationDesc: string;

	authorId: string;

	receiverId: string;

	propertyId: string;

	articleId: string;

	createdAt: Date;

	/** from aggregation **/

	memberData?: Member;
}

export interface Notifications {
	list: Notification[];

	// @Field(() => [TotalCounter], { nullable: true })
	// metaCounter: TotalCounter[];
}
