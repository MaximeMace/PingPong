export default class GameScene extends Phaser.Scene {
    /**
     * Constructor
     */
    constructor() {
        super('GameScene');
    }

    /**
     * Init the scene with data sent from another scene
     */
    init(data) {
        this.choice = data.choice;
    }

    /**
     * Load the game assets.
     */
    preload() {
        // Change color background to black
        this.cameras.main.setBackgroundColor('#000000');

        // Load balls sprite sheet
        this.load.spritesheet('ball', './assets/balls.png', {
            frameWidth: 46,
            frameHeight: 48
        });

        // Load player sprite sheet
        this.load.spritesheet('player', './assets/player.png', {
            frameWidth: 40,
            frameHeight: 200
        });

        // Load player 2 sprite sheet
        this.load.spritesheet('player2', './assets/player2.png', {
            frameWidth: 40,
            frameHeight: 200
        });

        // Load border sprite sheet
        this.load.spritesheet('border', './assets/border.png', {
            frameWidth: 40,
            frameHeight: 200
        });

        // Load sound
        this.load.audio('bound', [
            './sounds/bound.wav'
        ]);

        this.load.audio('point', [
            './sounds/point.wav'
        ]);
    }

    /**
     * Create and init assets
     */
    create() {
        // Init parameters for the session
        this.delay = 1000;
        this.sizePlayer = 1;
        this.maxScore = 3;
        this.speed = 5;

        // Sound manager
        this.boundSound = this.sound.add('bound');
        this.pointSound = this.sound.add('point');

        // Instantiate timer
        this.timer = this.time.addEvent({
            delay: this.delay,
            callback: this.secondCounter,
            callbackScope: this,
            loop: true,
        });

        // Instantiate speed and display
        this.speedText = this.add.text(50, this.game.config.height - 25, 'Speed: ' + this.speed, {
            fontSize: '20px',
            fill: '#fff',
        });

        // Instantiate max score and display
        this.maxScoreText = this.add.text(200, this.game.config.height - 25, 'maxScore: ' + this.maxScore, {
            fontSize: '20px',
            fill: '#fff',
        });

        // Instantiate timer and display
        this.timer = 0;
        this.chronoDisplay = '';
        this.chronoText = this.add.text(this.game.config.width / 2 - 50, 25, this.chronoDisplay, {
            fontSize: '40px',
            fill: '#fff',
        });

        // Init general timer for end of scene
        if (this.generalTime) {
            this.generalTimer = this.time.addEvent({
                delay: this.generalTime,
                callback: this.goToStartScene,
                callbackScope: this,
                loop: false,
                paused: false,
            });
        }

        // Init player score
        this.initPlayerScore();

        // Init players
        this.generatePlayer();
    }

    /**
     * Update the scene frame by frame
     */
    update() {
        // Set Text to display change
        this.displayChrono();

        this.chronoText.setText(this.chronoDisplay);
        this.playerScoreText.setText(this.playerScore);
        this.player2ScoreText.setText(this.player2Score);

        // Verify if players earn points
        this.earnPoint();

        // Check if game over
        this.gameOver();
    }

    /**
     * Go back to startScene
     */
    goToStartScene() {
        this.scene.start('StartScene');
    }

    /**
     * Go back to endScene
     */
    goToEndScene() {
        this.scene.start('EndScene', {
            playerScore: this.playerScore,
            player2Score: this.player2Score,
            maxScore: this.maxScore,
            chrono: this.timer,
            speed: this.speed
        });
    }

    /**
     * Timer manager
     */
    secondCounter() {
        this.timer++;
    }

    /**
     * Generate ball to play
     */
    generateBall() {
        // Random parameters
        var randSpeedX = Phaser.Math.Between(50, 100) * this.speed;
        var randSpeedY = Phaser.Math.Between(50, 100) * this.speed;

        // The initial ball and its settings
        var ball = this.physics.add.sprite(this.game.config.width / 2, this.game.config.height / 2, 'ball', 1);
        ball.setScale(0.6);

        // Ball physics properties.
        ball.setBounce(1);
        ball.setCollideWorldBounds(true);
        ball.setVelocity(randSpeedX, -randSpeedY);

        this.physics.world.on('worldbounds', function() {
            this.boundSound.play();
        });

        // Detect collision with players
        this.physics.add.collider(ball, this.player, function() {
            this.boundSound.play();
        }, null, this);

        this.physics.add.collider(ball, this.player2, function() {
            this.boundSound.play();
        }, null, this);

        return ball;
    }


    /**
     * Create players elements
     */
    generatePlayer() {
        if (this.choice == 'playerVsComputer') {
            // Init player position
            this.player = this.physics.add.sprite(20, 175, 'player');
            this.player2 = this.physics.add.sprite(this.game.config.width - 20, 475, 'player2');
        } else {
            // Init player position
            this.player = this.physics.add.sprite(this.game.config.width - 20, 475, 'player');
            this.player2 = this.physics.add.sprite(20, 175, 'player2');
        }

        // Scale players
        this.player.setScale(0.2, this.sizePlayer);
        this.player2.setScale(0.2, this.sizePlayer);

        // Allow movement players
        this.player.setImmovable(true);
        this.player2.setImmovable(true);

        // Force players to stay in world screen
        this.player.setCollideWorldBounds(true);
        this.player2.setCollideWorldBounds(true);

        // Generate ball
        this.ball = this.generateBall();

        if (this.choice == 'playerVsComputer' || this.choice == 'computerVsPlayer') {
            // Manage event 1 player
            this.slide();
        } else {
            // Manage event 2 player
            this.slide2Players();
        }
    }

    /**
     * Init players score text
     */
    initPlayerScore() {
        // Init position score
        let playerScoreX;
        let player2ScoreX;

        // Instantiate player score and display
        this.playerScore = 0;
        this.player2Score = 0;

        // Display score based on choice placement
        if (this.choice == 'playerVsComputer') {
            playerScoreX = this.game.config.width / 4;
            player2ScoreX = this.game.config.width * 3 / 4;
        } else {
            playerScoreX = this.game.config.width * 3 / 4;
            player2ScoreX = this.game.config.width / 4;
        }

        // Init score texts
        this.playerScoreText = this.add.text(playerScoreX, this.game.config.height / 2, this.playerScore, {
            fontSize: '80px',
            fill: '#fff',
        });

        this.player2ScoreText = this.add.text(player2ScoreX, this.game.config.height / 2, this.player2Score, {
            fontSize: '80px',
            fill: '#fff',
        });
    }

    /**
     * Condition earn point
     */
    earnPoint() {
        if (this.ball) {
            // Verify if ball has passed players
            if (this.ball.body.x <= 2) {
                this.ball.body.x = this.game.config.width / 2;
                this.ball.body.y = this.game.config.height / 2;
                this.pointSound.play();
                // Give point
                if (this.choice == 'playerVsComputer') {
                    this.player2Score++;
                } else {
                    this.playerScore++;
                }
            } else if (this.ball.body.x >= this.game.config.width - 50) {
                this.ball.body.x = this.game.config.width / 2;
                this.ball.body.y = this.game.config.height / 2;
                this.pointSound.play();
                if (this.choice == 'playerVsComputer') {
                    this.playerScore++;
                } else {
                    this.player2Score++;
                }
            } else {
                if (this.choice != 'playerVsPlayer') {
                    this.slideBot();
                }
            }
        }
    }

    /**
     * Event manager human slide
     */
    slide() {
        // Follow pointer move
        this.input.on(
            'pointermove',
            function(pointer) {
                this.player.setVelocityY((pointer.y - this.player.body.y) * 2);
            },
            this
        );
    }

    /**
     * Event manager bot
     */
    slideBot() {
        if (this.ball) {
            this.player2.setVelocityY((this.ball.body.y - this.player2.body.y) * 4);
        }
    }

    /**
     * Event manager context player vs player
     * We need to detect position of touch
     * to distribute event to player 1 or player 2
     */
    slide2Players() {
        // Follow pointer move
        this.input.on(
            'pointermove',
            function(pointer) {
                if (pointer.x > this.game.config.width / 2) {
                    this.player.setVelocityY((pointer.y - this.player.body.y) * 2);
                } else {
                    this.player2.setVelocityY((pointer.y - this.player2.body.y) * 2);
                }
            },
            this
        );
    }

    /**
     * Show chrono
     */
    displayChrono() {
        let seconds = this.timer % 60;
        let minutes = Math.floor(this.timer / 60);;

        if (seconds < 10) {
            seconds = '0' + seconds;
        }

        if (minutes < 10) {
            minutes = '0' + minutes;
        }

        this.chronoDisplay = minutes + ":" + seconds;
    }

    /**
     * Manage game over context
     */
    gameOver() {
        if (this.playerScore >= this.maxScore || this.player2Score >= this.maxScore) {
            this.goToEndScene();
        }
    }
}