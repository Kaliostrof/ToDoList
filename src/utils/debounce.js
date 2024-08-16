export const debounce = (func, delay) => {
	let timeout;
	return (...arg) => {
		clearTimeout(timeout);
		timeout = setTimeout(func, delay, ...arg);
	};
};
