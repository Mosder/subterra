import { boardSize, enemySize } from "./consts";
import { getEnemyAi } from "./enemyAis";
import { Coords, EnemyMovement } from "./interfaces"

class Enemy {
    position: Coords;
    ai: EnemyMovement[];
    done: boolean = false;
    interval: NodeJS.Timer;

    constructor(ai: number, startY: number) {
        this.ai = getEnemyAi(ai);
        this.position = { x: boardSize.width, y: startY };
        this.newInterval(0);
    }

    moveTo(coords: Coords) {
        this.position = coords;
    }

    newInterval(stage: number) {
        clearInterval(this.interval);
        this.interval = setInterval(() => {
            this.moveTo({
                x: this.position.x + this.ai[stage].direction.x * this.ai[stage].speed,
                y: this.position.y + this.ai[stage].direction.y * this.ai[stage].speed,
            });
            this.ai[stage].distance -= this.ai[stage].speed;
            if (this.ai[stage].distance <= 0)
                if (++stage >= this.ai.length) {
                    this.kill();
                }
                else {
                    this.newInterval(stage);
                }
        }, this.ai[stage].speedDelay)
    }

    kill() {
        clearInterval(this.interval);
        this.done = true;
    }
}

export { Enemy }