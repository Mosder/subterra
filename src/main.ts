import { ctx, gfx } from "./consts";
import { Game } from "./Game";

let controls = {
    up: 'ArrowUp',
    right: 'ArrowRight',
    down: 'ArrowDown',
    left: 'ArrowLeft',
    shoot: 'z',
    hitboxes: 'h'
}
let game: Game;
gfx.main.onload = () => { ctx.drawImage(gfx.main, 0, 0); };
document.body.addEventListener("keyup", (e) => {
    if (e.key === "Enter") {
        if (game !== undefined)
            game.player.hp = -2;
        game = new Game(controls, 0);
    }
});

// TODO: EnemyAI, Audio, PlayerExplode

// let canvas = document.getElementById("game");
// let screen = 0;
// let points = "";
// canvas.addEventListener("click", (e) => {
//     points += `[${Math.floor((e.clientX - 10) * 2188 / 1382 + 1850 * screen)}, ` +
//         `${Math.floor((e.clientY - 10) * 1267 / 800)}],\n`;
// })
// document.body.addEventListener("keyup", (e) => {
//     let xd = e.key;
//     if (xd === "Enter")
//         console.log(points);
//     else if (xd === "Delete")
//         points = "";
//     let x = parseInt(xd);
//     if (Number.isInteger(x)) {
//         screen = x;
//         game.timePassed = x * 5285;
//     }
// });
