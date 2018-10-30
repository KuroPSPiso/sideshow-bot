const Discord = require('discord.js');
const mysql = require('mysql');
const request = require('request');
const client = new Discord.Client();

//connected
client.on('ready', () => {
    console.log('向こうへ入るに!');
});

function dbCMD(sqlData){
	request.post('http://bogaardryan.com/whitelist/sql-manager.php',
	   {form: { sql : sqlData } },
	   function(err, result, body){
		if(err)
		{ 
			console.log("failed to return val: " + err);
			return false;
		}
		else 
		{
			console.log("return val: " + body + " | " + result + " | " + body);
			return true;
		}
	});
  /*
  dbCon.connect(function(err) {
    if (err) {
      console.log("Failed to connect to db: " + err);
      return null;
    }
    console.log("Connected to db: running query");
    dbCon.query(sql, function (err, result){
      if(err){
        console.log("Failed to exec to query: " + err);
        return "";
      }
      return result;
    });
  });*/
}

function dbGetUsername(message)
{
  var sql = "SELECT `mc`.`playerName` FROM `crikMinecraft` mc INNER JOIN `crikPlayer` p ON `p`.`id` = `mc`.`playerId` WHERE ((`mc`.`active` = 1) OR (`p`.`moderator` = 1)) AND " +
  "`p`.`discordId` = '" + message.author.discriminator + "' AND " + 
  "`p`.`discordName` = '" + message.author.username  + "'";
  console.log(message.author.id + " exec: GetUsername");
  return dbCMD(sql);
}

function updateUsername()
{
    return false;
}

function fetchUsername(message)
{
  let result = dbGetUsername(message);
  if(result === "" || result === null)
  {
    message.reply("in-game username for Minecraft not found, please add one using `/username <your new username>`.");
    return false;
  }
  else
  {
    message.reply(result);
    return true;
  }
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
    if(message.author.id != 505756739652550656)
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
    else if (t_content.startsWith('/username ') === true){
        message.reply("feature not yet available");
    }
    else if (t_content === '/username') {
    	fetchUsername(message);
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
