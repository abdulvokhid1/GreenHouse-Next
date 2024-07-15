import React from 'react';
import { Stack, Box } from '@mui/material';
import useDeviceDetect from '../../hooks/useDeviceDetect';

interface EventData {
	eventTitle: string;
	category: string;
	description: string;
	imageSrc: string;
}
const eventsData: EventData[] = [
	{
		eventTitle: 'Cactus & Succulent Care Tips',
		category: 'SMALLPLANTS',
		description: 'Cacti are succulents are easy care plants for any home or patio.',
		imageSrc: '/img/events/SMALLPLANTS.png',
	},
	{
		eventTitle: 'Top 10 Succulents for Your Home',
		category: 'SEEDS',
		description: 'Best in hanging baskets. Prefers medium to high light.',
		imageSrc: '/img/events/SEEDS.png',
	},
	{
		eventTitle: 'Cacti & Succulent Care Tips',
		category: 'SUCCULENTS',
		description: 'Cacti and succulents thrive in containers and because most are..',
		imageSrc: '/img/events/SUCCULENTS.png',
	},
	{
		eventTitle: 'Best Houseplants Room by Room',
		category: 'HOUSEPLANTS',
		description: 'The benefits of houseplants are endless. In addition to..',
		imageSrc: '/img/events/HOUSEPLANTS.png',
	},
];

const EventCard = ({ event }: { event: EventData }) => {
	const device = useDeviceDetect();

	if (device === 'mobile') {
		return <div>EVENT CARD</div>;
	} else {
		return (
			<Stack
				className="event-card"
				// style={{
				// 	backgroundImage: `url(${event?.imageSrc})`,
				// 	// backgroundSize: 'cover',
				// 	// backgroundPosition: 'center',
				// 	backgroundRepeat: 'no-repeat',
				// }}
			>
				<div>
					<img style={{ width: '300px', borderRadius: '5px' }} src={event?.imageSrc} alt="" />
				</div>
				<Box component={'div'} className={'info'}>
					<strong>{event?.category}</strong>
					<span>{event?.eventTitle}</span>
				</Box>
				<Box component={'div'} className={'more'}>
					<span>{event?.description}</span>
				</Box>
			</Stack>
		);
	}
};

const Events = () => {
	const device = useDeviceDetect();

	if (device === 'mobile') {
		return <div>EVENT CARD</div>;
	} else {
		return (
			<Stack className={'events'}>
				<Stack className={'container'}>
					<Stack className={'info-box'}>
						<Box component={'div'} className={'left'}>
							<span>Our Blog</span>
							<p>We are an online plant shop offering a wide range of cheap and trendy plants.</p>
						</Box>
					</Stack>
					<Stack className={'card-wrapper'}>
						{eventsData.map((event: EventData) => {
							return <EventCard event={event} key={event?.eventTitle} />;
						})}
					</Stack>
				</Stack>
			</Stack>
		);
	}
};

export default Events;
