require('dotenv').config();

const fs = require('fs');
const tmi = require('tmi.js');
const { ACCESS_TOKEN, CLIENT_ID, BROADCASTER_ID, USERNAME_APP, CHANNEL_NAME } = require('./utils/config');

// Carrega todos os módulos de comando da pasta 'commands' e adiciona ao mapa de comandos
const commands = new Map();
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    commands.set(command.name, command);
}

// Configuração do bot para conexão com a Twitch
const client = new tmi.Client({
    identity: {
        username: USERNAME_APP,
        password: ACCESS_TOKEN
    },
    channels: [CHANNEL_NAME],
});

// Inicia o bot e conecta na Twitch
console.log("✅ Iniciando o bot...");
client.connect()
  .then(() => console.log("✅ Bot conectado com sucesso!"))
  .catch(err => console.error("❌ Erro ao conectar:", err));

// Evento: Bot conectado com sucesso na Twitch
client.on('connected', (address, port) => {
    console.log(`✅ Conectado na Twitch em ${address}:${port}`);
});

// Evento: Mensagem recebida no chat
client.on('message', (channel, tags, message, self) => {
    console.log(`[${tags['display-name']}]: ${message}`);
    if (self) return; // Ignora mensagens enviadas pelo próprio bot

    const msg = message.trim().toLowerCase();

    // Verifica se a mensagem é um comando (começa com '!')
    if (msg.startsWith('!')) {
        const commandName = msg.slice(1).split(' ')[0]; // Extrai o nome do comando
        const command = commands.get(commandName);
        if (command) {
            // Executa a função run do comando
            command.run(client, channel, tags, message, commands);
        }
    }
});
