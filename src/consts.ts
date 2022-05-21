const canvas = document.getElementById("game") as HTMLCanvasElement;
const ctx = canvas.getContext("2d");
const boardSize = { width: 1280, height: 800 };
const playerSize = { width: 100, height: 50 };
const bulletSize = { width: 30, height: 10 };
const enemySize = { width: 50, height: 50 };

export { canvas, ctx, boardSize, playerSize, bulletSize, enemySize };