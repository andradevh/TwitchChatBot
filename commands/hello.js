module.exports = {
    name: 'hello',
    run: (client, channel, tags, message) => {
        // Envia uma saudação para o usuário que usou o comando
        client.say(channel, `Olá, @${tags.username}!`);
    }
};
// Comando simples que responde com uma saudação ao usuário que o invocou.
// Pode ser usado para testar se o bot está funcionando corretamente.
// Basta digitar !hello no chat e o bot responderá