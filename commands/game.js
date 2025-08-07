const { ACCESS_TOKEN, CLIENT_ID, BROADCASTER_ID } = require('../utils/config');
const axios = require('axios');

module.exports = {
    name: 'game',
    description: 'Altera o jogo atual da live',
    async run(client, channel, tags, message) {
        // Permite apenas que o streamer ou moderador use o comando
        const isModOrBroadcaster = tags.mod || tags.badges?.broadcaster;
        if (!isModOrBroadcaster) {
            client.say(channel, `@${tags.username}, você não tem permissão para mudar o jogo.`);
            return;
        }

        // Pega o nome do novo jogo a partir da mensagem
        const args = message.trim().split(' ').slice(1);
        const novoJogo = args.join(' ');
        if (!novoJogo) {
            client.say(channel, `@${tags.username}, digite o nome do jogo depois do comando. Exemplo: !game League of Legends`);
            return;
        }

        try {
            // Busca o ID do jogo pelo nome usando a API da Twitch
            const searchUrl = `https://api.twitch.tv/helix/games?name=${encodeURIComponent(novoJogo)}`;
            const headers = {
                'Client-ID': CLIENT_ID,
                'Authorization': `Bearer ${ACCESS_TOKEN}`
            };

            const searchResponse = await axios.get(searchUrl, { headers });
            if (!searchResponse.data.data.length) {
                console.log('Jogo não encontrado, enviando mensagem...');
                client.say(channel, `@${tags.username}, não achei o jogo "${novoJogo}" na Twitch.`);
                return;
            }

            const gameId = searchResponse.data.data[0].id;

            // Atualiza o jogo da live usando a API da Twitch
            const updateUrl = `https://api.twitch.tv/helix/channels?broadcaster_id=${BROADCASTER_ID}`;
            const body = { game_id: gameId };
            const patchHeaders = {
                ...headers,
                'Content-Type': 'application/json'
            };

            await axios.patch(updateUrl, body, { headers: patchHeaders });
            client.say(channel, `@${tags.username}, o jogo foi atualizado para ${novoJogo.toUpperCase()}`);
        } catch (error) {
            // Trata erros ao tentar atualizar o jogo
            console.error('Erro ao alterar jogo:', error.response?.data || error.message);
            client.say(channel, `@${tags.username}, não consegui atualizar o jogo.`);
        }
    }
};
// Este comando permite que o streamer ou moderadores mudem o jogo da live usando a Twitch API.
// Ele verifica se o usuário é o streamer ou um moderador, busca o ID do jogo e atualiza o jogo