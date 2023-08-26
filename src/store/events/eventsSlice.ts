import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import httpClient, { API_BASE, API_EVENTS } from '../../utils/http-client';

import Event, { CreateEvent } from '../../models/Event.interface';

export enum EventsStatus {
	IDLE = 'idle',
	LOADING = 'loading',
	FAILED = 'failed',
}

type EventsState = {
	status: EventsStatus;
	events: Event[];
};

const initialState: EventsState = {
	events: [],
	status: EventsStatus.IDLE,
};

export const addEvent = createAsyncThunk(
	'events/addEvent',
	async (event: CreateEvent) => {
		return await httpClient(`${API_BASE}${API_EVENTS}`, {
			method: 'POST',
			body: event,
		});
	}
);

export const deleteEvent = createAsyncThunk(
	'events/deleteEvent',
	async (id: number) => {
		const response = await httpClient(`${API_BASE}${API_EVENTS}/${id}`, {
			method: 'DELETE',
		});

		return {
			id,
			...response,
		};
	}
);

export const getEvents = createAsyncThunk('events/getAllEvents', async () => {
	return await httpClient(`${API_BASE}${API_EVENTS}`);
});

const eventsSlice = createSlice({
	name: 'events',
	initialState,
	reducers: {
		removeEvent: (state, action: PayloadAction<number>) => {
			state.events.splice(action.payload, 1);
		},
	},
	extraReducers(builder) {
		builder

			.addCase(getEvents.fulfilled, (state, action: PayloadAction<Event[]>) => {
				state.status = EventsStatus.IDLE;
				state.events = action.payload;
			})
			.addCase(getEvents.pending, (state) => {
				state.status = EventsStatus.LOADING;
			})
			.addCase(addEvent.fulfilled, (state, action: PayloadAction<Event>) => {
				state.status = EventsStatus.IDLE;
				state.events.push(action.payload);
			})
			.addCase(addEvent.pending, (state) => {
				state.status = EventsStatus.LOADING;
			})
			.addCase(deleteEvent.fulfilled, (state, action: PayloadAction<Event>) => {
				state.status = EventsStatus.IDLE;

				const index = state.events.findIndex(
					(event) => event.id === action.payload.id
				);

				if (index) {
					state.events.splice(index, 1);
				}
			});
	},
});

export const selectEventsStatus = (state: { events: EventsState }) =>
	state.events.status;

export const selectEventsByDate = (state: { events: EventsState }) =>
	state.events.events;

export const selectEventById = (state: { events: EventsState }, id: number) =>
	state.events.events.find((event) => event.id === id);

export default eventsSlice.reducer;
