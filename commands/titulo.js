require('dotenv').config();
const fetch = require('node-fetch');

module.exports = {
    name: 'titulo',

    run: async (client, channel, tags, message) => {
        // Permite apenas que o dono do canal altere o título
        if (tags.username !== 'enlouquecendolol') {
            return client.say(channel, `❌ Apenas o dono do canal pode mudar o título.`);
        }

        // Pega o novo título a partir da mensagem
        const novoTitulo = message.split(' ').slice(1).join(' ');

        // Verifica se o novo título foi informado
        if (!novoTitulo) {
            return client.say(channel, `❌ Use: !titulo <novo título>`);
        }

        try {
            // Faz a requisição para atualizar o título do canal na Twitch
            const response = await fetch(`https://api.twitch.tv/helix/channels?broadcaster_id=${process.env.BROADCASTER_ID}`, {
                method: 'PATCH',
                headers: {
                    'Client-ID': process.env.CLIENT_ID,
                    'Authorization': `Bearer ${process.env.ACCESS_TOKEN}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ title: novoTitulo })
            });

            // Verifica se a requisição foi bem-sucedida
            if (!response.ok) {
                const erro = await response.json();
                console.error('Erro:', erro);
                return client.say(channel, `❌ Erro ao atualizar título.`);
            }

            // Mensagem de sucesso ao atualizar o título
            console.log(`✅ Título atualizado para: ${novoTitulo}`);
            client.say(channel, `✅ Título alterado para: "${novoTitulo}"`);
        } catch (err) {
            // Trata erros inesperados
            console.error('Erro inesperado:', err);
            client.say(channel, `❌ Erro inesperado ao mudar o título.`);
        }
    }
};
