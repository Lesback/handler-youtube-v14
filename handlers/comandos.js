const Discord = require('discord.js');
const fs = require('fs');
const comandosDir = `${process.cwd()}/comandos`;
const config = require('../config.json');

module.exports = async client => {
    let arrayComandos = [];
    let comandosCargados = 0;

    client.comandos = new Discord.Collection();

    fs.readdirSync(comandosDir).forEach(async dir => {
        const comandos = fs.readdirSync(`${comandosDir}/${dir}`).filter(archivo => archivo.endsWith('.js'));
        for (const archivo of comandos) {
            const comando = require(`${comandosDir}/${dir}/${archivo}`);
            client.comandos.set(comando.data.name, comando);
            arrayComandos.push(comando.data.toJSON());
            console.log(`✅ | Comando ${archivo.replace(/.js/, '')} cargado`.yellow);
            comandosCargados++;
        }

        await new Discord.REST({version: 10}).setToken(config.token).put(
            Discord.Routes.applicationGuildCommands(config.clienteID, '1021155619757109319'), {
                body: arrayComandos
            }
        );

        return console.log(`✅ | Se han cargado ${comandosCargados} comandos`.blue);
    });
}