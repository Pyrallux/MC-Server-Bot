// Requirements
const { SlashCommandBuilder } = require('discord.js');
const exec = require('child_process').exec;

// Varaible Declarations
let serverStatus = 'none';
const programQuery = 'java.exe'

// Check if A Server is Running
const isRunning = (query, cb) => {
    let platform = process.platform;
    let cmd = '';
    switch (platform) {
        case 'win32' : cmd = `tasklist`; break;
        case 'darwin' : cmd = `ps -ax | grep ${query}`; break;
        case 'linux' : cmd = `ps -A`; break;
        default: break;
    }
    exec(cmd, (err, stdout, stderr) => {
        cb(stdout.toLowerCase().indexOf(query.toLowerCase()) > -1);
		serverStatus = (stdout.toLowerCase().indexOf(query.toLowerCase()) > -1);
		console.log('Program: "' + programQuery + '" - Status: ' + serverStatus);
    });
}

// Main Command Module
module.exports = {
	data: new SlashCommandBuilder()
		.setName('status')
		.setDescription('Updates the status of the server.'),
	async execute(interaction) {
        console.log('Checking Server Status...');
		isRunning(programQuery, (status) => {
			if (status == true) {
				return interaction.reply('Server Status is: ONLINE');
			} else {
				return interaction.reply('Server Status is: OFFLINE');
			};
		});
		
	},
};