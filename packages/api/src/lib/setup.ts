process.env.NODE_ENV ??= 'development';

import { ApplicationCommandRegistries, RegisterBehavior } from '@sapphire/framework';
import { config } from 'dotenv-cra';
import { join, resolve } from 'node:path';

import '@sapphire/plugin-api/register';
import '@sapphire/plugin-logger/register';

config({
	path: join(resolve('./src/'), '.env')
});

ApplicationCommandRegistries.setDefaultBehaviorWhenNotIdentical(RegisterBehavior.Overwrite);
