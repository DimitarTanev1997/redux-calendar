export const API_BASE = 'http://localhost:3001';
export const API_EVENTS = '/events';
export const API_ADD_EVENT = '/addEvent';

interface CustomConfig extends RequestInit {
	body?: any;
}

const httpClient = (endpoint: string, customConfig?: CustomConfig) => {
	const headers = { 'Content-Type': 'application/json' };
	const method = customConfig?.body ? 'POST' : 'GET';
	const config = {
		method,
		...customConfig,
		headers: {
			...headers,
			...customConfig?.headers,
		},
	};

	if (customConfig?.body) {
		config.body = JSON.stringify(customConfig.body);
	}

	return fetch(endpoint, config).then(async (response) => {
		if (response.ok) {
			return await response.json();
		} else {
			const errorMessage = await response.text();
			return Promise.reject(new Error(errorMessage));
		}
	});
};

export default httpClient;
