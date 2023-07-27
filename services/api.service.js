import axios from 'axios';
import { getKeyValue, TOKEN_DICTIONARY } from './storage.service.js';

const getWeather = async () => {
	const token = await getKeyValue(TOKEN_DICTIONARY.token);
	const city = await getKeyValue(TOKEN_DICTIONARY.city);
	if (!token) {
		throw new Error('Token not found. To set token, use -t <token> or -h for help');
	}

	const { data } = await axios.get('https://api.openweathermap.org/data/2.5/weather', {
		params: {
			q: city,
			appid: token,
			units: 'metric',
			lang: 'ru'
		}
	});

	return data;
}

export { getWeather };
