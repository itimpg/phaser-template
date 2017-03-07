namespace GoblinRun {
    export class Preload extends Phaser.State {
        private _ready: boolean = false;

        public preload() {

        }

        public create() {

        }

        public update() {
            if (!this._ready) {
                this._ready = true;

                this.game.state.start("Play");
            }
        }
    }
}