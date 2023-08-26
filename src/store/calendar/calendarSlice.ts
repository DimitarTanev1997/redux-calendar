import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import moment from 'moment';

export enum SetMonth {
	BEFORE = 'before',
	NEXT = 'next',
	TODAY = 'today',
}

enum CalendarStatus {
	IDLE = 'idle',
	LOADING = 'loading',
	FAILED = 'failed',
}

enum CalendarType {
	MONTH = 'month',
	WEEK = 'week',
	DAY = 'day',
}

type CalendarSliceType = {
	type: CalendarType;
	today: string;
	month: string;
	status: CalendarStatus;
	isModalOpen: boolean;
};

const initialState: CalendarSliceType = {
	type: CalendarType.MONTH,
	today: '',
	month: '',
	isModalOpen: false,
	status: CalendarStatus.IDLE,
};

const calendarSlice = createSlice({
	name: 'calendar',
	initialState,
	reducers: {
		setToday: (state, action: PayloadAction<string>) => {
			state.today = action.payload;
			state.month = action.payload;
		},
		setMonth: (state, action: PayloadAction<SetMonth>) => {
			let selectedMonth = moment(Number(state.month));

			switch (action.payload) {
				case SetMonth.BEFORE:
					selectedMonth.subtract(1, 'month');
					break;
				case SetMonth.NEXT:
					selectedMonth.add(1, 'month');
					break;
				case SetMonth.TODAY:
					selectedMonth = moment(Number(state.today));
					break;
				default:
					break;
			}

			state.month = String(selectedMonth.valueOf());
		},
		openModal: (state) => {
			state.isModalOpen = true;
		},
		closeModal: (state) => {
			state.isModalOpen = false;
		},
	},
});

export const { openModal, closeModal, setToday, setMonth } =
	calendarSlice.actions;

export const selectIsModalOpen = (state: { calendar: CalendarSliceType }) =>
	state.calendar.isModalOpen;

export const selectToday = (state: { calendar: CalendarSliceType }) =>
	state.calendar.today;

export const selectMonth = (state: { calendar: CalendarSliceType }) =>
	state.calendar.month;

export default calendarSlice.reducer;
