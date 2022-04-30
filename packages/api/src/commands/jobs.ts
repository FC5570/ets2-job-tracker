import { Command, type ApplicationCommandRegistry } from '@sapphire/framework';
import { ApplyOptions } from '@sapphire/decorators';

@ApplyOptions<Command.Options>({
	description: "Check all the jobs you've attempted (this also includes cancelled jobs)."
})
export class JobsCommand extends Command {
	public async chatInputRun(interaction: Command.ChatInputInteraction) {
		await interaction.deferReply({ ephemeral: true });

		const jobs = await this.container.redis.get(`jobs:${interaction.user.id}`).catch(() => null);
		if (!jobs) return interaction.editReply(`You haven't attempted any jobs yet.`);

		return interaction.editReply(`You've attempted ${jobs} jobs so far.`);
	}

	public override registerApplicationCommands(registry: ApplicationCommandRegistry) {
		registry.registerChatInputCommand(
			(command) => {
				return command.setName(this.name).setDescription(this.description);
			},
			{
				idHints: ['969635486844985407'],
				guildIds: process.env.NODE_ENV === 'development' ? ['741210071312367687'] : []
			}
		);
	}
}
