namespace Generator {
    export class JumpTables {
        private static _instance = null;
        private _jumpVelocities: number[] = [];

        public static get instance(): JumpTables {
            if (JumpTables._instance === null) {
                JumpTables._instance = new JumpTables();
            }
            return JumpTables._instance;
        }

        private constructor() {
            this.calculateJumpVelocities();
        }

        private calculateJumpVelocities(): void {
            // all height samples
            for (let i = 0; i < Parameters.HEIGHT_STEPS; i++) {
                // maximum height of jump for this HEIGHT_STEPS
                let height = Parameters.HEIGHT_MIN + (Parameters.HEIGHT_MAX - Parameters.HEIGHT_MIN) / Parameters.HEIGHT_STEPS * i;
                this._jumpVelocities[i] = Math.sqrt(2 * height * Parameters.GRAVITY);
            }
        }

        public get minJumpVelocity(): number {
            return this._jumpVelocities[0];
        }

        public get maxJumpVelocity(): number {
            return this._jumpVelocities[this._jumpVelocities.length - 1];
        }

        // ------------------
        // ------ DEBUG -----
        // ------------------
        private static _DEBUG = false;
        private static _globals: any;
        private static _debugBmd: Phaser.BitmapData;

        public static setDebug(debug: boolean, gameGlobals?: any): void {
            JumpTables._DEBUG = debug;
            JumpTables._globals = gameGlobals;

            if (debug) {
                if (typeof gameGlobals == 'undefined' || gameGlobals == null) {
                    console.warn("No game globals provide - switching debug off");
                } else {
                    JumpTables.createDebugBitmap();
                }
            }
        }

        public static get debugBitmapData(): Phaser.BitmapData {
            return JumpTables._debugBmd;
        }

        private static createDebugBitmap(): void {
            let global = JumpTables._globals;

            let bmd = new Phaser.BitmapData(global.game, "Grid", global.GAME_WIDTH, global.GAME_HEIGHT);
            bmd.fill(192, 192, 192);

            // horizontal lines
            for (let i = 0; i < global.GAME_HEIGHT; i += Parameters.CELL_SIZE) {
                bmd.line(0, i + 0.5, global.GAME_WIDTH - 1, i + 0.5);
            }

            // vertical lines
            for (let i = 0; i < global.GAME_WIDTH; i += Parameters.CELL_SIZE) {
                bmd.line(i + 0.5, 0, i + 0.5, global.GAME_HEIGHT - 1);
                // add columns header numbers
                bmd.text("" + (i / Parameters.CELL_SIZE), i + 20, 20, "24px Courier", "#FFFF00");
            }

            JumpTables._debugBmd = bmd;
        }
    }
}