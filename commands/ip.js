// Requirements
const { SlashCommandBuilder } = require('discord.js');
const {execSync} = require("child_process");
let url = "https://api.ipify.org?format=json";

// Variable Declarations
let settings = { method: "Get" };

// Main Command Module
module.exports = {
	data: new SlashCommandBuilder()
		.setName('ip')
		.setDescription('Replies with current server IP address.'),
	async execute(interaction) {
		console.log('Getting IP Address...');
		const cmd = `curl -s http://checkip.amazonaws.com || printf "0.0.0.0"`;
		const pubIp = execSync(cmd).toString().trim();
		console.log(`Current IP Address is: ${pubIp}`);
		return interaction.reply('Server Address: rc2.serveminecraft.net:25565');
	},
};