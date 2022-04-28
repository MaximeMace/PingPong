export default class StartScene extends Phaser.Scene {
    /**
     * Constructor
     */
    constructor() {
        super('StartScene');
    }

    /**
     * Create and init game assets
     */
    create() {
        // Init border menu
        var rect = this.add.rectangle(
            this.game.config.width / 2,
            this.game.config.height / 2,
            this.game.config.width * 3 / 5,
            this.game.config.height * 5 / 6,
            0xF6F6F6).setStrokeStyle(4, 0x000000);

        // Init text title menu
        // //@TODO 120 with text width
        this.titleMenu = this.add.text(this.game.config.width / 2 - 50, 100, 'PONG', {
            fontSize: '40px',
            fill: '#000',
        });

        // Init player vs computer button
        let playerVsComputer = this.add.text(100, 100, 'Joueur VS Ordi');
        playerVsComputer.setPadding(10);
        playerVsComputer.setStyle({ backgroundColor: '#e55c90', fontSize: 32 });
        playerVsComputer.setInteractive();
        playerVsComputer.x = this.game.config.width / 2 - playerVsComputer.width / 2;
        playerVsComputer.y = this.game.config.height / 4 - playerVsComputer.height / 2;

        // Init computer vs player button
        let computerVsPlayer = this.add.text(100, 100, 'Ordi VS Joueur');
        computerVsPlayer.setPadding(10);
        computerVsPlayer.setStyle({ backgroundColor: '#e55c90', fontSize: 32 });
        computerVsPlayer.setInteractive();
        computerVsPlayer.x = this.game.config.width / 2 - computerVsPlayer.width / 2;
        computerVsPlayer.y = this.game.config.height * 1.4 / 4 - computerVsPlayer.height / 2;

        // Init player vs player button
        let playerVsPlayer = this.add.text(100, 100, 'Joueur VS Joueur');
        playerVsPlayer.setPadding(10);
        playerVsPlayer.setStyle({ backgroundColor: '#333', fontSize: 32 });
        playerVsPlayer.setInteractive();
        playerVsPlayer.x = this.game.config.width / 2 - playerVsPlayer.width / 2;
        playerVsPlayer.y = (this.game.config.height * 1.8) / 4 - playerVsPlayer.height / 2;

        // Manage mode choice
        playerVsComputer.on('pointerdown', () => {
            this.goToGameScene('playerVsComputer');
        });

        computerVsPlayer.on('pointerdown', () => {
            this.goToGameScene('computerVsPlayer');
        });

        playerVsPlayer.on('pointerdown', () => {
            this.goToGameScene('playerVsPlayer');
        });
    }

    /**
     * Go to Main scene
     */
    goToGameScene(choice) {
        this.scene.start('GameScene', { choice: choice });
    }
}