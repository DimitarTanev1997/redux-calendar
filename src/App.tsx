import './App.css';
import CalendarGrid from './components/CalendarGrid/CalendarGrid';
import { useAppDispatch, useAppSelector } from './store/hooks';
import { getEvents } from './store/events/eventsSlice';
import AddEventForm from './components/AddTaskForm/AddEventForm';
import Modal from './components/UI/Modal/Modal';
import {
	selectIsModalOpen,
	closeModal,
	setToday,
} from './store/calendar/calendarSlice';

import { Route, Routes, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import SingleEvent from './components/SingleEvent/SingleEvent';
import Header from './components/Header/Header';
import moment from 'moment';

function App() {
	const dispatch = useAppDispatch();
	const navigate = useNavigate();

	useEffect(() => {
		const today = moment().startOf('day').valueOf();

		dispatch(setToday(String(today)));
		dispatch(getEvents());
	}, []);

	const isModalOpen = useAppSelector(selectIsModalOpen);

	const handleModalClose = () => {
		dispatch(closeModal());

		navigate('/');
	};

	return (
		<div className="App">
			<Header />
			<main>
				<Routes>
					<Route path="/addEvent">
						<Route
							path=":timestamp"
							element={
								isModalOpen && (
									<Modal open onClose={handleModalClose}>
										<AddEventForm />
									</Modal>
								)
							}
						/>
					</Route>
					<Route path="/events">
						<Route
							path=":eventId"
							element={
								isModalOpen && (
									<Modal open onClose={handleModalClose}>
										<SingleEvent />
									</Modal>
								)
							}
						/>
					</Route>
				</Routes>
				<CalendarGrid></CalendarGrid>
			</main>
		</div>
	);
}

export default App;
