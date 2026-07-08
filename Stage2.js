class Stage2 extends BaseStage{

    constructor(){
        super("Stage2");
    }

    create(){

        this.createStage("STAGE2");
        
        for (let i = 0; i < 100; i++) {
            this.ground.create(0 + i * 30, 750, "ground").setScale(1).refreshBody();
        }

        for (let i = 0; i < 4; i++) {
            this.spikes.create(200 + i * 190, 715, "spike").setScale(1).refreshBody();
        }

        this.goal=this.physics.add.sprite(2700,715,"goal");

        this.physics.add.collider(this.goal,this.ground);

        this.physics.add.overlap(
            this.player,
            this.goal,
            ()=>{
                console.log("Clear!");
            }
        );

    }

    update(){

        if(this.player.y>900){
            this.takeDamage();
            this.scene.restart();
        }

        this.playerMove();

    }

}
