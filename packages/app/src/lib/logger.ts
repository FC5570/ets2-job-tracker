import { cyan, red } from 'colorette';

export function info(msg: string) {
	console.log(cyan(`${getFormattedTime()} - INFO - ${msg}`));
}

export function error(msg: string) {
	console.log(red(`\n${getFormattedTime()} - ERROR - ${msg}`));
}

function getFormattedTime() {
	const date = new Date();
	const hours = date.getHours();
	const minutes = date.getMinutes();
	const seconds = date.getSeconds();

	return `${hours}:${minutes}:${seconds}`;
}
