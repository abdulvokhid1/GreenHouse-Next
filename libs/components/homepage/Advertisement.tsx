import React from 'react';
import useDeviceDetect from '../../hooks/useDeviceDetect';
import { Box, Stack } from '@mui/material';

const Advertisement = () => {
	const device = useDeviceDetect();

	if (device == 'mobile') {
		return (
			<Stack className={'ads-frame'}>
				<video
					autoPlay
					muted
					loop
					playsInline
					preload="auto"
					style={{ width: '100%', height: '100%', objectFit: 'cover' }}
				>
					<source src="/video/ads.mov" type="video/mp4" />
				</video>
			</Stack>
		);
	} else {
		return (
			<Stack className={'ads-frame'}>
				<div className="ads-wrapper">
					<Box className={'first-part'}>
						<p>The ceramic cylinder planters come with a wooden stand to help elevate your plants off the ground.</p>
						<b>
							Discover how you can offset your adventure's carbon emissions and support the sustainable initiatives
							practiced by our operators worldwide.
						</b>
					</Box>
					<Box className={'second-part'}>
						<div className="first-wrp">
							<img className="first-flower" src="img/banner/simon.jpg" alt="" />
						</div>
						<div className="second-flower-wrp">
							<img className="second-flower" src="img/banner/indoor.jpg" alt="" />
							<img className="second-flower2" src="img/banner/money.jpeg" alt="" />
						</div>
						<div className="third-flower-wrp">
							<img className="third-flower-small" src="img/banner/scind.jpeg" alt="" />
							<img className="third-flower" src="img/banner/plant4.jpg" alt="" />
						</div>
					</Box>
				</div>
			</Stack>
		);
	}
};

export default Advertisement;
