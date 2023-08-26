import styles from './CalendarGrid.module.css';

import CalendarGridItem from './CalendarGridItem';

import moment from 'moment';

import { useAppSelector } from '../../store/hooks';
import { selectMonth, selectToday } from '../../store/calendar/calendarSlice';

const CalendarGrid = () => {
	const today = useAppSelector(selectToday);

	const monthString = useAppSelector(selectMonth);
	const month = moment(Number(monthString));

	const currentMonth = month.month();
	const currentMonthDays = month.daysInMonth();

	const currentMonthFirstDay = month.startOf('month').day();
	const currentMonthLastDay = month.endOf('month').day();

	const lastMonthDaysCount = currentMonthFirstDay - 1;
	const nextMonthDaysCount = 7 - currentMonthLastDay;

	const elementsCount =
		currentMonthDays + lastMonthDaysCount + nextMonthDaysCount;

	const firstCalendarDayObj = month
		.startOf('month')
		.subtract(lastMonthDaysCount, 'day');

	const elements = [];

	for (let i = 0; i < elementsCount; i++) {
		const increment = i === 0 ? 0 : 1;
		const dayObj = firstCalendarDayObj.add(increment, 'day');

		const isToday = moment(Number(today)).valueOf() === dayObj.valueOf();

		if (i < 7) {
			elements.push(<CalendarGridItem key={i} isToday={isToday} title date={moment(dayObj)} />);
		} else {
			elements.push(<CalendarGridItem key={i} isToday={isToday} date={moment(dayObj)} />);
		}
	}

	return <ol className={styles.container}>{elements}</ol>;
};
export default CalendarGrid;
