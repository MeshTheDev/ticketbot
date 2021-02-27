const Discord = require('discord.js');
const client = new Discord.Client();

const fs = require('fs');

client.commands = new Discord.Collection();

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

const {
    prefix,
    token,
    bot_info,
} = require('./config.json');

client.once('ready', () => {
    console.log('---GENERAL INFORMATION---');
    console.log('--PREFIX--');
    console.log(prefix);
    console.log('--TOKEN--');
    console.log(token);
    console.log('--BOTNAME--');
    console.log(bot_info.name);
    console.log('--BOTVERSION');
    console.log(bot_info.version);
});



for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    client.commands.set(command.name, command);
}
client.on('message', message => {
    if (!message.content.startsWith(prefix) || message.author.bot) return;
    let args = message.content.slice(prefix.length).trim().split(' | ');
    const commandName = args.shift().toLowerCase(); 

    if(!client.commands.has(commandName)) return;
    const command = client.commands.get(commandName);


    try{
        command.execute(message, args);
    }
    catch(error) {
        console.error(error);
        message.reply('There was an issue running that command.');
    } 

}); 
client.login(token);