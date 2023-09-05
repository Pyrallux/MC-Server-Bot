// Requirements
const index = require('./index.js');
const {execSync} = require("child_process");
const exec = require('child_process').exec;
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

// Check if Server is Running at Hardware Level
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

// Forces the Server to Restart When Crash Detected
function forceRestartServer(){
	isRunning();
	if (serverStatus == false) {
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
