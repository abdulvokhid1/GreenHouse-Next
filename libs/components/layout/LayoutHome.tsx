import React, { useEffect } from 'react';
import useDeviceDetect from '../../hooks/useDeviceDetect';
import Head from 'next/head';
import Top from '../Top';
import Footer from '../Footer';
import { Stack } from '@mui/material';
import FiberContainer from '../common/FiberContainer';
import HeaderFilter from '../homepage/HeaderFilter';
import { userVar } from '../../../apollo/store';
import { useReactiveVar } from '@apollo/client';
import { getJwtToken, updateUserInfo } from '../../auth';
import Chat from '../Chat';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

const withLayoutMain = (Component: any) => {
	return (props: any) => {
		const device = useDeviceDetect();
		const user = useReactiveVar(userVar);

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
						<title>Nestar</title>
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
						<meta name={'title'} content={`GreenShop`} />
					</Head>
					<Stack id="pc-wrap">
						<Stack id={'top'}>
							<Top />
						</Stack>

						<Stack className={'header-main'}>
							{/* <FiberContainer /> */}
							<Stack className={'main-header'}>
								<div className="mainheader-1">
									<p style={{ marginTop: '60px' }}>Welcome to GreenShop</p>
									<h1 className="bigletter">
										LET'S MAKE A BETTER <span className="bigletterdifferent">PLANET</span>
									</h1>
									<p className="description">
										We are an online plant shop offering a wide range of cheap and trendy plants. Use our plants to
										create an unique Urban Jungle. Order your favorite plants!
									</p>
									<button className="shopbtn">
										{' '}
										<a style={{ color: 'white' }} href="/property">
											SHOP NOW
										</a>
									</button>
								</div>
								<div className="mainheader-2">
									<img className="smallflower" src="/img/property/small.png" alt="" />
									<img className="bigflower" src="/img/property/bigplant.png" alt="" />
								</div>
							</Stack>
							<Stack className={'container'}>
								<HeaderFilter />
							</Stack>
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

export default withLayoutMain;
