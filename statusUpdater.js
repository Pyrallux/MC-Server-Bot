// Requirements
const index = require('./index.js');
const {execSync} = require("child_process");
const winCMD = require('node-cmd');

// Varaible Declarations
let serverStatus = 'none';
const programQuery = 'java.exe'
let serverPlayers;
var url = `curl -s http://mcapi.us/server/status?ip=rc2.serveminecraft.net || printf "0.0.0.0"`;
var checkminutes = 2, checkthe_interval = checkminutes * 60 * 1000;


// Check if Server is Online Using Web API
function checkForServer() {
	const body = JSON.parse(execSync(url).toString().trim());
		if (body.online) {
			serverStatus = 'online';
		} else {
			serverStatus = 'offline';
		}
		if (body.players.now) {
			serverPlayers = (body.players.now + ' Player\(s\) Online');
		} else {
			serverPlayers = ('for Players 👀');
		}
		return [serverStatus, serverPlayers];
	};

// Forces the Server to Restart When Crash Detected
function forceRestartServer(){
	if (serverStatus == 'offline') {
		const killProcess = winCMD.run('Taskkill /IM C:\\Windows\\system32\\cmd.exe /F')
		console.log(killProcess);
	}
}

// Closing Code	
exports.checkForServer = checkForServer;
exports.forceRestartServer = forceRestartServer;

// Checks Server Status Every x Minutes
setInterval(function() {
	stuff = index.updateBotStatus();
}, checkthe_interval);
