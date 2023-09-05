// Requirements
const { SlashCommandBuilder } = require('discord.js');

// Main Command Module
module.exports = {
	data: new SlashCommandBuilder()
		.setName('ping')
		.setDescription('Replies with Pong!'),
	async execute(interaction) {
        console.log('Pong!');
		return interaction.reply('Pong!');
	},
};