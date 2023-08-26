export default interface Event {
	id: number;
	title: string;
	description: string;
	date: string;
}

export type CreateEvent = Omit<Event, 'id'>;
