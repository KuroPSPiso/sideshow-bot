const Discord = require('discord.js');
const client = new Discord.Client();

//connected
client.on('ready', () => {
    console.log('向こうへ入るに!');
});

//handlemsg
client.on('message', message => {
    if (message.content === 'ping') {
    	message.channel.send('PONG!');
  	}
});

client.on('message', message => {
    if (message.content === 'bing') {
    	message.reply('BONG!');
  	}
});

//Token set via environment keys 
client.login(process.env.BOT_TOKEN);
