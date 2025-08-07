const gameCommand = require('./game');

module.exports = {
    name: 'jogo',
    description: 'Alias para !game',
    run: gameCommand.run // Usa a mesma função do comando !game
};
// Este comando funciona como um atalho para o comando !game, permitindo usar
