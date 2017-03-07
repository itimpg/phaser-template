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
    }
}