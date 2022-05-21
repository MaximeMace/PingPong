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
        // Load images
        this.load.svg('btn', 'assets/btn.svg');
        this.load.svg('btnHover', 'assets/btnHover.svg');
        this.load.svg('board', 'assets/board.svg');

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

        // Init border menu
        let board = this.add.image(this.game.config.width / 2, (this.game.config.height) * 0.5, 'board').setDepth(0);

        // Init text title menu
        this.title = this.add.text(this.game.config.width / 2 - 150, 25, 'Fin de partie', {
            fontSize: '40px',
            fill: '#000',
        });

        // Center text
        this.title.x = this.game.config.width / 2 - this.title.width / 2;

        // Init retry button
        let btn = this.add.image(this.game.config.width / 2, (this.game.config.height) * 0.25, 'btn').setDepth(0);
        btn.setScale(0.8);
        btn.setInteractive();

        // Hover event on button
        btn.on('pointerover', () => {
            btn.setTint(0xF6F6F6)
            retry.setTint(0x990000)
        });

        btn.on('pointerout', function() {
            btn.clearTint()
            retry.clearTint()
        })

        let retry = this.add.text(100, 100, 'Recommencer');
        retry.setPadding(10);
        retry.setStyle({ color: '#555', fontSize: 20 });
        retry.setInteractive();

        // Hover event on text
        retry.on('pointerover', () => {
            btn.setTint(0xF6F6F6)
            retry.setTint(0x990000)
        });

        retry.on('pointerout', function() {
            btn.clearTint()
            retry.clearTint()
        })

        retry.x = this.game.config.width / 2 - retry.width / 2;
        retry.y = this.game.config.height / 4 - retry.height / 2;

        // Manage retry click
        retry.on('pointerdown', () => {
            this.goToStartScene();
        });

        btn.on('pointerdown', () => {
            this.goToStartScene();
        });

        // Display report information
        this.scoreText = this.add.text(this.game.config.width / 2, 300,
            'Player 1: ' + this.playerScore, {
                fontSize: '20px',
                fill: '#000',
            });

        this.scoreText.x = this.game.config.width / 2 - this.scoreText.width / 2;

        this.score2Text = this.add.text(this.game.config.width / 2, 375,
            'Player 2: ' + this.player2Score, {
                fontSize: '20px',
                fill: '#000',
            });

        this.score2Text.x = this.game.config.width / 2 - this.score2Text.width / 2;

        this.maxScoreText = this.add.text(this.game.config.width / 2, 450,
            'Score max: ' + this.maxScore, {
                fontSize: '20px',
                fill: '#000',
            });

        this.maxScoreText.x = this.game.config.width / 2 - this.maxScoreText.width / 2;

        this.chronoText = this.add.text(this.game.config.width / 2, 525,
            'Time: ' + this.chrono + " seconds", {
                fontSize: '20px',
                fill: '#00',
            });

        this.chronoText.x = this.game.config.width / 2 - this.chronoText.width / 2;

        this.speedText = this.add.text(this.game.config.width / 2, 600,
            'Speed: ' + this.speed, {
                fontSize: '20px',
                fill: '#000',
            });

        this.speedText.x = this.game.config.width / 2 - this.speedText.width / 2;
    }

    /**
     * Go to Main scene
     */
    goToStartScene() {
        // Fade out animation
        this.cameras.main.fadeOut(500, 0, 0, 0)

        this.cameras.main.once(Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE, (cam, effect) => {
            this.scene.start('StartScene');
        })
    }
}