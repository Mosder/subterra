import { Player } from "./Player";
import { Controls, Level } from "./interfaces";
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
    scrollSpeed: number = 1;
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
            // this.timePassed += 10;
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
            for (const line of this.level.lines) {
                ctx.beginPath();
                ctx.moveTo(line.start.x - this.timePassed * this.scrollSpeed, line.start.y);
                ctx.lineTo(line.end.x - this.timePassed * this.scrollSpeed, line.end.y);
                ctx.stroke();
            }
        }
        //bullets
        ctx.fillStyle = "gray";
        for (const bullet of this.bullets)
            ctx.fillRect(bullet.position.x, bullet.position.y, bulletSize.width, bulletSize.height);
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

    bulletCollisionChecker() {
        for (const bullet of this.bullets) {
            for (const enemy of this.enemies) {
                this.bulletEnemyCollision(bullet, enemy);
            }
        }
    }

    playerCollisionChecker() {
        for (const enemy of this.enemies) {
            this.playerEnemyCollision(enemy);
        }
    }

    bulletEnemyCollision(bullet: Bullet, enemy: Enemy) {
        if (bullet.position.x + bulletSize.width > enemy.position.x &&
            bullet.position.x + bulletSize.width < enemy.position.x + enemySize.width &&
            bullet.position.y + bulletSize.height > enemy.position.y &&
            bullet.position.y < enemy.position.y + enemySize.height) {
            bullet.kill();
            enemy.kill();
        }
    }

    playerEnemyCollision(enemy: Enemy) {
        if (this.player.position.x + playerSize.width > enemy.position.x &&
            this.player.position.x < enemy.position.x + enemySize.width &&
            this.player.position.y + playerSize.height > enemy.position.y &&
            this.player.position.y < enemy.position.y + enemySize.height) {
            enemy.kill();
        }
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
}

export { Game };