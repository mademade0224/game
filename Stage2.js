class Stage2 extends Phaser.Scene
{
    constructor ()
    {
        super('Stage2');
    }

    create ()
    {
        if (this.ground) this.ground.destroy(true);
        if (this.spikes) this.spikes.destroy(true);
        if (this.player) this.player.destroy();
        if (this.goal) this.goal.destroy();
        this.isTakingDamage = false;
        const cx = this.scale.width / 2;
        const cy = this.scale.height / 2;

        this.add.text(cx, cy, "STAGE2 (tentavite)", {
            font: '24px monospace',
            color: '#ffe1da',
        }).setOrigin(0.5);

        // Initialize cursors
        this.cursors = this.input.keyboard.createCursorKeys();
        
        this.player = this.physics.add.sprite(100, 300, 'player');
        this.player.setDragX(200);

        // グループを作成
        this.ground = this.physics.add.staticGroup();
        this.spikes = this.physics.add.staticGroup();

        // spike判定設定
        this.physics.add.overlap(this.player, this.spikes, () => {
            this.takeDamage();
        });
        this.physics.add.collider(this.player, this.ground);


        // groundとspikeの生成
        for (let i = 0; i < 100; i++) {
            this.ground.create(0 + i * 30, 750, "ground").setScale(1).refreshBody();
        }

        for (let i = 0; i < 4; i++) {
            this.spikes.create(200 + i * 190, 715, "spike").setScale(1).refreshBody();
        }

        // goalの生成と衝突判定
        this.goal = this.physics.add.sprite(2700, 715, 'goal');
        this.physics.add.collider(this.goal, this.ground);
        this.physics.add.overlap(
            this.player,
            this.goal,
            () => {
                this.scene.start("Stage2");
                console.log('stage2');
            }
        );
        this.cameras.main.startFollow(this.player);

        // HPの初期化（レジストリから取得、なければ3）
        this.hp = this.registry.get('hp') !== undefined ? this.registry.get('hp') : 3;
        this.hearts = [];
        for (let i = 0; i < 3; i++) {
            const heart = this.add.image(40 + i * 40, 40, "heart").setScrollFactor(0);
            if (i >= this.hp) heart.setVisible(false);
            this.hearts.push(heart);
        }
    }
    
    takeDamage() 
    {
        if (this.isTakingDamage) return;
        this.isTakingDamage = true;
        
        this.hp--;
        this.registry.set('hp', this.hp); // レジストリを更新

        if (this.hp > 0) {
            this.hearts[this.hp].setVisible(false);
            this.player.setPosition(90, 300);
            this.player.setVelocity(0);
            setTimeout(() => { this.isTakingDamage = false; }, 500);
        } else {
            this.registry.set('hp', 3); // リセット
            this.scene.start("GameOver"); 
        }
    }

    update ()
    {
        console.log(this.player.y);

        if (this.player.y > 900) {
        console.log('falling!!');
        this.takeDamage();
         this.scene.restart();
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
