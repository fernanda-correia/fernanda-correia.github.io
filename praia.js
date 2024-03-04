var larguraJogo = 750;
var alturaJogo = 600;

const config = {
    type: Phaser.AUTO, //renderizador
    width: larguraJogo,
    height: alturaJogo,

    physics: {
        default: 'arcade', // padrão de regras de física pré existentes
        arcade: {
            gravity: {y:300},
            debug: false // borda quadrada das imagens para colisões
        }
    },

    // na scene do phaser, essas três funções são obrigatórias
    scene: {
        preload: preload, //2° preload = nome (pode ser qualquer um)
        create: create,
        update: update
    }
};

var game = new Phaser.Game(config); //Phaser.Game é uma classe

    var jogador; // guarda as informações na variável 
    var teclado;
    var linha;
    var bola;
    var placar;
    var pontos = 0;

function preload() {
    this.load.image ('bg', 'assets/praia.jpg');
    this.load.image ('jogador', 'assets/jogadorr.png');
    this.load.image ('bola', 'assets/bola.png');
    this.load.image ('linha', 'assets/linha.png');
    this.load.image ('tutorial', 'assets/treino.png');
};

function create() {
    this.add.image (375, 300, 'bg');
    this.add.image (600, 200, 'tutorial').setScale(0.2);
    jogador = this.physics.add.sprite (100, 500, 'jogador').setScale(0.3); //imagem não tem corpo, sprite tem (possibilita colisões)
// a variável permite que a imagem possa aparecer diversas vezes ao longo do código
    jogador.body.allowGravity = false //corpo de gravidade para de cair
    jogador.setCollideWorldBounds(true); //define os limites do jogo


    bola = this.physics.add.sprite (larguraJogo/2, 0, 'bola').setScale(0.01);
    bola.setCollideWorldBounds(true);
    bola.setBounce(0.9); // define o poder de armazenar energia de um elemento

    this.physics.add.overlap(jogador, bola, function(){
        bola.setVisible(false);
        bola.setPosition(375, 100); //posição sempre igual de cair
        bola.setVisible(true); // a bola fica visível quando começa a cair
});
    
    teclado = this.input.keyboard.createCursorKeys(); // define o teclado como possibilitador de movimento


    placar = this.add.text(50, 50, 'Pontuação = ' + 0.1 * pontos, {fontSize: '25px', fill: '#000000' }) // define o texto do placar
 
    linha = this.physics.add.sprite (larguraJogo/2, 500, 'linha');
    linha.body.allowGravity = false // a linha não cai com a gravidade

    this.physics.add.overlap(jogador, linha, function (){
        pontos += 1; // adiciona um ponto quando o jogador passa pela linha
        placar.setText('Pontuação = ' + 0.1 * pontos); // adiciona o texto do placar na tela com a pontuação em unidades
     });

     this.physics.add.overlap(jogador, bola, function (){
        pontos = 0; // define que quando o jogador encosta na bola, o placar volta pro zero
        placar.setText('Pontuação = ' +  0);
        
     });
 

}

function update() {
    if (teclado.left.isDown) {
        jogador.setVelocityX (-1000);} // define a velocidade do peronagem ao apertar o botão para esquerda

    else if (teclado.right.isDown) {
        jogador.setVelocityX (1000);} // define a velocidade do personagem ao apertar o botão para direita

    else {
        jogador.setVelocityX (0);} // define, que quando nenhum dos botões é apertado, o jogador permanece parado

    if (jogador.x < 3*alturaJogo/5) {
        jogador.setFlipX (true);} // define o espelhamento do jogador
    else if (jogador.x > 3*larguraJogo/5) {
        jogador.setFlipX (false);}

}

// o que define uma pontuação decimal? porque algumas aparecem com 0.3?
// não consegui implementar as duas cenas --> não entendi a estrutura