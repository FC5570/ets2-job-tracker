import { Route, methods, HttpCodes, type ApiRequest, type ApiResponse } from '@sapphire/plugin-api';
import { s } from '@sapphire/shapeshift';
import { bold } from '@discordjs/builders';
import type { JobDataPostBody } from '#types/interfaces';
import type { User } from 'discord.js';

export class JobRoute extends Route {
	public async [methods.POST](req: ApiRequest, res: ApiResponse) {
		const { client } = this.container;
		const data = req.body as JobDataPostBody;

		try {
			this.validateData(data);
		} catch (err) {
			console.log(err);
			return res.status(HttpCodes.BadRequest).json({
				err: `Schema validation failed on the data sent.`
			});
		}

		const user = await client.users.fetch(data.userId).catch(() => null);
		if (!user)
			return res.status(HttpCodes.NotFound).json({
				err: `User with ID ${data.userId} not found.`
			});

		if (data.action === 'START' || data.action === 'END')
			await this.sendDM(user, data, data.action).catch(() => res.status(HttpCodes.BadRequest).json({ err: 'Could not DM that user.' }));

		return res.status(HttpCodes.OK).json({
			msg: `Successfully sent job data to ${user.tag}`
		});
	}

	private async sendDM(user: User, data: JobDataPostBody, action: JobDataPostBody['action']) {
		const { sourceCity, sourceCompany, destinationCity, destinationCompany, cargo, truckMake, truckModel } = data;

		try {
			await user.send(
				`Your job from ${bold(destinationCompany)} ${bold(`(${destinationCity})`)} to ${bold(sourceCompany)} ${bold(
					`(${sourceCity})`
				)} in a ${bold(`${truckMake} - ${truckModel}`)} carrying ${bold(cargo)} has ${bold(action === 'START' ? 'started' : 'ended')}`
			);
			await this.container.redis.incr(`jobs:${user.id}`).catch(() => null);
		} catch (err) {
			throw err;
		}
	}

	private validateData(data: JobDataPostBody) {
		const jobData = s.object({
			userId: s.string,
			action: s.string,
			sourceCity: s.string,
			sourceCompany: s.string,
			destinationCity: s.string,
			destinationCompany: s.string,
			cargo: s.string,
			truckMake: s.string,
			truckModel: s.string,
			realTimeStarted: s.number,
			realTimeEnded: s.number
		});

		return jobData.parse({ ...data });
	}
}
