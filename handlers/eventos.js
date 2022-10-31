const fs = require('fs');
const eventosDir = `${process.cwd()}/eventos`;

module.exports = client => {
    const eventos = fs.readdirSync(eventosDir).filter(archivo => archivo.endsWith('.js'));
    for (const archivo of eventos) {
        const evento = require(`${eventosDir}/${archivo}`);
        client.on(evento.name, (...args) => evento.run(client, ...args));
        console.log(`✅ | Evento ${archivo.replace(/.js/, '')} cargado`.yellow);
    }
}