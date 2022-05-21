import { boardSize, bulletSize } from "./consts";
import { Coords } from "./interfaces"

class Bullet {
    position: Coords;
    speed: number = 5;
    speedDelay: number = 1;
    interval: NodeJS.Timer;
    done: boolean = false;

    constructor(position: Coords) {
        this.position = position;
        this.nyoom();
    }

    nyoom() {
        this.interval = setInterval(() => {
            this.position.x += this.speed;
            if (this.position.x > boardSize.width) {
                this.kill();
            }
        }, this.speedDelay);
    }

    kill() {
        clearInterval(this.interval);
        this.done = true;
    }
}

export { Bullet }