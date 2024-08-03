import FacebookOutlinedIcon from '@mui/icons-material/FacebookOutlined';
import InstagramIcon from '@mui/icons-material/Instagram';
import TelegramIcon from '@mui/icons-material/Telegram';
import TwitterIcon from '@mui/icons-material/Twitter';
import useDeviceDetect from '../hooks/useDeviceDetect';
import { Stack, Box } from '@mui/material';
import moment from 'moment';
import { Margin } from '@mui/icons-material';

const Footer = () => {
	const device = useDeviceDetect();

	if (device == 'mobile') {
		return (
			<Stack className={'footer-container'}>
				<Stack className={'main'}>
					<Stack className={'left'}>
						<Box component={'div'} className={'footer-box'}>
							<img src="/img/logo/logoWhite.svg" alt="" className={'logo'} />
						</Box>
						<Box component={'div'} className={'footer-box'}>
							<span>total free customer care</span>
							<p>+82 10 4867 2909</p>
						</Box>
						<Box component={'div'} className={'footer-box'}>
							<span>nee live</span>
							<p>+82 10 4867 2909</p>
							<span>Support?</span>
						</Box>
						<Box component={'div'} className={'footer-box'}>
							<p>follow us on social media</p>
							<div className={'media-box'}>
								<FacebookOutlinedIcon />
								<TelegramIcon />
								<InstagramIcon />
								<TwitterIcon />
							</div>
						</Box>
					</Stack>
					<Stack className={'right'}>
						<Box component={'div'} className={'bottom'}>
							<div>
								<strong>Popular Search</strong>
								<span>Property for Rent</span>
								<span>Property Low to hide</span>
							</div>
							<div>
								<strong>Quick Links</strong>
								<span>Terms of Use</span>
								<span>Privacy Policy</span>
								<span>Pricing Plans</span>
								<span>Our Services</span>
								<span>Contact Support</span>
								<span>FAQs</span>
							</div>
							<div>
								<strong>Discover</strong>
								<span>Seoul</span>
								<span>Gyeongido</span>
								<span>Busan</span>
								<span>Jejudo</span>
							</div>
						</Box>
					</Stack>
				</Stack>
				<Stack className={'second'}>
					<span>© GreenShop - All rights reserved. Nestar {moment().year()}</span>
				</Stack>
			</Stack>
		);
	} else {
		return (
			<Stack className={'footer-container'}>
				{/* <Stack className={'main'}>
					<Stack className={'left'}>
						<Box component={'div'} className={'footer-box'}>
							<img src="/img/logo/logoWhite.svg" alt="" className={'logo'} />
						</Box>
						<Box component={'div'} className={'footer-box'}>
							<span>total free customer care</span>
							<p>+82 10 4867 2909</p>
						</Box>
						<Box component={'div'} className={'footer-box'}>
							<span>nee live</span>
							<p>+82 10 4867 2909</p>
							<span>Support?</span>
						</Box>
						<Box component={'div'} className={'footer-box'}>
							<p>follow us on social media</p>
							<div className={'media-box'}>
								<FacebookOutlinedIcon />
								<TelegramIcon />
								<InstagramIcon />
								<TwitterIcon />
							</div>
						</Box>
					</Stack>
					<Stack className={'right'}>
						<Box component={'div'} className={'top'}>
							<strong>keep yourself up to date</strong>
							<div>
								<input type="text" placeholder={'Your Email'} />
								<span>Subscribe</span>
							</div>
						</Box>
						<Box component={'div'} className={'bottom'}>
							<div>
								<strong>Popular Search</strong>
								<span>Property for Rent</span>
								<span>Property Low to hide</span>
							</div>
							<div>
								<strong>Quick Links</strong>
								<span>Terms of Use</span>
								<span>Privacy Policy</span>
								<span>Pricing Plans</span>
								<span>Our Services</span>
								<span>Contact Support</span>
								<span>FAQs</span>
							</div>
							<div>
								<strong>Discover</strong>
								<span>Seoul</span>
								<span>Gyeongido</span>
								<span>Busan</span>
								<span>Jejudo</span>
							</div>
						</Box>
					</Stack>
				</Stack>
				<Stack className={'second'}>
					<span>© Nestar - All rights reserved. Nestar {moment().year()}</span>
					<span>Privacy · Terms · Sitemap</span>
				</Stack> */}
				<Stack className={'main'}>
					<Stack className={'plant-info'}>
						<div className={'plant-care'}>
							<img style={{ width: '85px', height: '85px', marginLeft: '10px' }} src="/img/flag/garden.svg" alt="" />
							<h4>Garden Care</h4>
							<p>We are an online plant shop offering a wide range of cheap and trendy plants.</p>
						</div>
						<div style={{ border: '1px solid #45a358', height: '187px', marginTop: '15px' }}></div>{' '}
						<div className={'plant-care'}>
							<img style={{ width: '85px', height: '85px', marginLeft: '10px' }} src="/img/icons/fat.svg" alt="" />
							<h4>Plant Renovation</h4>
							<p>We are an online plant shop offering a wide range of cheap and trendy plants.</p>
						</div>
						<div style={{ border: '1px solid #45a358', height: '187px', marginTop: '15px' }}></div>
						<div className={'plant-care'}>
							<img style={{ width: '85px', height: '85px', marginLeft: '10px' }} src="/img/flag/garden.svg" alt="" />
							<h4>Watering Graden</h4>
							<p>We are an online plant shop offering a wide range of cheap and trendy plants.</p>
						</div>
						<div style={{ border: '1px solid #45a358', height: '187px', marginTop: '15px' }}></div>
						<Stack className={'newsletter'}>
							<h4>Would you like to join newsletters?</h4>
							<div style={{ marginTop: '15px' }}>
								<input
									type="text"
									placeholder="Enter your email address..."
									style={{ width: '254px', height: '40px', border: 'none' }}
								/>
								<button
									style={{
										width: '85px',
										height: '40px',
										color: 'white',
										backgroundColor: '#45a358',
										border: 'none',
										fontFamily: 'Cera Pro',
										fontSize: '17px',
										fontWeight: '700px',
										lineHeight: '16px',
									}}
								>
									Subscribe
								</button>
							</div>
							<p className="some-txt">
								We usually post offers and challenges in newsletter. We’re your online houseplant destination. We offer
								a wide range of houseplants and accessories shipped directly from our (green)house to yours!
							</p>
						</Stack>
					</Stack>
					<Stack className={'contact'}>
						<div style={{ marginLeft: '20px' }}>
							<img src="/img/logo/Logo.png" alt="" />
						</div>
						<div className={'contact-box'}>
							<img src="/img/icons/Location.png" alt="" className="icon" />
							<div style={{ width: '176px', height: '44px' }}>
								<p>70 West Buckingham Ave. Farmingdale, NY 11735</p>
							</div>
						</div>
						<div className={'contact-box'}>
							<img src="/img/icons/message.png" alt="" className="icon" />
							<p>contact@greenshop.com</p>
						</div>
						<div className={'contact-box'}>
							<img src="/img/icons/calling.png" alt="" className="icon" />
							<p>+821055049698</p>
						</div>
					</Stack>
					<Stack className={'category'}>
						<div className={'first-box'}>
							<h1>My Account</h1>
							<p>My Account</p>
							<p>Our stores</p>
							<p>Contact us</p>
							<p>Career</p>
							<p>Specials</p>
						</div>
						<div className={'first-box'}>
							<h1>Help & Guide</h1>
							<p>Help Center</p>
							<p>How to Buy</p>
							<p>Shipping & Delivery</p>
							<p>Product Policy</p>
							<p>How to Return</p>
						</div>

						<div className={'first-box'}>
							<h1>Categories</h1>
							<p>House Plants</p>
							<p>Seeds</p>
							<p>Small Plants</p>
							<p>Career</p>
							<p>Accessories</p>
						</div>
						<div className={'last-box'}>
							<h1>Social Media</h1>
							<div className={'media'}>
								<img className="social" src="/img/icons/facebook.png" alt="" />
								<img className="social" src="/img/icons/instagram.png" alt="" />
								<img className="social" src="/img/icons/twitter.png" alt="" />
								<img className="social" src="/img/icons/linkedin.png" alt="" />
								<img className="social" src="/img/icons/union.png" alt="" />
							</div>
							<h1 style={{ marginTop: '25px' }}>We Accept</h1>
							<img src="/img/icons/payment.png" alt="" style={{ marginTop: '20px' }} />
						</div>
					</Stack>
				</Stack>
				<div className="reserved">© 2024 GreenShop. All Rights Reserved.</div>
			</Stack>
		);
	}
};

export default Footer;
