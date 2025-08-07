# Twitch Chatbot

Este é um chatbot desenvolvido em Node.js para integração com o chat da Twitch. Utiliza a biblioteca `tmi.js` para se conectar com o chat e permite a criação de comandos customizados, além de integração com a API oficial da Twitch.

## Funcionalidades

- Conexão com o chat da Twitch
- Comandos personalizados carregados dinamicamente
- Permissões de uso por usuário (streamer e moderadores)
- Integração com a API da Twitch (ex: comando para alterar o jogo da live)
- Configuração por meio de variáveis de ambiente

## Estrutura do projeto

```
TwitchBOT/
├── commands/           # Comandos do chatbot
│   ├── comandos.js
│   └── game.js
│
├── utils/
│   └── config.js       # Leitura das variáveis de ambiente
│
├── .env                # Arquivo de configuração (não deve ser enviado ao Git)
├── package.json
└── principal.js        # Arquivo principal que inicia o bot
```

## Instalação

1. Clone o repositório:

```bash
git clone https://github.com/seu-usuario/seu-repo.git
cd seu-repo
```

2. Instale as dependências:

```bash
npm install
```

3. Crie um arquivo `.env` com as seguintes variáveis:

```
ACCESS_TOKEN=oauth:seu_token
CLIENT_ID=sua_client_id
BROADCASTER_ID=seu_broadcaster_id
USERNAME_APP=nome_do_bot
CHANNEL_NAME=nome_do_canal
```

> O `ACCESS_TOKEN` pode ser gerado em: https://twitchapps.com/tmi/

## Execução

Para iniciar o bot, execute:

```bash
node principal.js
```

Se tudo estiver correto, o bot se conectará ao canal especificado e começará a responder aos comandos definidos na pasta `commands`.

## Criando novos comandos

1. Crie um novo arquivo JavaScript na pasta `commands`, por exemplo:

```js
module.exports = {
  name: 'exemplo',
  run: (client, channel, tags, message) => {
    client.say(channel, `Mensagem de exemplo para @${tags.username}`);
  }
};
```

2. O comando poderá ser utilizado no chat da seguinte forma:

```
!exemplo
```

## Requisitos

- Node.js versão 16 ou superior
- Conta na Twitch com credenciais de desenvolvedor válidas

## Licença

Este projeto está licenciado sob a licença MIT.
