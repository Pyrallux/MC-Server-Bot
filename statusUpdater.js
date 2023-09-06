// Requirements
const index = require('./index.js');
const {execSync} = require("child_process");
const winCMD = require('node-cmd');

// Varaible Declarations
let APIserverStatus = 'none';
let serverPlayers;
var url = `curl -s http://mcapi.us/server/status?ip=rc2.serveminecraft.net || printf "0.0.0.0"`;
var checkminutes = 2.5, checkthe_interval = checkminutes * 60 * 1000;
let lastServerStatus = true;

// Check if Server is Online Using Web API
function checkForServer() {
	const body = JSON.parse(execSync(url).toString().trim());
		if (body.online) {
			APIserverStatus = 'online';
		} else {
			APIserverStatus = 'offline';
		}
		if (body.players.now) {
			serverPlayers = (body.players.now + ' Player\(s\) Online');
		} else {
			serverPlayers = ('for Players 👀');
		}
		return [APIserverStatus, serverPlayers];
	};

// Forces the Server to Restart When Crash Detected
function forceRestartServer() {
	if ((APIserverStatus == 'offline') && (lastServerStatus == false)) {
		winCMD.runSync('Taskkill /IM java.exe /F');
		console.log('Server Forcefully Closed');
		lastServerStatus = true;
	} else if (APIserverStatus == 'offline') {
		lastServerStatus = false;
	}
};

// Closing Code	
exports.checkForServer = checkForServer;
exports.forceRestartServer = forceRestartServer;

// Checks Server Status Every x Minutes
setInterval(function() {
	stuff = index.updateBotStatus();
}, checkthe_interval);
