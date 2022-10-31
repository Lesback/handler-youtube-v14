const Discord = require('discord.js');
const client = new Discord.Client({
    intents: [
        Discord.GatewayIntentBits.Guilds,
        Discord.GatewayIntentBits.GuildMembers,
        Discord.GatewayIntentBits.GuildMessages,
    ],
    partials: [
        Discord.Partials.GuildMember,
        Discord.Partials.GuildMessages,
    ]
});
const config = require('./config.json');
require('colors');

client.login(config.token);
client.color = config.color;

let handlers = ['eventos', 'comandos'];
handlers.forEach(handler => {
    require(`./handlers/${handler}`)(client);
});