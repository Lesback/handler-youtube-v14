const Discord = require('discord.js');

module.exports = {
    data: new Discord.SlashCommandBuilder()
    .setName('ping')
    .setDescription('Sirve para ver la latencia del bot'),

    run: (client, interaction) => {
        interaction.reply({content: `🏓 | El ping del bot es de \`${client.ws.ping}ms\``});
    }
}