const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    cooldown: 10, 
	data: new SlashCommandBuilder().setName('ping').setDescription('Replies with timecodes!'),
	async execute(interaction) {
        try {
            await interaction.reply({ content: 'Pinging...' });
            const sent = await interaction.fetchReply();
            await interaction.editReply( `Websocket heartbeat: ${interaction.client.ws.ping}ms\n` + `Roundtrip latency: ${sent.createdTimestamp - interaction.createdTimestamp}ms` );
            console.log(`${interaction.user.username} used the ping command in ${interaction.guild.name} at ${new Date().toISOString()}`);
        } catch (error) {
            console.error(error);
            await interaction.reply({ content: 'There was an error while executing this command!', flags: MessageFlags.Ephemeral });
        }
	},
};