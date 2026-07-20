class Game extends BaseStage{

    constructor(){
        super("Game");
    }

    create(){
        console.log('loadsuccsses')
        this.createStage("STAGE1");


        for (let i = 0; i < 70; i++) {
            this.ground.create(0 + i * 30, 750, "ground").setScale(1).refreshBody();
        }
        for (let i = 0; i < 10; i++) {
            this.ground.create(2200 + i * 30, 750, "ground").setScale(1).refreshBody();
        }
        for (let i = 0; i < 10; i++) {
            this.ground.create(2600 + i * 30, 750, "ground").setScale(1).refreshBody();
        }
        
        //上にあるやつ
        for (let i = 0; i < 10; i++) {
            this.ground.create(120 + i * 130, 600, "ground").setScale(1).refreshBody();
        }
        for (let i = 0; i < 8; i++) {
            this.spikes.create(200 + i * 110, 715, "spike").setScale(1).refreshBody();
        }


this.goal = this.physics.add.staticGroup().create(2700, 680, "goal");
        this.goal.setScale(0.3);
        this.goal.body.setSize(20, 30);

        this.physics.add.collider(this.goal,this.ground);
        

        this.physics.add.overlap(
            this.player,
            this.goal,
            ()=>{
                this.scene.start("Stage2");

                console.log('good');
            }
        );

    }

    update(){

        if(this.player.y>2000){
            this.takeDamage();
        }

        this.playerMove();
    }
}
const config = {
    type: Phaser.AUTO,
    width: 1024,
    height: 768,
    parent: "game-container",
    backgroundColor: "#808080",
    scale: {
        mode: Phaser.Scale.FIT
    },
    scene: [Boot, Preloader, MainMenu, Game, Stage2, GameOver],
    physics: {
        default: "arcade",
        arcade: {
            gravity: { y: 1000 }
        }
        
    }
};

const game = new Phaser.Game(config);

