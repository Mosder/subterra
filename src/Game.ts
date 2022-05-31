import { Player } from "./Player";
import { Block, Controls, Coords, EnemySpawn, Laser, Level, Line, Rectangle, Size } from "./interfaces";
import { Bullet } from "./Bullet";
import { boardSize, bulletSize, ctx, enemySize, playerSize, gfx, backObjSize, audioPlayer } from "./consts";
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
    scrollSpeed: number = .36;
    showHitboxes: boolean = false;
    points: number = 0;
    activeLasers: boolean = true;
    laserTimeout: NodeJS.Timer;
    expoStage: number = -1;

    constructor(controls: Controls, levelNumber: number) {
        this.textScreen(gfx.prepare);
        setTimeout(() => {
            this.player = new Player();
            this.controls = controls;
            this.levelNumber = levelNumber;
            this.level = getLevel(levelNumber);
            this.movement();
            this.live();
        }, 120 * 20);
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
                this.bullets.push(...this.player.shoot());
            else if (this.controls.hitboxes === e.key)
                this.showHitboxes = !this.showHitboxes;
        });
    }

    live() {
        let live = setInterval(() => {
            if (!this.player.justDied) {
                this.timePassed += 10;
                this.entityRemover();
                this.bulletCollisionChecker();
                this.playerCollisionChecker();
                this.enemySpawner();
            }
            this.draw();
            if (this.player.justDied)
                return;
            if (boardSize.width + this.timePassed * this.scrollSpeed >= 21000) {
                audioPlayer.stop();
                clearInterval(live);
                this.textScreen(gfx.completed);
                audioPlayer.play("complete", false);
                setTimeout(() => {
                    ctx.drawImage(gfx.main, 0, 0);
                    audioPlayer.play("main", true);
                }, 120 * 20);
            }
            else if (this.player.hp === -1) {
                audioPlayer.stop();
                clearInterval(live);
                this.textScreen(gfx.gameOver);
                setTimeout(() => {
                    ctx.drawImage(gfx.main, 0, 0);
                    audioPlayer.play("main", true);
                }, 120 * 20);
            }
            else if (this.player.hp === -2) {
                audioPlayer.stop();
                clearInterval(live);
            }
        }, 1000 / 100);
    }

    draw() {
        ctx.fillStyle = "#000";
        ctx.fillRect(0, 0, 2188, 1440);
        //background
        ctx.drawImage(gfx.background, -this.timePassed * this.scrollSpeed + this.level.blackScreenLength, 0);
        //blocks
        for (const block of this.getCurrentBlocks())
            ctx.drawImage(gfx.other, 0, 0, backObjSize.width, backObjSize.height,
                block.position.x - this.timePassed * this.scrollSpeed, block.position.y,
                backObjSize.width, backObjSize.height);
        //lasers
        if (this.activeLasers)
            for (const laser of this.getCurrentLasers()) {
                let stage = (this.timePassed / 10) % 57;
                ctx.drawImage(gfx.other, 0, 57 + stage, backObjSize.width, backObjSize.height - stage,
                    laser.position.x - this.timePassed * this.scrollSpeed, laser.position.y,
                    backObjSize.width, backObjSize.height - stage);
                for (let no = 1; no < laser.height; no++)
                    ctx.drawImage(gfx.other, 0, 57, backObjSize.width, backObjSize.height,
                        laser.position.x - this.timePassed * this.scrollSpeed,
                        laser.position.y + backObjSize.height * no - stage, backObjSize.width, backObjSize.height);
                ctx.drawImage(gfx.other, 0, 57, backObjSize.width, stage, laser.position.x - this.timePassed * this.scrollSpeed,
                    laser.position.y + laser.height * backObjSize.height - stage, backObjSize.width, stage);
            }
        //switches
        for (const sw of this.getCurrentSwitches())
            ctx.drawImage(gfx.other, 57, 57, backObjSize.width, backObjSize.height,
                sw.x - this.timePassed * this.scrollSpeed, sw.y,
                backObjSize.width, backObjSize.height);
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
        if (this.expoStage === -1) {
            if (!this.player.isVertical())
                ctx.drawImage(gfx.player, this.player.justShot * playerSize.width, this.player.spriteStage * playerSize.height,
                    playerSize.width, playerSize.height, this.player.position.x, this.player.position.y,
                    playerSize.width, playerSize.height);
            else {
                let playerHeight = playerSize.height + 15
                ctx.drawImage(gfx.playerVert, this.player.justShot * playerSize.width, this.player.spriteStage * playerHeight,
                    playerSize.width, playerHeight, this.player.position.x, this.player.position.y - 8,
                    playerSize.width, playerHeight);
            }
        }
        else
            ctx.drawImage(gfx.expo, this.expoStage * 200, 0, 200, 161,
                this.player.position.x - 14, this.player.position.y - 45, 200, 161);
        //shield
        ctx.drawImage(gfx.shield, 158 * Math.floor(this.player.shieldSpriteStage), 0, 158, 288,
            this.player.position.x + 57, this.player.position.y - 94, 158, 288);
        //ui bar
        ctx.drawImage(gfx.uiBar, boardSize.width - 1498, boardSize.height + 7);
        //shield ui
        let shield = this.player.shield;
        for (let i = 0; i < shield; i += 0.25) {
            ctx.drawImage(gfx.other, backObjSize.width * (1 + i % 1), 0, backObjSize.width / 4, backObjSize.height,
                boardSize.width - 806 + backObjSize.width * i, boardSize.height + 61, backObjSize.width / 4, backObjSize.height);
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
        if (this.showHitboxes) {
            ctx.strokeStyle = "red";
            ctx.lineWidth = 5;
            for (const line of this.getCurrentLines()) {
                this.drawLine(line.start.x - this.timePassed * this.scrollSpeed, line.start.y,
                    line.end.x - this.timePassed * this.scrollSpeed, line.end.y);
            }
            let sides: Line[] = [];
            for (const block of this.getCurrentBlocks())
                sides.push(...this.getRectSides({ topLeft: this.getCurrentBackObjPosition(block.position), size: backObjSize }));
            if (this.activeLasers)
                for (const laser of this.getCurrentLasers())
                    sides.push(...this.getRectSides({ topLeft: this.getCurrentBackObjPosition(laser.position), size: this.getLaserSize(laser) }));
            for (const sw of this.getCurrentSwitches())
                sides.push(...this.getRectSides({ topLeft: this.getCurrentBackObjPosition(sw), size: backObjSize }));
            for (const bullet of this.bullets)
                sides.push(...this.getRectSides({ topLeft: bullet.position, size: bulletSize }));
            for (const enemy of this.enemies)
                sides.push(...this.getRectSides({ topLeft: enemy.position, size: enemySize }));
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
        //enemies
        for (const enemy of this.enemies) {
            if (this.rectanglesCollision({ topLeft: this.player.position, size: playerSize },
                { topLeft: enemy.position, size: enemySize })) {
                enemy.kill();
                if (this.player.kill())
                    this.playerDied();
                this.explosions.push(new Explosion(enemy.position, enemy.color));
                this.points += 20;
            }
        }
        //lines
        for (const line of this.getCurrentLines()) {
            if (this.rectangleLineCollision({ topLeft: this.player.position, size: playerSize },
                this.getCurrentLinePosition(line))) {
                if (this.player.kill())
                    this.playerDied();
            }
        }
        //blocks
        for (const block of this.getCurrentBlocks()) {
            if (this.rectanglesCollision({ topLeft: this.player.position, size: playerSize },
                { topLeft: this.getCurrentBackObjPosition(block.position), size: backObjSize })) {
                block.ded = true;
                if (this.player.kill())
                    this.playerDied();
                this.points += 10;
            }
        }
        //lasers
        if (this.activeLasers)
            for (const laser of this.getCurrentLasers()) {
                if (this.rectanglesCollision({ topLeft: this.player.position, size: playerSize },
                    { topLeft: this.getCurrentBackObjPosition(laser.position), size: this.getLaserSize(laser) })) {
                    if (this.player.kill())
                        this.playerDied();
                }
            }
    }

    bulletCollisionChecker() {
        for (const bullet of this.bullets) {
            //enemies
            for (const enemy of this.enemies) {
                if (this.rectanglesCollision({ topLeft: bullet.position, size: bulletSize },
                    { topLeft: enemy.position, size: enemySize })) {
                    bullet.kill();
                    enemy.kill();
                    audioPlayer.play("enemy", false);
                    this.explosions.push(new Explosion(enemy.position, enemy.color));
                    this.points += 20;
                }
            }
            //lines
            for (const line of this.getCurrentLines()) {
                if (this.rectangleLineCollision({ topLeft: bullet.position, size: bulletSize },
                    this.getCurrentLinePosition(line))) {
                    bullet.kill();
                }
            }
            //blocks
            for (const block of this.getCurrentBlocks()) {
                if (this.rectanglesCollision({ topLeft: bullet.position, size: bulletSize },
                    { topLeft: this.getCurrentBackObjPosition(block.position), size: backObjSize })) {
                    block.ded = true;
                    audioPlayer.play("block", false);
                    this.points += 10;
                }
            }
            //lasers
            if (this.activeLasers)
                for (const laser of this.getCurrentLasers()) {
                    if (this.rectanglesCollision({ topLeft: bullet.position, size: bulletSize },
                        { topLeft: this.getCurrentBackObjPosition(laser.position), size: this.getLaserSize(laser) })) {
                        bullet.kill();
                    }
                }
            //switches
            for (const sw of this.getCurrentSwitches()) {
                if (this.rectanglesCollision({ topLeft: bullet.position, size: bulletSize },
                    { topLeft: this.getCurrentBackObjPosition(sw), size: backObjSize })) {
                    bullet.kill();
                    this.activeLasers = false;
                    audioPlayer.play("laser", false);
                    clearTimeout(this.laserTimeout);
                    this.laserTimeout = setTimeout(() => { this.activeLasers = true }, 2000);
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

    getCurrentBlocks(): Block[] {
        return this.level.blocks.filter(item =>
            ((item.position.x > this.timePassed * this.scrollSpeed &&
                item.position.x < this.timePassed * this.scrollSpeed + boardSize.width) ||
                (item.position.x + backObjSize.width > this.timePassed * this.scrollSpeed &&
                    item.position.x + backObjSize.width < this.timePassed * this.scrollSpeed + boardSize.width))
            && !item.ded);
    }

    getCurrentLasers(): Laser[] {
        return this.level.lasers.filter(item =>
            (item.position.x > this.timePassed * this.scrollSpeed &&
                item.position.x < this.timePassed * this.scrollSpeed + boardSize.width) ||
            (item.position.x + backObjSize.width > this.timePassed * this.scrollSpeed &&
                item.position.x + backObjSize.width < this.timePassed * this.scrollSpeed + boardSize.width));
    }

    getCurrentSwitches(): Coords[] {
        return this.level.switches.filter(item =>
            (item.x > this.timePassed * this.scrollSpeed &&
                item.x < this.timePassed * this.scrollSpeed + boardSize.width) ||
            (item.x + backObjSize.width > this.timePassed * this.scrollSpeed &&
                item.x + backObjSize.width < this.timePassed * this.scrollSpeed + boardSize.width));
    }

    getCurrentBackObjPosition(coords: Coords): Coords {
        return { x: coords.x - this.timePassed * this.scrollSpeed, y: coords.y };
    }

    getLaserSize(laser: Laser): Size {
        return { width: backObjSize.width, height: laser.height * backObjSize.height };
    }

    getCurrentLines(): Line[] {
        return this.level.lines.filter(item =>
            (item.start.x > this.timePassed * this.scrollSpeed &&
                item.start.x < this.timePassed * this.scrollSpeed + boardSize.width) ||
            (item.end.x > this.timePassed * this.scrollSpeed &&
                item.end.x < this.timePassed * this.scrollSpeed + boardSize.width));
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

    textScreen(graphic: HTMLImageElement) {
        let time = 0;
        let interval = setInterval(() => {
            let op = (time < 32 ? Math.floor(time / 8) : (time > 82 ? Math.floor((114 - time) / 8) : 4)) * 0.25;
            ctx.fillStyle = "#000";
            ctx.fillRect(0, 0, 2188, 1440);
            ctx.globalAlpha = op;
            ctx.drawImage(graphic, (2188 - graphic.width) / 2, (1440 - graphic.height) / 2);
            ctx.globalAlpha = 1;
            time++;
            if (time >= 114)
                clearInterval(interval);
        }, 20);
    }

    playerDied() {
        if (this.player.justDied)
            return;
        this.player.justDied = true;
        for (const bullet of this.bullets)
            bullet.pause = true;
        for (const enemy of this.enemies)
            enemy.pause = true;
        this.expoStage = 0;
        let expoInterval = setInterval(() => {
            this.expoStage++;
            if (this.expoStage == 4)
                clearInterval(expoInterval);
        }, 110);
        setTimeout(() => {
            this.expoStage = -1;
            this.player.activateShield();
            this.player.hp--;
        }, 550);
        setTimeout(() => {
            this.player.justDied = false;
            for (const bullet of this.bullets)
                bullet.pause = false;
            for (const enemy of this.enemies)
                enemy.pause = false;
        }, 600);
    }
}

export { Game };