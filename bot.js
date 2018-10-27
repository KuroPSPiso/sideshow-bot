const Discord = require('discord.js');
const client = new Discord.Client();

//connected
client.on('ready', () => {
    console.log('向こうへ入るに!');
});

//handlemsg
client.on('message', message => {
    if (message.content === '/stats') {
    	message.channel.send('```' + 
                             'id: ' + message.author.id + '\n' +
                             'username: ' + message.author.username + '\n' +
                             'discriminator: ' + message.author.discriminator + '\n' +
                             'created at: ' + message.author.createdAt + '\n' +
                             '```');
  	}
});

client.on('message', message => {
    if (message.content === '/help' || message.content === '/h') {
        message.delete();
    	message.channel.send('```csharp\n' +
                             'Info - write the following commands inbetween the brackets to check/update your information:' + '\n'+
                             '"/username" ' + ' \n' +
                             'to check your current ingame username' + ' \n' +' \n' +
                             '"/username <new username>" '  + ' \n' +
                             'to change your ingame username (warning this is not immediately effective, please contact a mod when you do in #help-channel)' + ' \n' + ' \n' +
                             '```');
  	}
});

client.on('message', message => {
    if (message.content === '/username') {
    	message.reply(message.author.username);
  	}
});

//Token set via environment keys 
client.login(process.env.BOT_TOKEN);
