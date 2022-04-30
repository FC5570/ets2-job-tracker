import { createConnection } from 'node:net';
import { WEBSOCKET_HOST, WEBSOCKET_PORT } from './constants';
import { info, error } from './logger';
import { postJobData } from './util';
import type { ParsedData } from './types/interfaces';

/**
 * An events handler could have been used here.
 *
 * By dynamically loading event files from an events folder and then,
 * whenever a ws event is emitted, execute the file.
 *
 * But due to the issues I've had in the past with pkg's dynamic imports,
 * I could do nothing else but use this approach.
 */
export function start(userId: string) {
	const ws = createConnection({ host: WEBSOCKET_HOST, port: WEBSOCKET_PORT });

	ws.on('connect', handleConnect);
	ws.on('data', (data) => handleMessage(userId, data));
	ws.on('error', console.log);
	ws.on('close', handleClose);
}

function handleConnect() {
	return info('Connected to websocket.\n');
}

async function handleMessage(userId: string, message: Buffer) {
	const parsed = parseData<ParsedData>(message);

	if (parsed.status === 'JOB STARTED') {
		const { jobData } = parsed;
		info(
			`Your job from ${jobData.sourceCompany} (${jobData.sourceCity}) to ${jobData.destinationCompany} (${jobData.destinationCity}) carrying ${jobData.cargo} has started.`
		);
		await postJobData(userId, 'START', jobData);
	} else if (parsed.status === 'JOB FINISHED') {
		const { jobData } = parsed;
		info(
			`Your job from ${jobData.sourceCompany} (${jobData.sourceCity}) to ${jobData.destinationCompany} (${jobData.destinationCity}) carrying ${jobData.cargo} has finished.`
		);
		await postJobData(userId, 'END', jobData);
	}
}

function handleClose() {
	error('You quit the game. Exiting...');
	return process.exit(1);
}

function parseData<T = unknown>(data: Buffer) {
	const decoded = data.toString();
	const parsed = decoded.substring(decoded.indexOf('{', 0), decoded.indexOf('\r'));

	return JSON.parse(parsed).data as T;
}
