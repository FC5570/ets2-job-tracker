import { Listener } from '@sapphire/framework';
import { ApplyOptions } from '@sapphire/decorators';

@ApplyOptions<Listener.Options>({
	event: 'connect'
})
export class RedisConnected extends Listener {
	public run() {
		this.container.logger.info('Connected to Redis.');
	}
}
