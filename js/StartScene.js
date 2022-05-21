export default class StartScene extends Phaser.Scene {
    /**
     * Constructor
     */
    constructor() {
        super('StartScene');
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
        this.load.audio('menuSound', ['./assets/sounds/menu.wav']);
    }

    /**
     * Create and init game assets
     */
    create() {
        // Sound manager
        this.menuSound = this.sound.add('menuSound');
        this.menuSound.play();

        // Init border menu
        let board = this.add.image(this.game.config.width / 2, (this.game.config.height) * 0.5, 'board').setDepth(0);

        // Init text title menu
        this.titleMenu = this.add.text(this.game.config.width / 2 - 50, 25, 'PONG', {
            fontSize: '40px',
            fill: '#000',
        });

        this.titleMenu.x = this.game.config.width / 2 - this.titleMenu.width / 2;

        // Init player vs computer button
        let btn = this.add.image(this.game.config.width / 2, (this.game.config.height) * 0.25, 'btn').setDepth(0);
        btn.setScale(0.8);
        btn.setInteractive();
        btn.on('pointerover', () => {
            btn.setTint(0xF6F6F6)
            playerVsComputer.setTint(0x990000)
        });

        btn.on('pointerout', function() {
            btn.clearTint(0xF6F6F6)
            playerVsComputer.clearTint()
        })

        let playerVsComputer = this.add.text(100, 100, 'Player VS Computer');
        playerVsComputer.setPadding(10);
        playerVsComputer.setStyle({
            color: '#555',
            fontSize: 20
        });
        playerVsComputer.setInteractive();
        playerVsComputer.on('pointerover', () => {
            btn.setTint(0xF6F6F6)
            playerVsComputer.setTint(0x990000)
        });

        playerVsComputer.on('pointerout', function() {
            btn.clearTint(0xF6F6F6)
            playerVsComputer.clearTint()
        })

        playerVsComputer.x = this.game.config.width / 2 - playerVsComputer.width / 2;
        playerVsComputer.y = this.game.config.height * 0.25 - playerVsComputer.height / 2;

        // Init computer vs player button
        let btn2 = this.add.image(this.game.config.width / 2, (this.game.config.height) * 0.5, 'btn').setDepth(0);
        btn2.setScale(0.8);
        btn2.setInteractive();
        btn2.on('pointerover', () => {
            btn2.setTint(0xF6F6F6)
            computerVsPlayer.setTint(0x990000)
        });

        btn2.on('pointerout', function() {
            btn2.clearTint()
            computerVsPlayer.clearTint()
        })

        let computerVsPlayer = this.add.text(100, 100, 'Computer VS Player');
        computerVsPlayer.setPadding(10);
        computerVsPlayer.setStyle({
            color: '#555',
            fontSize: 20
        });
        computerVsPlayer.setInteractive();
        computerVsPlayer.on('pointerover', () => {
            btn2.setTint(0xF6F6F6)
            computerVsPlayer.setTint(0x990000)
        });

        computerVsPlayer.on('pointerout', function() {
            btn2.clearTint(0xF6F6F6)
            computerVsPlayer.clearTint()
        })

        computerVsPlayer.x = this.game.config.width * 0.5 - computerVsPlayer.width / 2;
        computerVsPlayer.y = this.game.config.height * 0.5 - computerVsPlayer.height / 2;

        // Init player vs player button
        let btn3 = this.add.image(this.game.config.width / 2, (this.game.config.height) * 0.75, 'btn').setDepth(0);
        btn3.setScale(0.8);
        btn3.setInteractive();
        btn3.on('pointerover', () => {
            btn3.setTint(0xF6F6F6)
            playerVsPlayer.setTint(0x990000)
        });

        btn3.on('pointerout', function() {
            btn3.clearTint(0xF6F6F6)
            playerVsPlayer.clearTint()
        })

        let playerVsPlayer = this.add.text(100, 100, 'Player VS Player');
        playerVsPlayer.setPadding(10);
        playerVsPlayer.setStyle({ color: '#555', fontSize: 20 });
        playerVsPlayer.setInteractive();
        playerVsPlayer.on('pointerover', () => {
            btn3.setTint(0xF6F6F6)
            playerVsPlayer.setTint(0x990000)
        });

        playerVsPlayer.on('pointerout', function() {
            btn3.clearTint(0xF6F6F6)
            playerVsPlayer.clearTint()
        })

        playerVsPlayer.x = this.game.config.width / 2 - playerVsPlayer.width / 2;
        playerVsPlayer.y = (this.game.config.height) * 0.75 - playerVsPlayer.height / 2;

        // Manage mode choice
        playerVsComputer.on('pointerdown', () => {
            this.goToGameScene('playerVsComputer');
        });

        btn.on('pointerdown', () => {
            this.goToGameScene('playerVsComputer');
        });

        computerVsPlayer.on('pointerdown', () => {
            this.goToGameScene('computerVsPlayer');
        });

        btn2.on('pointerdown', () => {
            this.goToGameScene('playerVsComputer');
        });

        playerVsPlayer.on('pointerdown', () => {
            this.goToGameScene('playerVsPlayer');
        });

        btn3.on('pointerdown', () => {
            this.goToGameScene('playerVsComputer');
        });
    }

    /**
     * Go to Main scene
     */
    goToGameScene(choice) {
        // Fade out animation
        this.cameras.main.fadeOut(500, 0, 0, 0)

        this.cameras.main.once(Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE, (cam, effect) => {
            // Stop music
            this.menuSound.stop();

            this.scene.start('GameScene', { choice: choice });
        })
    }
}