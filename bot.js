const Discord = require('discord.js');
const client = new Discord.Client();

//connected
client.on('ready', () => {
    console.log('向こうへ入るに!');
});

//handlemsg
client.on('message', message => {
    if(message.author.id != 505756739652550656)
    {
        message.delete();
    }
    
    let t_content = message.content;
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
    else if (t_content === '/username') {
    	message.reply(message.author.username);
  	}
    else if (t_content.startsWith('/username ') === true){
        message.replay("feature not yet available");
    }
    else if (t_content.startsWith('/write ') === true){
        message.channel.send(t_content.substring(6, t_content.length - 7);
    }
});

//Token set via environment keys 
client.login(process.env.BOT_TOKEN);
