import { Player } from "./Player";
import { Controls, EnemySpawn, Level, Line, Rectangle } from "./interfaces";
import { Bullet } from "./Bullet";
import { boardSize, bulletSize, ctx, enemySize, playerSize, gfx } from "./consts";
import { Enemy } from "./Enemy";
import { getLevel } from "./levels";
import { Explosion } from "./Explosion";

class Game {
    player: Player;
    controls: Controls;
    bullets: Bullet[] = [];
    enemies: Enemy[] = [];
    explosions: Explosion[] = [];
    levelNumber: number;
    level: Level;
    timePassed: number = 0;
    scrollSpeed: number = .35;
    showHitboxes: boolean = false;
    points: number = 0;

    constructor(controls: Controls, levelNumber: number) {
        this.player = new Player();
        this.controls = controls;
        this.levelNumber = levelNumber;
        this.level = getLevel(levelNumber);
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
        let live = setInterval(() => {
            if (boardSize.width + this.timePassed * this.scrollSpeed < 21000)
                this.timePassed += 10;
            this.entityRemover();
            this.bulletCollisionChecker();
            this.playerCollisionChecker();
            this.enemySpawner();
            this.draw();
            if (this.player.hp < 0) {
                clearInterval(live);
                this.dieForGood();
            }
        }, 1000 / 100);
    }

    draw() {
        //background
        ctx.fillStyle = "#000";
        ctx.fillRect(-this.timePassed * this.scrollSpeed, 0, this.level.blackScreenLength, boardSize.height);
        ctx.drawImage(gfx.background, -this.timePassed * this.scrollSpeed + this.level.blackScreenLength, 0);
        //bullets
        for (const bullet of this.bullets)
            ctx.drawImage(gfx.bullet, bullet.position.x, bullet.position.y);
        //enemies
        for (const enemy of this.enemies) {
            let disGfx = gfx.enemies[enemy.sprite];
            ctx.drawImage(disGfx, enemy.getSpriteStage() * enemySize.width, enemy.color * enemySize.height,
                enemySize.width, enemySize.height, enemy.position.x, enemy.position.y, enemySize.width, enemySize.height);
        }
        //explosions
        for (const explosion of this.explosions) {
            ctx.drawImage(gfx.explosions, explosion.stage * enemySize.width, explosion.color * enemySize.height,
                enemySize.width, enemySize.height, explosion.position.x, explosion.position.y,
                enemySize.width, enemySize.height);
        }
        //player
        ctx.drawImage(gfx.player, this.player.spriteStage * playerSize.width, 0, playerSize.width, playerSize.height,
            this.player.position.x, this.player.position.y, playerSize.width, playerSize.height);
        //ui bar
        ctx.fillStyle = "#000";
        ctx.fillRect(0, boardSize.height, boardSize.width, 173);
        ctx.drawImage(gfx.uiBar, boardSize.width - 1498, boardSize.height + 7);
        //shield
        let shield = this.player.shield;
        for (let i = 0; i < shield; i += 0.25) {
            ctx.drawImage(gfx.other, 57 * (1 + i % 1), 0, 57 / 4, 57,
                boardSize.width - 806 + 57 * i, boardSize.height + 61, 57 / 4, 57);
        }
        //digits points
        let pStr = this.points.toString().padEnd(2, "0");
        for (let i = pStr.length - 1; i >= 0; i--)
            ctx.drawImage(gfx.digPoints, parseInt(pStr[i]) * 111, 0, 111, 166,
                boardSize.width - (1498 + (pStr.length - i) * 111), boardSize.height + 7, 111, 166);
        //level number
        ctx.drawImage(gfx.digUi, (this.levelNumber + 1) * 68, 0, 68, 51,
            boardSize.width - 1381, boardSize.height + 61, 68, 51);
        //shield count
        ctx.drawImage(gfx.digUi, this.player.hp * 68, 0, 68, 51,
            boardSize.width - 178, boardSize.height + 61, 68, 51);
        //hitboxes
        if (this.showHitboxes === true) {
            ctx.strokeStyle = "red";
            ctx.lineWidth = 5;
            for (const line of this.getCurrentLines()) {
                this.drawLine(line.start.x - this.timePassed * this.scrollSpeed, line.start.y,
                    line.end.x - this.timePassed * this.scrollSpeed, line.end.y);
            }
            let sides: Line[] = [];
            for (const bullet of this.bullets) {
                sides.push(...this.getRectSides({ topLeft: bullet.position, size: bulletSize }));
            }
            for (const enemy of this.enemies) {
                sides.push(...this.getRectSides({ topLeft: enemy.position, size: enemySize }));
            }
            sides.push(...this.getRectSides({ topLeft: this.player.position, size: playerSize }));
            for (const side of sides)
                this.drawLine(side.start.x, side.start.y, side.end.x, side.end.y);
        };
    }

    drawLine(x1: number, y1: number, x2: number, y2: number) {
        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.stroke();
    }

    entityRemover() {
        this.bullets = this.bullets.filter(bullet => bullet.done === false);
        this.enemies = this.enemies.filter(enemy => enemy.done === false);
        this.explosions = this.explosions.filter(explosion => explosion.done === false);
    }

    playerCollisionChecker() {
        for (const enemy of this.enemies) {
            if (this.rectanglesCollision({ topLeft: this.player.position, size: playerSize },
                { topLeft: enemy.position, size: enemySize })) {
                enemy.kill();
                this.player.kill();
                this.explosions.push(new Explosion(enemy.position, enemy.color));
                this.points += 20;
            }
        }
        for (const line of this.getCurrentLines()) {
            if (this.rectangleLineCollision({ topLeft: this.player.position, size: playerSize },
                this.getCurrentLinePosition(line))) {
                this.player.kill();
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
                    this.explosions.push(new Explosion(enemy.position, enemy.color));
                    this.points += 20;
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
        let rectSides: Line[] = this.getRectSides(rect);
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

    spawnEnemy(enemySpawn: EnemySpawn) {
        let newEnemy = new Enemy(enemySpawn);
        this.enemies.push(newEnemy);
    }

    enemySpawner() {
        for (const enemySpawn of this.level.enemySpawns) {
            if (this.timePassed >= enemySpawn.spawnTime)
                this.spawnEnemy(enemySpawn);
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

    getRectSides(rect: Rectangle): Line[] {
        return [
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
    }

    dieForGood() {
        ctx.fillStyle = "#000";
        ctx.fillRect(0, 0, 2188, 1440);
        ctx.drawImage(gfx.gameOver, 859, 696);
    }
}

export { Game };