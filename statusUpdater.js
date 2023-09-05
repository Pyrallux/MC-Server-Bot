// Requirements
// const { SlashCommandBuilder } = require('discord.js');
// const exec = require('child_process').exec;
const index = require('./index.js');
const {execSync} = require("child_process");

// Varaible Declarations
let mcServerStatus = 'none';
let serverPlayers;
var url = `curl -s http://mcapi.us/server/status?ip=rc2.serveminecraft.net || printf "0.0.0.0"`;
var checkminutes = 5, checkthe_interval = checkminutes * 60 * 1000;

// Check if A Server is Running
function checkForServer() {
	const body = JSON.parse(execSync(url).toString().trim());
		if (body.online) {
			mcServerStatus = 'online';
		} else {
			mcServerStatus = 'offline';
		}
		if (body.players.now) {
			serverPlayers = (body.players.now + ' Player\(s\) Online');
		} else {
			serverPlayers = ('for Players 👀');
		}
		return [mcServerStatus, serverPlayers];
	};

exports.checkForServer = checkForServer;

setInterval(function() {
	stuff = index.updateBotStatus();
}, checkthe_interval);
