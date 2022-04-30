import { Listener } from '@sapphire/framework';
import Redis from 'ioredis';

export class ReadyListener extends Listener {
	public run() {
		const { client, logger } = this.container;

		logger.info(`Logged in as ${client.user!.tag}`);

		this.container.redis = new Redis(process.env.REDIS_URL!);
	}
}
