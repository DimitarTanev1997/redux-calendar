import styles from './SelectMonthNav.module.css';

import moment from 'moment';

import ButtonIcon, { Buttons } from '../UI/ButtonIcon/ButtonIcon';

import { useAppDispatch, useAppSelector } from '../../store/hooks';
import {
	SetMonth,
	selectMonth,
	setMonth,
} from '../../store/calendar/calendarSlice';

const SelectMonthNav = () => {
	const dispatch = useAppDispatch();

	const monthString = useAppSelector(selectMonth);
	const month = moment(Number(monthString));

	return (
		<nav className={`flex ${styles.nav}`}>
			<button
				className="button"
				onClick={() => {
					dispatch(setMonth(SetMonth.TODAY));
				}}
			>
				Today
			</button>
			<ButtonIcon
				type={Buttons.BEFORE}
				onClick={() => {
					dispatch(setMonth(SetMonth.BEFORE));
				}}
			/>
			<ButtonIcon
				type={Buttons.NEXT}
				onClick={() => {
					dispatch(setMonth(SetMonth.NEXT));
				}}
			/>

			<h5>{`${month.format('MMMM')} ${month.format('yyyy')}`}</h5>
		</nav>
	);
};
export default SelectMonthNav;
