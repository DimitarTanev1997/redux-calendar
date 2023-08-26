import { useNavigate } from 'react-router-dom';

import styles from './Header.module.css';

import SelectMonthNav from '../SelectMonthNav/SelectMonthNav';
import ButtonIcon, { ButtonSizes, Buttons } from '../UI/ButtonIcon/ButtonIcon';

import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { openModal, selectToday } from '../../store/calendar/calendarSlice';

const Header = () => {
	const navigate = useNavigate();
	const dispatch = useAppDispatch();

	const today = useAppSelector(selectToday);

	const handleClick = () => {
		if (today) {
			dispatch(openModal());

			navigate(`/addEvent/${today}`);
		}
	};

	return (
		<header className={`flex ${styles.header}`}>
			<SelectMonthNav />
			<ButtonIcon
				type={Buttons.ADD}
				size={ButtonSizes.MEDIUM}
				onClick={handleClick}
			/>
		</header>
	);
};
export default Header;
