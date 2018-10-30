const Discord = require('discord.js');
const mysql = require('mysql');
const request = require('request');
const client = new Discord.Client();

const self = { 
id : 505756739652550656,
debug_pixelmon : 506892880246341649
};

//connected
client.on('ready', () => {
	console.log('向こうへ入るに!');
});

function dbCMD(sqlData){
	console.log("db cmd called");
	
	request.post('http://bogaardryan.com/whitelist/sql-manager.php',
	   {form: { sql : sqlData } },
	   function(err, result, body){
		
		console.log("db cmd executed");
		
		if(err)
		{ 
			console.log("failed to return val: " + err);
			return body;//.slice(1, -1);
		}
		else 
		{
			console.log("return val: " + body + " | " + result + " | " + body);
			return body;//.slice(1, -1);
		}
	});
}

function dbResultError(sqlReturn)
{
	var obj = JSON.parse(sqlReturn);
	if(obj.err)
	{
		if(obj.err === true)
		{	
			return true;
		}
		else
		{
			return false;
		}
	}
	return false;
}

function dbGetUsername(message)
{
  var sql = "SELECT `mc`.`playerName` FROM `crikMinecraft` mc INNER JOIN `crikPlayer` p ON `p`.`id` = `mc`.`playerId` WHERE ((`mc`.`active` = 1) OR (`p`.`moderator` = 1)) AND " +
  "`p`.`discordId` = '" + message.author.discriminator + "' AND " + 
  "`p`.`discordName` = '" + message.author.username  + "'";
  console.log(message.author.id + " exec: GetUsername");
  handleUsername(message, sql);
}

function dbUpdateUsername(message)
{
  
  var new_username = message.content;
  new_username = new_username.replace(" ", ""); //remove spaces
  new_username = new_username.substr(9); //rightshift 9 characters '/username'
  
  var sql = "UPDATE `crikMinecraft` mc INNER JOIN `crikPlayer` p ON `p`.`id` = `mc`.`playerId` SET `mc`.`playerName` = '" + new_username + "' WHERE ((`mc`.`active` = 1) OR (`p`.`moderator` = 1)) AND " +
  "`p`.`discordId` = '" + message.author.discriminator + "' AND " + 
  "`p`.`discordName` = '" + message.author.username  + "'";
  
  console.log(message.author.id + " exec: UpdateUsername");
  checkUsernameBeforeUpdate(message, new_username, sql);
}

function checkUsernameBeforeUpdate(msg, username, sqlData)
{
	request.get('https://api.mojang.com/users/profiles/minecraft/' + username,
		function(err, result, body){
			if(err || !body || body === "") msg.reply("failed to verify username");
			else {
				console.log("username check positive: " + body);
				
				var obj = JSON.parse(body);
				msg.reply("username found in minecraft database, changing username to **" + obj.name + "**.");
				
				handleUsernameUpdate(msg, obj.name, sqlData);
			}
		});
}

function handleUsernameUpdate(msg, username, sqlData)
{
	request.post('http://bogaardryan.com/whitelist/sql-manager.php',
	   {form: { sql : sqlData } },
	   function(err, result, body){
				
		if(err)
		{ 
			msg.reply("username not found and or service not operational");
		}
		else 
		{
			console.log("return val: " + body + " | " + result + " | " + body);
			if(body === "" || body === null || body === "false")
			{
				msg.reply("failed to set the new name in database, please try again later.");
			}
			else
			{
				var sqlReturn = body;
				sqlReturn = sqlReturn.slice(1, -1);
				var obj = JSON.parse(sqlReturn);
				console.log(obj);
				if(err = dbResultError(sqlReturn))
				{
					console.log(msg.author.id + " has err result: GetUsername = " + err);
					//has error	
					console.log(msg.author.id + " err result: GetUsername = " + obj.msg);
					msg.reply("failed to set the new name in database, please try again later`.");
				}
				else
				{
					//has succeeded
					console.log(msg.author.id + " result: GetUsername = " + obj.playerName);
					msg.reply("username set to, '" + username + "' in database.");
				}
			}
		}
	});
}

function handleUsername(msg, sqlData)
{
	request.post('http://bogaardryan.com/whitelist/sql-manager.php',
	   {form: { sql : sqlData } },
	   function(err, result, body){
				
		if(err)
		{ 
			msg.reply("username not found and or service not operational");
		}
		else 
		{
			console.log("return val: " + body + " | " + result + " | " + body);
			if(body === "" || body === null || body === "false")
			{
				msg.reply("in-game username for Minecraft not found, please add one using `/username <your new username>`.");
			}
			else
			{
				var sqlReturn = body;
				sqlReturn = sqlReturn.slice(1, -1);
				var obj = JSON.parse(sqlReturn);
				console.log(obj);
				if(err = dbResultError(sqlReturn))
				{
					console.log(msg.author.id + " has err result: GetUsername = " + err);
					//has error	
					console.log(msg.author.id + " err result: GetUsername = " + obj.msg);
					msg.reply("in-game username for Minecraft not found, please add one using `/username <your new username>`.");
				}
				else
				{
					//has succeeded
					console.log(msg.author.id + " result: GetUsername = " + obj.playerName);
					msg.reply(obj.playerName);
				}
			}
		}
	});
}

function updateUsername()
{
    return false;
}

function setDiscordIds(message)
{
    message.channel.send('updating list');
    return false;
}

function addUser()
{
    return false;
}

//handlemsg
client.on('message', message => {
    if(message.author.id != self.id)
    {
        message.delete();
    }
    
    var t_content = message.content;
    t_content = t_content.replace("  ", " ");
    
    //Debug
    //message.channel.send(message.author.id);
    if (t_content === '/stats') {
    	message.channel.send('```' + 
                             'id: ' + message.author.id + '\n' +
                             'username: ' + message.author.username + '\n' +
                             'discriminator: ' + message.author.discriminator + '\n' +
                             'created at: ' + message.author.createdAt + '\n' +
                             '```');
  	}
    else if (t_content === '/help' || message.content === '/h') {
    	message.channel.send('```css\n' +
                             'Info - write the following commands inbetween the brackets to check/update your information:' + '\n' + '\n' +
                             '[/help] or [/h] ' + ' \n' +
                             'to display this info monitor.' + ' \n' +' \n' +
                             '[/username] ' + ' \n' +
                             'to check your current ingame username' + ' \n' +' \n' +
                             '[/username <new username>] '  + ' \n' +
                             'to change your ingame username (warning this is not immediately effective, please contact a mod when you do in #help-channel)' + ' \n' + ' \n' +
                             '```');
  	}
    else if (t_content.startsWith('/username ') === true && t_content.length > 10){
        dbUpdateUsername(message);
    }
    else if (t_content === '/username') {
    	dbGetUsername(message);
  	}
    else if (t_content.startsWith('/write ') === true){
        message.channel.send(t_content.substring(6));
    }
    else if (t_content === '/updateList'){
        setDiscordIds(message);
    }
    else if (t_content === '/channel')
    {
        message.channel.send("channel id: " + message.channel.id);
    }
});

//Token set via environment keys 
client.login(process.env.BOT_TOKEN);
