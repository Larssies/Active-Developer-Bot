const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('helloworld')
        .setDescription('Execute this to get your active developer badge on Discord!'),
    async execute(interaction) {
        await interaction.reply('Hello, World!\n\nYou can now claim your active developer in the [Discord Developer Portal](https://discord.com/developers), you may have to wait 24 hours for Discord to process your request.');
    },
};