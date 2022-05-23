import { Game } from "./Game";

let controls = {
    up: 'ArrowUp',
    right: 'ArrowRight',
    down: 'ArrowDown',
    left: 'ArrowLeft',
    shoot: 'z',
    hitboxes: 'h'
}
let game = new Game(controls);

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
