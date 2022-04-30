import '#lib/setup';

import { SapphireClient } from '@sapphire/framework';
import { Intents } from 'discord.js';

const client = new SapphireClient({
	intents: [Intents.FLAGS.DIRECT_MESSAGES],
	api: {
		listenOptions: {
			port: Number(process.env.API_PORT)
		}
	}
});

const main = async () => {
	try {
		await client.login();
	} catch (err) {
		client.logger.fatal(err);
		client.destroy();
		process.exit(1);
	}
};

void main();
