import chalk from 'chalk';
import dedent from 'dedent-js';
import { getIcon } from './api.service.js';

const printError = (err) => {
	console.log(chalk.bold.bgRed(' ERROR ') + ' ' + err);
};

const printSuccess = (msg) => {
	console.log(chalk.bold.bgGreen(' SUCCESS ') + ' ' + msg);
}

const printHelp = () => {
	console.log(
		dedent`${chalk.black.bgCyan(' HELP: ')}
		No params provided
		-s [CITY] to define the city
		-h to display the help section
		-t [API_KEY] to define the API key
		`
	);
}

const printWeather = (res) => {
	console.log(
		dedent`${chalk.black.black.bgCyan(' WEATHER: ')}
		${res.name} city, ${res.sys.country}
		${getIcon(res.weather[0].icon)}  ${res.weather[0].description}
		Temperature: ${Math.round(res.main.temp)} Celsius
		Pressure: ${res.main.pressure} hPa
		Humidity: ${res.main.humidity} %
		Wind: ${res.wind.speed} m/s
		`
	)
}

export { printError, printSuccess, printHelp, printWeather };
