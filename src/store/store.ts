import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import calendarReducer from '../store/calendar/calendarSlice';
import eventsReducer from '../store/events/eventsSlice';

export const store = configureStore({
	reducer: {
		calendar: calendarReducer,
		events: eventsReducer,
	},
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
	ReturnType,
	RootState,
	unknown,
	Action<string>
>;
