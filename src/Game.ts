import { Player } from "./Player";
import { Controls, Level, Line, Rectangle } from "./interfaces";
import { Bullet } from "./Bullet";
import { boardSize, bulletSize, ctx, enemySize, playerSize } from "./consts";
import { Enemy } from "./Enemy";
import { getLevel } from "./levels";

class Game {
    player: Player;
    controls: Controls;
    bullets: Bullet[] = [];
    enemies: Enemy[] = [];
    level: Level;
    timePassed: number = 0;
    scrollSpeed: number = 0.35;
    showHitboxes: boolean = false;

    constructor(controls: Controls) {
        this.player = new Player();
        this.controls = controls;
        this.level = getLevel(0);
        this.movement();
        this.live();
    }

    movement() {
        document.body.addEventListener("keydown", (e) => {
            for (const [action, key] of Object.entries(this.controls)) {
                if (e.key === key && action !== "shoot" && action !== "hitboxes") {
                    this.player.move(action, key);
                }
            }
        });
        document.body.addEventListener("keyup", (e) => {
            if (this.controls.shoot === e.key)
                this.bullets.push(this.player.shoot());
            else if (this.controls.hitboxes === e.key)
                this.showHitboxes = !this.showHitboxes;
        });
    }

    live() {
        setInterval(() => {
            if (boardSize.width + this.timePassed * this.scrollSpeed < 18494)
                this.timePassed += 10;
            this.entityRemover();
            this.bulletCollisionChecker();
            this.playerCollisionChecker();
            this.enemySpawner();
            this.draw();
        }, 1000 / 100);
    }

    draw() {
        //background
        let backgroundGfx = new Image();
        backgroundGfx.src = "./gfx/background.png"
        ctx.drawImage(backgroundGfx, -this.timePassed * this.scrollSpeed, 0);
        //lines
        if (this.showHitboxes === true) {
            ctx.strokeStyle = "red";
            ctx.lineWidth = 5;
            for (const line of this.getCurrentLines()) {
                ctx.beginPath();
                ctx.moveTo(line.start.x - this.timePassed * this.scrollSpeed, line.start.y);
                ctx.lineTo(line.end.x - this.timePassed * this.scrollSpeed, line.end.y);
                ctx.stroke();
            }
        }
        //bullets
        let bulletGfx = new Image();
        bulletGfx.src = "./gfx/bullet.png"
        for (const bullet of this.bullets)
            ctx.drawImage(bulletGfx, bullet.position.x, bullet.position.y);
        //enemies
        let enemyGfx = new Image();
        enemyGfx.src = "./gfx/enemySample.png"
        for (const enemy of this.enemies)
            ctx.drawImage(enemyGfx, enemy.position.x, enemy.position.y);
        //player
        let playerGfx = new Image();
        playerGfx.src = "./gfx/player.png"
        ctx.drawImage(playerGfx, this.player.position.x, this.player.position.y);
    }

    entityRemover() {
        this.bullets = this.bullets.filter(bullet => bullet.done === false);
        this.enemies = this.enemies.filter(enemy => enemy.done === false);
    }

    playerCollisionChecker() {
        for (const enemy of this.enemies) {
            if (this.rectanglesCollision({ topLeft: this.player.position, size: playerSize },
                { topLeft: enemy.position, size: enemySize })) {
                enemy.kill();
            }
        }
        for (const line of this.getCurrentLines()) {
            if (this.rectangleLineCollision({ topLeft: this.player.position, size: playerSize },
                this.getCurrentLinePosition(line))) {
                console.log("player and line touched");
            }
        }
    }

    bulletCollisionChecker() {
        for (const bullet of this.bullets) {
            for (const enemy of this.enemies) {
                if (this.rectanglesCollision({ topLeft: bullet.position, size: bulletSize },
                    { topLeft: enemy.position, size: enemySize })) {
                    bullet.kill();
                    enemy.kill();
                }
            }
            for (const line of this.getCurrentLines()) {
                if (this.rectangleLineCollision({ topLeft: bullet.position, size: bulletSize },
                    this.getCurrentLinePosition(line))) {
                    bullet.kill();
                }
            }
        }
    }

