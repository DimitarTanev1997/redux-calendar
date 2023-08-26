import { useNavigate, useParams } from 'react-router-dom';

import styles from './SingleEvent.module.css';

import moment from 'moment';

import ButtonIcon, { ButtonSizes, Buttons } from '../UI/ButtonIcon/ButtonIcon';

import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { selectEventById } from '../../store/events/eventsSlice';
import { deleteEvent } from '../../store/events/eventsSlice';

const SingleEvent = () => {
	const navigate = useNavigate();
	const dispatch = useAppDispatch();

	const { eventId } = useParams();

	const event = useAppSelector((state) =>
		selectEventById(state, Number(eventId))
	);

	const date = moment(Number(event?.date)).format('YYYY-MM-DD');

	const handleDelete = () => {
		if (eventId) {
			dispatch(deleteEvent(Number(eventId)));

			navigate('/');
		}
	};

	return (
		<article className={styles.event}>
			<div className={`flex ${styles.actions}`}>
				<ButtonIcon
					type={Buttons.DELETE}
					size={ButtonSizes.SMALL}
					onClick={handleDelete}
				/>
			</div>
			<div className={styles.content}>
				<h4>{event?.title}</h4>
				<p>{event?.description}</p>
				<p>{date}</p>
			</div>
		</article>
	);
};
export default SingleEvent;
