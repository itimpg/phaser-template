namespace Generator {
    export class JumpTables {
        private static _instance = null;

        // velocities
        private _jumpVelocities: number[] = [];

        // list of possible jumps for each jump velocities and position within CELL_SIZE
        private _jumpDefs: Jump[][][] = [];

        public static get instance(): JumpTables {
            if (JumpTables._instance === null) {
                JumpTables._instance = new JumpTables();
            }
            return JumpTables._instance;
        }

        private constructor() {
            this.calculateJumpVelocities();
            this.calculateJumpTables();
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

        private calculateJumpTables(): void {
            // all jump velocities
            for (let height = 0; height <= Parameters.HEIGHT_STEPS; height++) {
                this._jumpDefs[height] = [];

                // step from left to right on cell
                for (let step = 0; step < Parameters.CELL_STEPS; step++) {
                    this.calculateJumpCurve(step, height);
                }
            }
        }

        private calculateJumpCurve(step: number, jumpIndex: number): void {
            // simulation timestep
            let timestep = 1 / 60;

            // take jump velocity we calclated previously
            let velocity = this._jumpVelocities[jumpIndex];

            // start at middle of first step to spread samples better over cell
            // x and y positions are in pixels
            let x = step * Parameters.CELL_SIZE / Parameters.CELL_STEPS + Parameters.CELL_SIZE / Parameters.CELL_STEPS / 2;

            let y = 0;
            // y = position in cells coordinates (row within grid)
            let cellY = 0;
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