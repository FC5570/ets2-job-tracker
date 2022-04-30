#!/usr/bin/env node

import { isRunning } from './lib/util';
import { error } from './lib/logger';
import { start } from './lib/ws';
import prompts from 'prompts';

const main = async () => {
	if (!isRunning('eurotrucks2')) return error('ETS2 is not running.');

	const response = await prompts({
		type: 'text',
		name: 'id',
		message: 'Enter your Discord User ID.',
		validate: (value: string) => /^(?<id>\d{17,19})$/.test(value) ?? 'Invalid ID.'
	});

	if (!response.id) return error('You must enter your ID.');

	start(response.id.toString());
};

void main();
