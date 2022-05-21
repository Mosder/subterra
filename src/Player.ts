import { Coords } from "./interfaces";
import { boardSize, playerSize, bulletSize } from "./consts";
import { Bullet } from "./Bullet";

class Player {
    position: Coords;
    shield: number;
    speed: number = 1;
    speedDelay: number = 3;
    blockedMovement: string[] = [];
    //for testing purposes
    hp: number = 255;

    constructor() {
        this.moveTo({ x: 10, y: (boardSize.height - playerSize.height) / 2 });
    }

    moveTo(coords: Coords) {
        this.position = this.stayInBox(coords);
    }

    move(dir: string, key: string) {
        if (this.blockedMovement.includes(key))
            return;
        let direction = this.getDirection(dir);
        let moving = setInterval(() => {
            this.moveTo({ x: this.position.x + direction.x * this.speed, y: this.position.y + direction.y * this.speed })
        }, this.speedDelay);
        this.blockedMovement.push(key);
        document.body.addEventListener("keyup", (e) => {
            if (e.key === key) {
                clearInterval(moving);
                this.blockedMovement = this.blockedMovement.filter(val => val !== key);
            }
        })
    }

    getDirection(direction: string): Coords {
        if (direction == "up")
            return { x: 0, y: -1 }
        else if (direction == "right")
            return { x: 1, y: 0 }
        else if (direction == "down")
            return { x: 0, y: 1 }
        else if (direction == "left")
            return { x: -1, y: 0 }
    }

    stayInBox(coords: Coords): Coords {
        const bounds = {
            x: boardSize.width - playerSize.width,
            y: boardSize.height - playerSize.height
        }
        coords.x = coords.x < 0 ? 0 : (coords.x > bounds.x ? bounds.x : coords.x);
        coords.y = coords.y < 0 ? 0 : (coords.y > bounds.y ? bounds.y : coords.y);
        return coords;
    }

    shoot(): Bullet {
        return new Bullet({ x: this.position.x + playerSize.width, y: this.position.y + (playerSize.height - bulletSize.height) / 2 });
    }
}

export { Player };
