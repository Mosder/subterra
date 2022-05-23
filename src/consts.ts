const canvas = document.getElementById("game") as HTMLCanvasElement;
const ctx = canvas.getContext("2d");
const boardSize = { width: 2188, height: 1267 };
const playerSize = { width: 172, height: 71 };
const bulletSize = { width: 30, height: 10 };
const enemySize = { width: 172, height: 150 };

export { canvas, ctx, boardSize, playerSize, bulletSize, enemySize };