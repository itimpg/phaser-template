namespace GoblinRun{
    export class Game extends Phaser.Game{
        public constructor(){
            super(Global.GAME_WIDTH, Global.GAME_HEIGHT, Phaser.AUTO, "content");

            this.state.add("Boot", Boot);
            this.state.add("Preload", Preload);
            this.state.add("Play", Play);

            this.state.start("Boot");
        }
    }
}