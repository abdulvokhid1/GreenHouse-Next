import * as React from 'react';
import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';
import NotificationsOutlinedIcon from '@mui/icons-material/NotificationsOutlined';
import { useQuery, useReactiveVar } from '@apollo/client';
import { GET_NOTIFICATIONS, GET_PROPERTIES, GET_PROPERTY } from '../../apollo/user/query';
import { T } from '../types/common';
import { useState } from 'react';
import { userVar } from '../../apollo/store';
import { Notification } from '../types/notification/notifiaction';
import { Badge, Box } from '@mui/material';

const BasicPopover = ({ initialInput, initialComment }: any) => {
	const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null);
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
			<Badge badgeContent={notification.length} color="secondary">
				<NotificationsOutlinedIcon
					style={{ background: '#45a358', cursor: 'pointer', borderRadius: '20px', padding: '2px' }}
					className={'notification-icon'}
					onClick={handleClick}
				/>
			</Badge>
			<Popover
				id={id}
				open={open}
				anchorEl={anchorEl}
				onClose={handleClose}
				anchorOrigin={{
					vertical: 'top',
					horizontal: 'right',
				}}
				transformOrigin={{
					vertical: 'top',
					horizontal: 'left',
				}}
			>
				<Box p={2}>
					<p>You have {notification.length} new notifications</p>
				</Box>
				<Typography sx={{ p: 2, width: '500px', height: '100%', color: 'black', border: '2px solid green' }}>
					{notification?.map((notify: Notification) => {
						return <div>{notify.receiverId}</div>;
					})}
				</Typography>
			</Popover>
		</div>
	);
};

export default BasicPopover;
