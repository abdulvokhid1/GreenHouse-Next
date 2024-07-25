import * as React from 'react';
import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import NotificationsOutlinedIcon from '@mui/icons-material/NotificationsOutlined';
import { Comment } from '../types/comment/comment';
import { useQuery, useReactiveVar } from '@apollo/client';
import { GET_COMMENTS, GET_NOTIFICATIONS, GET_PROPERTIES, GET_PROPERTY } from '../../apollo/user/query';
import { T } from '../types/common';
import { useEffect, useState } from 'react';
import { CommentInput, CommentsInquiry } from '../types/comment/comment.input';
import { Stack } from 'phosphor-react';
import { useRouter } from 'next/router';
import { CommentGroup } from '../enums/comment.enum';
import { userVar } from '../../apollo/store';
import { Property } from '../types/property/property';
import { Direction } from '../enums/common.enum';
import { PropertiesInquiry } from '../types/property/property.input';
import { Notification } from '../types/notification/notifiaction';

const BasicPopover = ({ initialInput, initialComment }: any) => {
	const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null);
	const [commentInquiry, setCommentInquiry] = useState<CommentsInquiry>(initialComment);
	const [propertyComments, setPropertyComments] = useState<Comment[]>([]);
	const [commentTotal, setCommentTotal] = useState<number>(0);
	const [propertyId, setPropertyId] = useState<string | null>(null);
	const user = useReactiveVar(userVar);
	const [notification, setNotification] = useState<Notification[]>([]);

	// Apollo
	const {
		loading: getNotificationsLoading,
		data: getNotificationsData,
		error: getNotificationsError,
		refetch: getNotificationsRefetch,
	} = useQuery(GET_NOTIFICATIONS, {
		fetchPolicy: 'cache-and-network',
		variables: { input: '' },
		// skip: !commentInquiry.search.commentRefId,
		notifyOnNetworkStatusChange: true,
		onCompleted: (data: T) => {
			if (data?.getNotifications) setNotification(data?.getNotifications);
			// setCommentTotal(data?.getComments?.metaCounter[0]?.total ?? 0);
		},
	});

	console.log('notification:', notification);

	/** LIFECYCLES **/

	const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
		setAnchorEl(event.currentTarget);
	};

	const handleClose = () => {
		setAnchorEl(null);
	};

	const open = Boolean(anchorEl);
	const id = open ? 'simple-popover' : undefined;

	console.log('user', user);
	return (
		<div>
			<NotificationsOutlinedIcon
				style={{ background: 'black', cursor: 'pointer' }}
				className={'notification-icon'}
				onClick={handleClick}
			/>
			<Popover
				id={id}
				open={open}
				anchorEl={anchorEl}
				onClose={handleClose}
				anchorOrigin={{
					vertical: 'bottom',
					horizontal: 'left',
				}}
			>
				<Typography sx={{ p: 2, width: '200px', height: '300px', background: 'purple', color: 'white' }}>
					{notification?.map((notify: Notification) => {
						return <div>{notify.notificationDesc}</div>;
					})}
				</Typography>
			</Popover>
		</div>
	);
};

export default BasicPopover;
