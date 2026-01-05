const { SlashCommandBuilder, MessageFlags } = require('discord.js');
const { extractInstagramUrl } = require('../../utils/extractInstagramUrl');
const { downloadVideo } = require('../../utils/downloadVideo');
const fs = require('node:fs');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('downloadreel')
        .setDescription('Download an Instagram reel from an URL.')
        .addStringOption(option =>
            option
                .setName('url')
                .setDescription('The Instagram reel URL (proxy URLs supported).')
                .setRequired(true)
        ),

    async execute(interaction) {
        await interaction.deferReply();
        const inputUrl = interaction.options.getString('url', true);
        const reelUrl = extractInstagramUrl(inputUrl);

        if (!reelUrl) {
            return interaction.editReply({
                content: 'No valid Instagram reel URL found.'
            });
        }

        try {
            const filePath = await downloadVideo(reelUrl);

            await interaction.followUp({
                content: `Downloaded reel from: <${reelUrl}>`,
                files: [filePath]
            });

            // Cleanup temp file
            fs.unlink(filePath, () => {});
            console.log(`Deleting temporary file ${filePath}`)
        } catch (err) {
            console.error(err);
            await interaction.editReply({
                content: `Failed to download reel: ${err.message}`
            });
        }
    }
};

