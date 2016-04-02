var game = new Phaser.Game(800, 490);

var mainState = {
    preload: function() {
        // This function will be executed at the beginning
        // That's where we load the images and sounds
        this.context = {
            score: 0,
            game: game
        };
        this.bird = new Bird(game);
        this.bird.preload();

        this.pipes = new Pipes(this.context);
        this.pipes.preload();

        game.load.image('pipe', 'assets/pipe.png');
    },

    create: function() {
        // Change the background color of the game to blue
        game.stage.backgroundColor = '#71c5cf';

        this.score = 0;
        this.labelScore = game.add.text(20, 20, "0",
            { font: "30px Arial", fill: "#ffffff" });
        // Set the physics system
        game.physics.startSystem(Phaser.Physics.ARCADE);

        // Display the bird at the position x=100 and y=245
        // set bird 
        this.bird.create();
        this.bird.setInputHandler();
        this.pipes.create();
    },


    update: function() {
        if (this.bird.died())
            this.restartGame();
        game.physics.arcade.overlap(
            this.bird.sprite, this.pipes.groups, this.restartGame, null, this);
        this.bird.update();
        this.labelScore.text = this.context.score;
    },

    // Restart the game
    restartGame: function() {
        // Start the 'main' state, which restarts the game
        game.state.start('main');
    }
};

// Add and start the 'main' state to start the game
game.state.add('main', mainState);
game.state.start('main');