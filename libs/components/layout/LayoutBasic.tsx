import React, { useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/router';
import useDeviceDetect from '../../hooks/useDeviceDetect';
import Head from 'next/head';
import Top from '../Top';
import Footer from '../Footer';
import { Box, Stack } from '@mui/material';
import { getJwtToken, updateUserInfo } from '../../auth';
import Chat from '../Chat';
import { useReactiveVar } from '@apollo/client';
import { userVar } from '../../../apollo/store';
import { useTranslation } from 'next-i18next';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

const withLayoutBasic = (Component: any) => {
	return (props: any) => {
		const router = useRouter();
		const { t, i18n } = useTranslation('common');
		const device = useDeviceDetect();
		const [authHeader, setAuthHeader] = useState<boolean>(false);
		const user = useReactiveVar(userVar);

		const memoizedValues = useMemo(() => {
			let title = '',
				desc = '',
				bgColor = '';

			switch (router.pathname) {
				case '/property':
					title = 'Plant Search';
					desc = 'We are glad to see you again!';
					bgColor = '#fafafa';

					break;
				case '/agent':
					title = 'Agents Page';
					desc = '';
					bgColor = '#fafafa';

					break;
				case '/agent/detail':
					title = 'Agent Page';
					desc = '';
					bgColor = '#fafafa';

					break;
				case '/mypage':
					title = 'my page';
					desc = '';
					bgColor = '#fafafa';

					break;
				case '/community':
					title = 'Community Page';
					desc = 't';
					bgColor = '#fafafa';

					break;
				case '/community/detail':
					title = 'Community Detail';
					desc = '';
					bgColor = '#fafafa';

					break;
				case '/cs':
					title = 'CS';
					desc = 'We are glad to see you again!';
					bgColor = '#fafafa';

					break;
				case '/account/join':
					title = 'Login/Signup';
					desc = 'Authentication Process';
					bgColor = '#fafafa';

					setAuthHeader(true);
					break;
				case '/member':
					title = 'Member Page';
					desc = '';
					bgColor = '#fafafa';

					break;
				default:
					break;
			}

			return { title, desc, bgColor };
		}, [router.pathname]);

		/** LIFECYCLES **/
		useEffect(() => {
			const jwt = getJwtToken();
			if (jwt) updateUserInfo(jwt);
		}, []);

		/** HANDLERS **/

		if (device == 'mobile') {
			return (
				<>
					<Head>
						<title>GreenShop</title>
						<meta name={'title'} content={`Nestar`} />
					</Head>
					<Stack id="mobile-wrap">
						<Stack id={'top'}>
							<Top />
						</Stack>

						<Stack id={'main'}>
							<Component {...props} />
						</Stack>

						<Stack id={'footer'}>
							<Footer />
						</Stack>
					</Stack>
				</>
			);
		} else {
			return (
				<>
					<Head>
						<title>GreenShop</title>
						<meta name={'title'} content={`Nestar`} />
					</Head>
					<Stack id="pc-wrap">
						<Stack id={'top'}>
							<Top />
						</Stack>

						<Stack
							className={`header-basic ${authHeader && 'auth'}`}
							style={
								{
									// backgroundSize: 'cover',
									// boxShadow: 'inset 10px 40px 150px 40px rgb(24 22 36)',
								}
							}
						>
							<Stack className={'container'}>
								<strong>{t(memoizedValues.title)}</strong>
								<span>{t(memoizedValues.desc)}</span>
							</Stack>

							<div className={'img-wrp'}>
								<img style={{ width: '450px' }} src="img/banner/plant4.jpg" alt="" />
							</div>
						</Stack>

						<Stack id={'main'}>
							<Component {...props} />
						</Stack>

						<Chat />

						<Stack id={'footer'}>
							<Footer />
						</Stack>
					</Stack>
				</>
			);
		}
	};
};

export default withLayoutBasic;
