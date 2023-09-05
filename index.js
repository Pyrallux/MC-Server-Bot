// Requirements
const fs = require('node:fs');
const path = require('node:path');
const { Client, Collection, GatewayIntentBits, ActivityType } = require('discord.js');
const { token } = require('./config.json');
const statusUpdater = require('./statusUpdater.js');

// Varaible Declarations
const client = new Client({ intents: [GatewayIntentBits.Guilds] });


// Establish Collection of Commands
client.commands = new Collection();
const commandsPath = path.join(__dirname, 'commands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith(('.js')));
for (const file of commandFiles) {
	const filePath = path.join(commandsPath, file);
	const command = require(filePath);
	client.commands.set(command.data.name, command);
}

// Function Updating Bot Status Based on Server
function updateBotStatus() {
	let d = new Date();
	let datetext = d.toTimeString().split(' ')[0]
	serverData = statusUpdater.checkForServer();
	if (serverData[0] == 'online') {
		client.user.setStatus('online');
		client.user.setActivity(serverData[1], { type: ActivityType.Watching });
		console.log('\nBot Status set to ONLINE at ' + datetext);
		console.log(serverData[1]);
	} else {
		client.user.setStatus('dnd');
		client.user.setActivity('an Offline Server', { type: ActivityType.Watching });
		console.log('\nBot status set to OFFLINE at ' + datetext);
		statusUpdater.forceRestartServer();
	};
};


// Runs When Bot is Ready
client.once('ready', () => {
	updateBotStatus();
	console.log('Bot Ready!');
});

// Runs When Bot is Interacted With
client.on('interactionCreate', async interaction => {
	if (!interaction.isChatInputCommand()) return;
	const command = client.commands.get(interaction.commandName);
	if (!command) return;
	try {
		updateBotStatus();
		await command.execute(interaction);
	} catch (error) {
		console.error(error);
		await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
	}
});

// Closing Code
exports.updateBotStatus = updateBotStatus;
client.login(token);