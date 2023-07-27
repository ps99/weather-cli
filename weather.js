#!/usr/bin/env node
import { getArgs } from "./helpers/args.js";
import { getWeather } from "./services/api.service.js";
import { printHelp, printSuccess, printWeather, printError } from "./services/log.service.js";
import { saveKeyValue, TOKEN_DICTIONARY } from "./services/storage.service.js";

const saveToken = async (token) => {
	try {
		await saveKeyValue(TOKEN_DICTIONARY.token, token);
		printSuccess('Token saved');
	} catch (error) {
		printError(error.message);
	}
}

const getForecast = async (city) => {
	city = process.env.CITY || city;

	try {
		const weather = await getWeather(city);
		printWeather(weather);
	} catch (error) {
		if (error?.respone?.status == 404) {
			printError('City not found');
		} else if (error?.respone?.status == 401) {
			printError('Invalid token');
		} else {
			printError(error.message);
		}
	}
}

const saveCity = async (city) => {
	if (!city) {
		printError('City is required');
		return;
	}
	try {
		await saveKeyValue(TOKEN_DICTIONARY.city, city);
		printSuccess('City saved');
	} catch (error) {
		printError(error.message);
	}
}

const initCLI = () => {
	const args = getArgs(process.argv);
	if (args.h) {
		printHelp();
	}

	if (args.s) {
		saveCity(args.s);
	}

	if (args.t) {
		saveToken(args.t);
	}

	getForecast();
}

initCLI();
