import { Coords } from "./interfaces";

class Explosion {
    position: Coords;
    color: number;
    stage: number = 0;
    done: boolean = false;

    constructor(position: Coords, color: number) {
        this.position = position;
        this.color = color;
        this.explode();
    }

    explode() {
        let interval = setInterval(() => {
            this.stage++;
            if (this.stage >= 7) {
                clearInterval(interval);
                this.done = true;
            }
        }, 100);
    }
}

export { Explosion };