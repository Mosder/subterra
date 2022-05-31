import { ctx, gfx, audioPlayer } from "./consts";
import { Game } from "./Game";

ctx.fillStyle = "#000";
ctx.fillRect(0, 0, 2188, 1440);
let loaded = false;

let controls = {
    up: 'ArrowUp',
    right: 'ArrowRight',
    down: 'ArrowDown',
    left: 'ArrowLeft',
    shoot: 'z',
    hitboxes: 'h'
}
let game: Game;

document.body.addEventListener("keyup", (e) => {
    if (e.key === "Enter") {
        if (loaded) {
            if (game !== undefined)
                game.player.hp = -2;
            game = new Game(controls, 0);
            audioPlayer.stop();
        }
        else {
            ctx.drawImage(gfx.main, 0, 0);
            audioPlayer.play("main", true);
            loaded = true;
        }
    }
    else if (e.key === "m") {
        audioPlayer.changeVolume(Math.abs(audioPlayer.volume - 1));
    }
});

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
