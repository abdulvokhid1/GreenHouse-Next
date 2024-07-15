import React, { useCallback, useEffect, useRef } from 'react';
import { useState } from 'react';
import { useRouter, withRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import { getJwtToken, logIn, logOut, signUp, updateUserInfo } from '../auth';
import { Stack, Box, FormGroup, FormControlLabel, Checkbox } from '@mui/material';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import { alpha, styled } from '@mui/material/styles';
import Menu, { MenuProps } from '@mui/material/Menu';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import { CaretDown, Cursor, TextAlignCenter, TextAlignJustify } from 'phosphor-react';
import useDeviceDetect from '../hooks/useDeviceDetect';
import Link from 'next/link';
import NotificationsOutlinedIcon from '@mui/icons-material/NotificationsOutlined';
import { useReactiveVar } from '@apollo/client';
import { userVar } from '../../apollo/store';
import { Height, Logout, Margin } from '@mui/icons-material';
import { REACT_APP_API_URL } from '../config';

import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { sweetMixinErrorAlert } from '../sweetAlert';
import { pink } from '@mui/material/colors';

const style = {
	position: 'absolute' as 'absolute',
	top: '50%',
	left: '50%',
	transform: 'translate(-50%, -50%)',
	width: 500,
	bgcolor: 'background.paper',
	border: 'none',
	boxShadow: 24,
	p: 4,
};
const Top = () => {
	const router = useRouter();
	const device = useDeviceDetect();
	const [input, setInput] = useState({ nick: '', password: '', phone: '', type: 'USER' });
	const [loginView, setLoginView] = useState<boolean>(true);

	const [openLog, setOpenLog] = React.useState(false);
	const handleLOpen = () => setOpenLog(true);
	const handleLClose = () => setOpenLog(false);

	const user = useReactiveVar(userVar);
	const { t, i18n } = useTranslation('common');
	const [anchorEl2, setAnchorEl2] = useState<null | HTMLElement>(null);
	const [lang, setLang] = useState<string | null>('en');
	const drop = Boolean(anchorEl2);
	const [colorChange, setColorChange] = useState(false);
	const [anchorEl, setAnchorEl] = React.useState<any | HTMLElement>(null);
	let open = Boolean(anchorEl);
	const [bgColor, setBgColor] = useState<boolean>(false);
	const [logoutAnchor, setLogoutAnchor] = React.useState<null | HTMLElement>(null);
	const logoutOpen = Boolean(logoutAnchor);

	/////

	/** LIFECYCLES **/
	useEffect(() => {
		if (localStorage.getItem('locale') === null) {
			localStorage.setItem('locale', 'en');
			setLang('en');
		} else {
			setLang(localStorage.getItem('locale'));
		}
	}, [router]);

	useEffect(() => {
		switch (router.pathname) {
			case '/property/detail':
				setBgColor(true);
				break;
			default:
				break;
		}
	}, [router]);

	useEffect(() => {
		const jwt = getJwtToken();
		if (jwt) updateUserInfo(jwt);
	}, []);

	/** HANDLERS **/
	const langClick = (e: any) => {
		setAnchorEl2(e.currentTarget);
	};

	const langClose = () => {
		setAnchorEl2(null);
	};

	const langChoice = useCallback(
		async (e: any) => {
			setLang(e.target.id);
			localStorage.setItem('locale', e.target.id);
			setAnchorEl2(null);
			await router.push(router.asPath, router.asPath, { locale: e.target.id });
		},
		[router],
	);

	const changeNavbarColor = () => {
		if (window.scrollY >= 50) {
			setColorChange(true);
		} else {
			setColorChange(false);
		}
	};

	const handleClose = () => {
		setAnchorEl(null);
	};

	const handleHover = (event: any) => {
		if (anchorEl !== event.currentTarget) {
			setAnchorEl(event.currentTarget);
		} else {
			setAnchorEl(null);
		}
	};

	//////
	const viewChangeHandler = (state: boolean) => {
		setLoginView(state);
	};

	const checkUserTypeHandler = (e: any) => {
		const checked = e.target.checked;
		if (checked) {
			const value = e.target.name;
			handleInput('type', value);
		} else {
			handleInput('type', 'USER');
		}
	};
	const handleInput = useCallback((name: any, value: any) => {
		setInput((prev) => {
			return { ...prev, [name]: value };
		});
	}, []);

	const doLogin = useCallback(async () => {
		console.warn(input);
		try {
			await logIn(input.nick, input.password);
			await router.push(`${router.query.referrer ?? '/'}`);
		} catch (err: any) {
			await sweetMixinErrorAlert(err.message);
		}
	}, [input]);

	const doSignUp = useCallback(async () => {
		console.warn(input);
		try {
			await signUp(input.nick, input.password, input.phone, input.type);
			await router.push(`${router.query.referrer ?? '/'}`);
		} catch (err: any) {
			await sweetMixinErrorAlert(err.message);
		}
	}, [input]);

	const StyledMenu = styled((props: MenuProps) => (
		<Menu
			elevation={0}
			anchorOrigin={{
				vertical: 'bottom',
				horizontal: 'right',
			}}
			transformOrigin={{
				vertical: 'top',
				horizontal: 'right',
			}}
			{...props}
		/>
	))(({ theme }) => ({
		'& .MuiPaper-root': {
			top: '109px',
			borderRadius: 6,
			marginTop: theme.spacing(1),
			minWidth: 160,
			color: theme.palette.mode === 'light' ? 'rgb(55, 65, 81)' : theme.palette.grey[300],
			boxShadow:
				'rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px',
			'& .MuiMenu-list': {
				padding: '4px 0',
			},
			'& .MuiMenuItem-root': {
				'& .MuiSvgIcon-root': {
					fontSize: 18,
					color: theme.palette.text.secondary,
					marginRight: theme.spacing(1.5),
				},
				'&:active': {
					backgroundColor: alpha(theme.palette.primary.main, theme.palette.action.selectedOpacity),
				},
			},
		},
	}));

	if (typeof window !== 'undefined') {
		window.addEventListener('scroll', changeNavbarColor);
	}

	if (device == 'mobile') {
		return (
			<Stack className={'top'}>
				<Link href={'/'}>
					<div>{t('Home')}</div>
				</Link>
				<Link href={'/property'}>
					<div>{t('Properties')}</div>
				</Link>
				<Link href={'/agent'}>
					<div> {t('Agents')} </div>
				</Link>
				<Link href={'/community?articleCategory=FREE'}>
					<div> {t('Community')} </div>
				</Link>
				<Link href={'/cs'}>
					<div> {t('CS')} </div>
				</Link>
			</Stack>
		);
	} else {
		return (
			<Stack className={'navbar'}>
				<Stack className={`navbar-main ${colorChange ? 'transparent' : ''} ${bgColor ? 'transparent' : ''}`}>
					<Stack className={'container'}>
						<Box component={'div'} className={'logo-box'}>
							<Link href={'/'}>
								<img src="/img/logo/Logo.png" alt="" />
							</Link>
						</Box>
						<Box component={'div'} className={'router-box'}>
							<Link href={'/'}>
								<div>{t('Home')}</div>
							</Link>
							<Link href={'/property'}>
								<div>{t('Properties')}</div>
							</Link>
							<Link href={'/agent'}>
								<div> {t('Agents')} </div>
							</Link>
							<Link href={'/community?articleCategory=FREE'}>
								<div> {t('Community')} </div>
							</Link>
							{user?._id && (
								<Link href={'/mypage'}>
									<div> {t('My Page')} </div>
								</Link>
							)}
							<Link href={'/cs'}>
								<div> {t('CS')} </div>
							</Link>
						</Box>
						<Box component={'div'} className={'user-box'}>
							{user?._id ? (
								<>
									<div className={'login-user'} onClick={(event: any) => setLogoutAnchor(event.currentTarget)}>
										<img
											src={
												user?.memberImage ? `${REACT_APP_API_URL}/${user?.memberImage}` : '/img/profile/defaultUser.svg'
											}
											alt=""
										/>
									</div>

									<Menu
										id="basic-menu"
										anchorEl={logoutAnchor}
										open={logoutOpen}
										onClose={() => {
											setLogoutAnchor(null);
										}}
										sx={{ mt: '5px' }}
									>
										<MenuItem onClick={() => logOut()}>
											<Logout fontSize="small" style={{ color: 'blue', marginRight: '10px' }} />
											Logout
										</MenuItem>
									</Menu>
								</>
							) : (
								// <Link href={'/account/join'}>
								// 	<div className={'join-box'}>
								// 		<AccountCircleOutlinedIcon />
								// 		<span>
								// 			{t('Login')} / {t('Register')}
								// 		</span>
								// 	</div>
								// </Link>
								<div>
									<Button
										style={{
											width: '130px',
											height: '35px',
											background: '#45a358',
											color: 'white',
											borderRadius: '10px',
										}}
										onClick={handleLOpen}
									>
										Login / Register
									</Button>
									<Modal
										open={openLog}
										onClose={handleLClose}
										aria-labelledby="modal-modal-title"
										aria-describedby="modal-modal-description"
									>
										<Box
											sx={{
												height: 600,
												position: 'absolute' as 'absolute',
												top: '50%',
												left: '50%',
												transform: 'translate(-50%, -50%)',
												width: 500,
												bgcolor: 'background.paper',
												border: 'none',
												boxShadow: 24,
												p: 4,
											}}
										>
											<Stack sx={{ width: 430, height: 530, display: 'flex' }}>
												{/* @ts-ignore */}
												<div
													style={{
														alignItems: 'center',
														textAlign: 'center',
														justifyContent: 'center',
													}}
												>
													<img src="/img/logo/Logo.png" alt="" style={{ width: '200px' }} />
												</div>
												<div style={{ display: 'flex' }}>
													<span
														style={{
															alignItems: 'center',
															textAlign: 'center',
															justifyContent: 'center',
															color: '#45a358',
															fontWeight: '600px',
															fontSize: '20px',
															lineHeight: '46px',
														}}
													>
														{loginView ? <b>Login</b> : <b>Signup</b>}
													</span>
												</div>
												<div
													style={{
														display: 'flex',
														alignItems: 'center',
														justifyContent: 'center',
														flexDirection: 'column',
														gap: '20px',
														marginTop: '30px',
													}}
												>
													<div>
														<input
															style={{
																width: '300px',
																height: '40px',
																border: '1px solid #45a358',
																borderRadius: '7px',
															}}
															type="text"
															placeholder={'Enter Nickname'}
															onChange={(e) => handleInput('nick', e.target.value)}
															required={true}
															onKeyDown={(event) => {
																if (event.key == 'Enter' && loginView) doLogin();
																if (event.key == 'Enter' && !loginView) doSignUp();
															}}
														/>
													</div>
													<div>
														<input
															style={{
																width: '300px',
																height: '40px',
																border: '1px solid #45a358',
																borderRadius: '7px',
															}}
															type="text"
															placeholder={'Enter Password'}
															onChange={(e) => handleInput('password', e.target.value)}
															required={true}
															onKeyDown={(event) => {
																if (event.key == 'Enter' && loginView) doLogin();
																if (event.key == 'Enter' && !loginView) doSignUp();
															}}
														/>
													</div>
													{!loginView && (
														<div>
															<input
																style={{
																	width: '300px',
																	height: '40px',
																	borderRadius: '7px',
																	border: '1px solid #45a358',
																}}
																type="text"
																placeholder={'Enter Phone'}
																onChange={(e) => handleInput('phone', e.target.value)}
																required={true}
																onKeyDown={(event) => {
																	if (event.key == 'Enter') doSignUp();
																}}
															/>
														</div>
													)}
												</div>
												<Box style={{ marginTop: '30px' }}>
													{!loginView && (
														<div className={'type-option'}>
															<span style={{ color: '#45a358' }}>I want to be registered as:</span>
															<div>
																<FormGroup>
																	<FormControlLabel
																		sx={{ color: '#45a358' }}
																		control={
																			<Checkbox
																				sx={{
																					color: '#45a358',
																					'&.Mui-checked': {
																						color: '#45a358',
																					},
																				}}
																				size="small"
																				name={'USER'}
																				onChange={checkUserTypeHandler}
																				checked={input?.type == 'USER'}
																				color="secondary"
																			/>
																		}
																		label="User"
																	/>
																</FormGroup>
																<FormGroup>
																	<FormControlLabel
																		sx={{ color: '#45a358' }}
																		control={
																			<Checkbox
																				sx={{
																					color: '#45a358',
																					'&.Mui-checked': {
																						color: '#45a358',
																					},
																				}}
																				size="small"
																				name={'AGENT'}
																				onChange={checkUserTypeHandler}
																				checked={input?.type == 'AGENT'}
																			/>
																		}
																		label="Agent"
																	/>
																</FormGroup>
															</div>
														</div>
													)}

													{loginView && (
														<div
															style={{
																display: 'flex',
																flexDirection: 'row',
																justifyContent: 'space-between',
																alignItems: 'center',
																marginTop: '50px',
															}}
														>
															<FormGroup>
																<FormControlLabel
																	sx={{ color: '#45a358' }}
																	control={
																		<Checkbox
																			sx={{
																				color: '#45a358',
																				'&.Mui-checked': {
																					color: '#45a358',
																				},
																			}}
																			defaultChecked
																			size="small"
																		/>
																	}
																	label="Remember me"
																/>
															</FormGroup>
															<a style={{ color: '#45a358', cursor: 'pointer' }}>Forgot password?</a>
														</div>
													)}

													{loginView ? (
														<Button
															style={{
																width: '300px',
																height: '45px',
																color: 'white',
																background: '#45a358',
																left: '62px',
																top: '30px',
															}}
															variant="contained"
															// endIcon={<img src="/img/icons/rightup.svg" alt="" />}
															disabled={input.nick == '' || input.password == ''}
															onClick={doLogin}
														>
															LOGIN
														</Button>
													) : (
														<Button
															style={{
																width: '300px',
																height: '45px',
																color: 'white',
																background: '#45a358',
																left: '62px',
															}}
															variant="contained"
															disabled={
																input.nick == '' || input.password == '' || input.phone == '' || input.type == ''
															}
															onClick={doSignUp}
															// endIcon={<img src="/img/icons/rightup.svg" alt="" />}
														>
															SIGNUP
														</Button>
													)}
												</Box>
												{/* <Box style={{ marginTop: '110px' }}> */}
												{loginView ? (
													<div style={{ marginTop: '130px', color: '#45a358' }}>
														<p>
															Not registered yet?
															<b
																style={{ marginLeft: '10px' }}
																onClick={() => {
																	viewChangeHandler(false);
																}}
															>
																SIGNUP
															</b>
														</p>
													</div>
												) : (
													<div style={{ marginTop: '25px', color: '#45a358' }}>
														<p style={{ marginTop: '40px' }}>
															Have account?
															<b style={{ marginLeft: '10px' }} onClick={() => viewChangeHandler(true)}>
																{' '}
																LOGIN
															</b>
														</p>
													</div>
												)}
												{/* </Box> */}
											</Stack>
											<Stack className={'right'}></Stack>
										</Box>
									</Modal>
								</div>
							)}

							<div className={'lan-box'}>
								{user?._id && <NotificationsOutlinedIcon className={'notification-icon'} />}
								<Button
									disableRipple
									className="btn-lang"
									onClick={langClick}
									endIcon={<CaretDown size={14} color="#616161" weight="fill" />}
								>
									<Box component={'div'} className={'flag'}>
										{lang !== null ? (
											<img src={`/img/flag/lang${lang}.png`} alt={'usaFlag'} />
										) : (
											<img src={`/img/flag/langen.png`} alt={'usaFlag'} />
										)}
									</Box>
								</Button>

								<StyledMenu anchorEl={anchorEl2} open={drop} onClose={langClose} sx={{ position: 'absolute' }}>
									<MenuItem disableRipple onClick={langChoice} id="en">
										<img
											className="img-flag"
											src={'/img/flag/langen.png'}
											onClick={langChoice}
											id="en"
											alt={'usaFlag'}
										/>
										{t('English')}
									</MenuItem>
									<MenuItem disableRipple onClick={langChoice} id="kr">
										<img
											className="img-flag"
											src={'/img/flag/langkr.png'}
											onClick={langChoice}
											id="uz"
											alt={'koreanFlag'}
										/>
										{t('Korean')}
									</MenuItem>
									<MenuItem disableRipple onClick={langChoice} id="ru">
										<img
											className="img-flag"
											src={'/img/flag/langru.png'}
											onClick={langChoice}
											id="ru"
											alt={'russiaFlag'}
										/>
										{t('Russian')}
									</MenuItem>
								</StyledMenu>
							</div>
						</Box>
					</Stack>
				</Stack>
			</Stack>
		);
	}
};

export default withRouter(Top);
