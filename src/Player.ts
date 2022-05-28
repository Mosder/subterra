import { Coords } from "./interfaces";
import { boardSize, playerSize, bulletSize } from "./consts";
import { Bullet } from "./Bullet";

class Player {
    position: Coords;
    shield: number = 0;
    speed: number = 3.5;
    speedDelay: number = 3;
    blockedMovement: string[] = [];
    spriteStage: number = 0;
    spriteInterval: NodeJS.Timer;
    hp: number = 5;

    constructor() {
        this.moveTo({ x: 10, y: (boardSize.height - playerSize.height) / 2 });
        this.activateShield();
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
        coords.x = coords.x < 0 ? 0 : (coords.x > bounds.x * 0.7 ? bounds.x * 0.7 : coords.x);
        coords.y = coords.y < 0 ? 0 : (coords.y > bounds.y ? bounds.y : coords.y);
        return coords;
    }

    shoot(): Bullet {
        this.spriteStage = 1;
        clearTimeout(this.spriteInterval);
        this.spriteInterval = setTimeout(() => {
            this.spriteStage = 0;
        }, 120);
        return new Bullet({ x: this.position.x + playerSize.width, y: this.position.y + playerSize.height - bulletSize.height });
    }

    activateShield() {
        this.shield = 0.25;
        let shieldInterval = setInterval(() => {
            this.shield += 0.25;
            if (this.shield >= 5) {
                clearInterval(shieldInterval);
                shieldInterval = setInterval(() => {
                    this.shield -= 0.25;
                    if (this.shield <= 0)
                        clearInterval(shieldInterval);
                }, 220);
            }
        }, 20);
    }

    kill() {
        if (this.shield > 0)
            return;
        this.activateShield();
        this.hp--;
    }
}

export { Player };