    rectanglesCollision(rect1: Rectangle, rect2: Rectangle): boolean {
        if (rect1.topLeft.x + rect1.size.width > rect2.topLeft.x &&
            rect1.topLeft.x < rect2.topLeft.x + rect2.size.width &&
            rect1.topLeft.y + rect1.size.height > rect2.topLeft.y &&
            rect1.topLeft.y < rect2.topLeft.y + rect2.size.height) {
            return true;
        }
        return false;
    }

    rectangleLineCollision(rect: Rectangle, line: Line): boolean {
        let rectSides: Line[] = [
            //top
            {
                start: { x: rect.topLeft.x, y: rect.topLeft.y },
                end: { x: rect.topLeft.x + rect.size.width, y: rect.topLeft.y }
            },
            //right
            {
                start: { x: rect.topLeft.x + rect.size.width, y: rect.topLeft.y },
                end: { x: rect.topLeft.x + rect.size.width, y: rect.topLeft.y + rect.size.height }
            },
            //bottom
            {
                start: { x: rect.topLeft.x, y: rect.topLeft.y + rect.size.height },
                end: { x: rect.topLeft.x + rect.size.width, y: rect.topLeft.y + rect.size.height }
            },
            //left
            {
                start: { x: rect.topLeft.x, y: rect.topLeft.y },
                end: { x: rect.topLeft.x, y: rect.topLeft.y + rect.size.height }
            }
        ];
        for (const side of rectSides) {
            if (this.linesCollision(line, side))
                return true;
        }
        return false;
    }

    linesCollision(line1: Line, line2: Line): boolean {
        let x1 = line1.start.x;
        let y1 = line1.start.y;
        let x2 = line1.end.x;
        let y2 = line1.end.y;
        let x3 = line2.start.x;
        let y3 = line2.start.y;
        let x4 = line2.end.x;
        let y4 = line2.end.y;

        let uA = ((x4 - x3) * (y1 - y3) - (y4 - y3) * (x1 - x3)) / ((y4 - y3) * (x2 - x1) - (x4 - x3) * (y2 - y1));
        let uB = ((x2 - x1) * (y1 - y3) - (y2 - y1) * (x1 - x3)) / ((y4 - y3) * (x2 - x1) - (x4 - x3) * (y2 - y1));

        if (uA >= 0 && uA <= 1 && uB >= 0 && uB <= 1)
            return true;
        return false
    }

    spawnEnemy(ai: number, startY: number) {
        let newEnemy = new Enemy(ai, startY);
        this.enemies.push(newEnemy);
    }

    enemySpawner() {
        for (const enemySpawn of this.level.enemySpawns) {
            if (this.timePassed >= enemySpawn.spawnTime)
                this.spawnEnemy(enemySpawn.ai, enemySpawn.startY);
        }
        this.level.enemySpawns = this.level.enemySpawns.filter(spawn => this.timePassed < spawn.spawnTime);
    }

    getCurrentLines(): Line[] {
        return this.level.lines.filter(line =>
            (line.start.x > this.timePassed * this.scrollSpeed &&
                line.start.x < this.timePassed * this.scrollSpeed + boardSize.width) ||
            (line.end.x > this.timePassed * this.scrollSpeed &&
                line.end.x < this.timePassed * this.scrollSpeed + boardSize.width));
    }

    getCurrentLinePosition(line: Line): Line {
        return {
            start: { x: line.start.x - this.timePassed * this.scrollSpeed, y: line.start.y },
            end: { x: line.end.x - this.timePassed * this.scrollSpeed, y: line.end.y }
        };
    }
}

export { Game };