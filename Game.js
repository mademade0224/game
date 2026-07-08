class Game extends Phaser.Scene
{
    constructor ()
    {
        super('Game');
    }

    create ()
    {
        // 既存のグループがある場合のみクリアする
        if (this.ground) this.ground.destroy(true);
        if (this.spikes) this.spikes.destroy(true);
        if (this.player) this.player.destroy();
        if (this.goal) this.goal.destroy();
        this.isTakingDamage = false;
        const cx = this.scale.width / 2;
        const cy = this.scale.height / 2;

        this.add.text(cx, cy, "STAGE1", {
            font: '24px monospace',
            color: '#ffe1da',
        }).setOrigin(0.5);

        this.cursors = this.input.keyboard.createCursorKeys();
        
        this.player = this.physics.add.sprite(90, 300, 'player');
        this.player.setDragX(200);

        this.ground = this.physics.add.staticGroup();
        this.spikes = this.physics.add.staticGroup();

        this.physics.add.collider(this.player, this.ground);

        // トゲのダメージ判定
        this.physics.add.overlap(this.player, this.spikes, () => {
            this.takeDamage();
        });

        // groundとspikeの生成
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

        // goal
        this.goal = this.physics.add.sprite(2700, 715, 'goal');
        this.physics.add.collider(this.goal, this.ground);
        this.physics.add.overlap(this.player, this.goal, () => this.scene.start("Stage2"));
        
        this.cameras.main.startFollow(this.player);

        // ハートの初期化
        this.hp = 3;
        this.hearts = [];
        for (let i = 0; i < 3; i++) {
            this.hearts.push(this.add.image(40 + i * 40, 40, "heart").setScrollFactor(0));
        }
    }

    takeDamage() 
    {
        
        if (this.isTakingDamage) return;
        this.isTakingDamage = true;
        
        this.hp--;
        this.registry.set("hp", this.hp);
        if (this.hp > 0) {
            this.hearts[this.hp].setVisible(false);
            this.player.setPosition(90, 300);
            this.player.setVelocity(0);
            setTimeout(() => { this.isTakingDamage = false; }, 500);

        } else {
            this.hearts[0].setVisible(false);
            this.scene.start("GameOver"); 
        }
    }

    update ()
    {

        if (this.player.y > 2000) {
        console.log('falling!!');
        this.takeDamage();
        }
        if (this.cursors.left.isDown) {
            this.player.setVelocityX(-200);
        } else if (this.cursors.right.isDown) {
            this.player.setVelocityX(200);
        } else {
            this.player.setVelocityX(this.player.body.velocity.x * 0.9);
        } 
        
        if (this.cursors.space.isDown && this.player.body.touching.down) {
            this.player.setVelocityY(-500);
        }
    }
}

const config = {
    type: Phaser.AUTO,
    width: 1024,
    height: 768,
    parent: 'game-container',
    backgroundColor: '#000000',
    scale: {
        mode: Phaser.Scale.FIT
    },
    scene: [Boot, Preloader, MainMenu, Game, Stage2, GameOver],
    physics: {
        default: 'arcade',
        arcade: { gravity: { y: 1000 } }
    }
};

const game = new Phaser.Game(config);
