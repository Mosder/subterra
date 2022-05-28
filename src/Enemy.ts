import { boardSize, enemySize } from "./consts";
import { getEnemyAi } from "./enemyAis";
import { Coords, EnemyMovement, EnemySpawn } from "./interfaces"

class Enemy {
    position: Coords;
    ai: EnemyMovement[];
    done: boolean = false;
    interval: NodeJS.Timer;
    sprite: number;
    spriteStage: number = 0;
    color: number;

    constructor(enemySpawn: EnemySpawn) {
        this.ai = getEnemyAi(enemySpawn.ai);
        this.position = { x: boardSize.width, y: enemySpawn.startY };
        this.newInterval(0);
        this.sprite = enemySpawn.sprite;
        this.color = enemySpawn.color;
    }

    moveTo(coords: Coords) {
        this.position = coords;
    }

    newInterval(stage: number) {
        clearInterval(this.interval);
        this.interval = setInterval(() => {
            this.spriteStage += 0.05;
            if (this.spriteStage >= 4)
                this.spriteStage = 0;
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
        }, 5);
    }

    getSpriteStage() {
        return Math.floor(this.spriteStage);
    }

    kill() {
        clearInterval(this.interval);
        this.done = true;
    }
}

export { Enemy }