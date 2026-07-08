class BaseStage extends Phaser.Scene {

    constructor(key) {
        super(key);
    }

    createStage(title) {

        this.isTakingDamage = false;

        const cx = this.scale.width / 2;
        const cy = this.scale.height / 2;

        this.add.text(cx, cy, title, {
            font: "24px monospace",
            color: "#ffe1da"
        }).setOrigin(0.5);

        this.cursors = this.input.keyboard.createCursorKeys();

        this.player = this.physics.add.sprite(90,300,"player");
        this.player.setDragX(200);

        this.ground = this.physics.add.staticGroup();
        this.spikes = this.physics.add.staticGroup();

        this.physics.add.collider(this.player,this.ground);

        this.physics.add.overlap(this.player,this.spikes,()=>{
            this.takeDamage();
        });

        this.cameras.main.startFollow(this.player);

        this.hp = this.registry.get("hp") ?? 3;

        this.hearts=[];

        for(let i=0;i<3;i++){

            const heart=this.add.image(40+i*40,40,"heart")
                .setScrollFactor(0);

            if(i>=this.hp){
                heart.setVisible(false);
            }

            this.hearts.push(heart);
        }

    }

    takeDamage(){

        if(this.isTakingDamage)return;

        this.isTakingDamage=true;

        this.hp--;

        this.registry.set("hp",this.hp);

        if(this.hp>0){

            this.hearts[this.hp].setVisible(false);

            this.player.setPosition(90,300);

            this.player.setVelocity(0);

            this.time.delayedCall(500,()=>{
                this.isTakingDamage=false;
            });

        }else{

            this.registry.set("hp",3);

            this.scene.start("GameOver");

        }

    }

    playerMove(){

        if(this.cursors.left.isDown){
            this.player.setVelocityX(-200);
        }
        else if(this.cursors.right.isDown){
            this.player.setVelocityX(200);
        }
        else{
            this.player.setVelocityX(this.player.body.velocity.x*0.9);
        }

        if(this.cursors.space.isDown && this.player.body.touching.down){
            this.player.setVelocityY(-500);
        }

    }

}
