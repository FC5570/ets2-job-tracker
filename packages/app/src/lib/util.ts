import { execSync } from 'node:child_process';
import centra from 'centra';
import { API_URL } from './constants';
import { error } from './logger';
import type { PostJobOptions } from './types/interfaces';

export function isRunning(name: string) {
	const { platform } = process;
	const cmd = getIsRunningCommand(platform, name);

	const executed = execSync(cmd).toString();

	return executed.includes(name.toLowerCase());
}

function getIsRunningCommand(platform: string, query: string) {
	switch (platform) {
		case 'win32':
			return 'tasklist';
		case 'darwin':
			return `ps -ax | grep ${query}`;
		case 'linux':
			return 'ps -A';
		default:
			throw new Error(`Unsupported platform: ${platform}`);
	}
}

export async function postJobData(userId: string, action: 'START' | 'END', data: PostJobOptions) {
	try {
		const res = await centra(`${API_URL}/job`, 'POST')
			.body({ ...data, userId, action }, 'json')
			.send();

		const json = await res.json();

		if (res.statusCode !== 200)
			return error(`\nAn error occured while posting your job to Discord: "${json.err}" status code: ${res.statusCode}`);
	} catch (err) {
		return error(`\nAn error occured while posting your job to Discord, ${(err as Error).message}`);
	}
}
