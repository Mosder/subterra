import { AudioPlayer } from "./AudioPlayer";

const canvas = document.getElementById("game") as HTMLCanvasElement;
const ctx = canvas.getContext("2d");
const boardSize = { width: 2188, height: 1267 };
const playerSize = { width: 172, height: 71 };
const bulletSize = { width: 344, height: 21 };
const enemySize = { width: 172, height: 150 };
const backObjSize = { width: 57, height: 57 };
const audioPlayer = new AudioPlayer(1);
const gfx = {
    "background": getImage("background"),
    "bullet": getImage("bullet"),
    "enemies": new Array<HTMLImageElement>(),
    "explosions": getImage("explosions"),
    "player": getImage("player"),
    "playerVert": getImage("playerVert"),
    "expo": getImage("expo"),
    "shield": getImage("shield"),
    "uiBar": getImage("uiBar"),
    "digPoints": getImage("digitsPoints"),
    "digUi": getImage("digitsUi"),
    "other": getImage("other"),
    "main": getImage("main"),
    "prepare": getImage("prepare"),
    "gameOver": getImage("gameOver"),
    "completed": getImage("completed")
};
for (let i = 0; i < 5; i++)
    gfx.enemies.push(getImage(`enemy${i}`));

function getImage(name: string) {
    let img = new Image();
    img.src = `./gfx/${name}.png`;
    return img;
}

export { canvas, ctx, boardSize, playerSize, bulletSize, enemySize, backObjSize, audioPlayer, gfx };