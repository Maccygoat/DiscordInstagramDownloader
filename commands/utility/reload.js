const { SlashCommandBuilder } = require('discord.js');
const { ownerId, guildId, logChannelId } = require('../../config.json');

module.exports = {
    data: new SlashCommandBuilder() .setName('reload') .setDescription('Reloads a command.') .addStringOption(option => option .setName('command') .setDescription('The command to reload.') .setRequired(true) ) ,
    	async execute(interaction) {
        const commandName = interaction.options.getString('command', true).toLowerCase();
		const command = interaction.client.commands.get(commandName);

		if (!command) {
			return interaction.reply(`There is no command with name \`${commandName}\`!`);
		}
        if (interaction.user.id === ownerId) {
            delete require.cache[require.resolve(`./${command.data.name}.js`)];

            try {
                const newCommand = require(`./${command.data.name}.js`);
                interaction.client.commands.set(newCommand.data.name, newCommand);
                await interaction.reply(`Command \`${newCommand.data.name}\` was reloaded!`);
            } catch (error) {
                console.error(error);
                await interaction.reply(
                    `There was an error while reloading a command \`${command.data.name}\`:\n\`${error.message}\``,
                );
            }
        }
        else {
            console.log(`${interaction.user.username} with id ${interaction.user.id} tried to reload command \"${commandName}\" in guild ${interaction.guild.name} but was not authorized!`);
            const channel = interaction.client.channels.cache.get(logChannelId);
            channel.send(`<@${ownerId}> ${interaction.user.username} with id ${interaction.user.id} tried to reload command \"${commandName}\" in guild ${interaction.guild.name} but was not authorized!`);
            return interaction.reply(`You are not authorized to use this command! This incident has been reported!`);
        }
	},
};