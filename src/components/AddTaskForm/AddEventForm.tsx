import { ChangeEvent, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import styles from './AddEventForm.module.css';

import { CreateEvent } from '../../models/Event.interface';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import {
	EventsStatus,
	addEvent,
	selectEventsStatus,
} from '../../store/events/eventsSlice';

const initialState: CreateEvent = {
	title: '',
	description: '',
	date: '',
};

const AddEventForm = () => {
	const [formData, setFormData] = useState<CreateEvent>(initialState);

	const navigate = useNavigate();
	const status = useAppSelector(selectEventsStatus);

	const { timestamp } = useParams();

	//state and validation
	const dispatch = useAppDispatch();

	const handleChange = (
		e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	) => {
		const name = e.currentTarget.name;
		const value = e.currentTarget.value;

		setFormData((prev) => {
			return {
				...prev,
				[name]: value,
			};
		});
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();

		if (formData.title && timestamp) {
			await dispatch(addEvent({ ...formData, date: timestamp })).unwrap();

			if (status === EventsStatus.IDLE) {
				setFormData(initialState);
			}

			navigate('/');
		}
	};

	return (
		<>
			<form
				className={`flex column ${styles.form}`}
				onSubmit={(e) => {
					handleSubmit(e);
				}}
			>
				<input
					placeholder="Title"
					name="title"
					type="text"
					value={formData.title}
					onChange={(e) => handleChange(e)}
				/>
				<textarea
					placeholder="Description"
					name="description"
					value={formData.description}
					cols={1}
					rows={3}
					maxLength={100}
					onChange={(e) => handleChange(e)}
				></textarea>
				<button className="button" disabled={status === EventsStatus.LOADING}>
					Save
				</button>
			</form>
		</>
	);
};
export default AddEventForm;
