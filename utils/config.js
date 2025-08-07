require('dotenv').config();

// Exporta as variáveis de ambiente para configuração do bot
module.exports = {
  ACCESS_TOKEN: process.env.ACCESS_TOKEN || '',      // Token OAuth para autenticação na Twitch
  CLIENT_ID: process.env.CLIENT_ID || '',            // ID do cliente da aplicação Twitch
  BROADCASTER_ID: process.env.BROADCASTER_ID || '',  // ID do canal/broadcaster na Twitch
  USERNAME_APP: process.env.USERNAME_APP || '',      // Nome de usuário do bot na Twitch
  CHANNEL_NAME: process.env.CHANNEL_NAME || ''       // Nome do canal onde o bot irá atuar
};
