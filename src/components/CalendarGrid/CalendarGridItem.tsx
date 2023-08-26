import { Link, useNavigate } from 'react-router-dom';

import styles from './CalendarGridItem.module.css';

import { Moment } from 'moment';

import Event from '../../models/Event.interface';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { selectEventsByDate } from '../../store/events/eventsSlice';
import { openModal } from '../../store/calendar/calendarSlice';

type CalendarGridItemProps = {
	date: Moment;
	isToday: boolean;
	title?: boolean;
};

const CalendarGridItem = ({ date, title, isToday }: CalendarGridItemProps) => {
	const navigate = useNavigate();
	const dispatch = useAppDispatch();

	const events = useAppSelector((state) => selectEventsByDate(state));

	const filteredEvents = events.filter(
		(event) => event.date === String(date.valueOf())
	);

	const handleClick = (e: React.MouseEvent<HTMLLIElement>) => {
		if (e.target === e.currentTarget) {
			const timestamp = date.valueOf();

			dispatch(openModal());

			navigate(`/addEvent/${timestamp}`);
		}
	};

	const eventsLimit = 4;

	const elements = filteredEvents
		.slice(0, eventsLimit)
		.map((event: Event) => {
			return (
				<li
					key={event.id}
					onClick={() => {
						dispatch(openModal());
						navigate(`/events/${event.id}`);
					}}
					className={styles.event}
				>
					{event.title}
				</li>
			);
		});

	return (
		<li className={styles.box} onClick={handleClick}>
			{title && <p>{date.format('dddd')}</p>}
			<p className={isToday ? styles.today : ''}>{date.date()}</p>

			<ol>{elements}</ol>
			{filteredEvents.length > eventsLimit && (
				<>
					<Link to="/events">{filteredEvents.length - 4} more</Link>
				</>
			)}
		</li>
	);
};
export default CalendarGridItem;
