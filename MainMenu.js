class MainMenu extends Phaser.Scene
{
    constructor ()
    {
        super('MainMenu');
    }

    create ()
    {
        console.log("MainMenu create");
        const cx = this.scale.width / 2;
        const cy = this.scale.height / 2;

        this.menu = this.add.container(0, 0);

        const title = this.add.text(cx, cy - 40, 'ああああ', {
            color: '#8bb2ff',
            fontFamily: '"HGS創英角ﾎﾟｯﾌﾟ体"',
            fontSize: '48px',
        }).setOrigin(0.5);

        const start = this.add.text(cx, cy + 24, 'Click to start', {
            fontSize: '18px',
            fontFamily: 'monospace',
            color: '#ffe1da',
        }).setOrigin(0.5);

        const explain = this.add.text(cx, cy + 65, 'left [←]    right [→]   jump [shift]', {
            fontSize: '18px',
            fontFamily: 'monospace',
            color: '#ffffffff',
        }).setOrigin(0.5);
        
        this.menu.add([title, start, explain]);

        this.start = false;

        this.input.once("pointerdown", () => {
            this.start = true;
        });
    }

    update ()
    {
        if (this.start) {
            this.menu.y -= 10;
            
            if (this.menu.y < -600) {
                this.scene.start("Game");
            }
        }
    }
}
