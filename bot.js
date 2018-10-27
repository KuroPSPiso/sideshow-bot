const Discord = require('discord.js');
const client = new Discord.Client();

//connected
client.on('ready', () => {
    console.log('向こうへ入るに!');
});

//handlemsg
client.on('message', message => {
    if (message.content === '/stats') {
    	message.channel.send('```' + message.author.id + '\n```');
  	}
});

client.on('message', message => {
    if (message.content === '/username') {
    	message.reply(message.author.username);
  	}
});

//Token set via environment keys 
client.login(process.env.BOT_TOKEN);
