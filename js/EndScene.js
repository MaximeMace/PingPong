export default class EndScene extends Phaser.Scene {
    /**
     * Constructor
     */
    constructor() {
        super('EndScene');
    }

    /**
     * Init the scene with data sent in another scene
     */
    init(data) {
        this.playerScore = data.playerScore;
        this.player2Score = data.player2Score;
        this.maxScore = data.maxScore;
        this.chrono = data.chrono;
        this.speed = data.speed;
    }

    /**
     * Load the game assets.
     */
    preload() {
        // Change color background to black
        this.cameras.main.setBackgroundColor('#000000');

        // Load sound
        this.load.audio('completed', [
            './sounds/completed.wav'
        ]);
    }

    /**
     * Create and init assets
     */
    create() {
        // Sound manager
        this.completedSound = this.sound.add('completed');
        this.completedSound.play();

        // Init text title menu
        // //@TODO 120 with text width
        this.title = this.add.text(this.game.config.width / 2 - 150, 100, 'Fin de partie', {
            fontSize: '40px',
            fill: '#fff',
        });

        var rectangle = this.add.rectangle(
            this.game.config.width / 2,
            this.game.config.height / 2,
            this.game.config.width * 3 / 5,
            this.game.config.height * 5 / 6).setStrokeStyle(4, 0xffffff);

        // Init retry button
        let retryBtn = this.add.text(100, 100, 'Recommencer');
        retryBtn.setPadding(10);
        retryBtn.setStyle({ backgroundColor: '#e55c90', fontSize: 32 });
        retryBtn.setInteractive();
        retryBtn.x = this.game.config.width / 2 - retryBtn.width / 2;
        retryBtn.y = this.game.config.height / 4 - retryBtn.height / 2;

        // Manage retry click
        retryBtn.on('pointerdown', () => {
            this.goToStartScene();
        });

        // Display report information
        this.scoreText = this.add.text(this.game.config.width / 2 - 350, 300,
            'Player 1: ' + this.playerScore, {
                fontSize: '25px',
                fill: '#fff',
            });

        this.score2Text = this.add.text(this.game.config.width / 2 - 350, 375,
            'Player 2: ' + this.player2Score, {
                fontSize: '25px',
                fill: '#fff',
            });

        this.maxScoreText = this.add.text(this.game.config.width / 2 - 350, 450,
            'Score max: ' + this.maxScore, {
                fontSize: '25px',
                fill: '#fff',
            });

        this.chronoText = this.add.text(this.game.config.width / 2 - 350, 525,
            'Time: ' + this.chrono + " seconds", {
                fontSize: '25px',
                fill: '#fff',
            });

        this.chronoText = this.add.text(this.game.config.width / 2 - 350, 600,
            'Speed: ' + this.speed, {
                fontSize: '25px',
                fill: '#fff',
            });
    }

    /**
     * Go to Main scene
     */
    goToStartScene() {
        this.scene.start('StartScene');
    }
}