module.exports = {
    name: 'comandos',

    // Este comando lista todos os comandos disponíveis, exceto ele mesmo
    run: async (client, channel, tags, message, commands) => {
        // Cria uma lista com o nome de todos os comandos, exceto 'comandos'
        const lista = [...commands.keys()].filter(cmd => cmd !== 'comandos');
        // Monta a resposta com os comandos disponíveis
        const resposta = `📜 Comandos disponíveis: ${lista.map(c => `!${c}`).join(', ')}`;
        // Envia a resposta no chat
        client.say(channel, resposta);
    }
};
