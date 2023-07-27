const getArgs = (args) => {
	const result = {};
	const [executor, file, ...rest] = args;
	rest.forEach((value, i, array) => {
		if (value.charAt(0) === '-') {
			if (i === array.length - 1) {
				result[value.substring(1)] = true;
			} else if (array[i + 1].charAt(0) !== '-') {
				result[value.substring(1)] = array[i + 1];
			} else {
				result[value.substring(1)] = true;
			}
		}
	});

	return result;
};

export { getArgs };
