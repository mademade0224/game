class Game extends BaseStage{

    constructor(){
        super("Game");
    }

    create(){

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


        this.goal=this.physics.add.sprite(2700,715,"goal");

        this.physics.add.collider(this.goal,this.ground);

        this.physics.add.overlap(
            this.player,
            this.goal,
            ()=>{
                this.scene.start("Stage2");
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
