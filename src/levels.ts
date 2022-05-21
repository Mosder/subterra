import { Level } from "./interfaces";

function getLevel(lvlNumber: number) {
    let level: Level;
    if (lvlNumber === 0) {
        level = {
            lines: [
                { start: { x: 50, y: 0 }, end: { x: 500, y: 200 } },
                { start: { x: 500, y: 200 }, end: { x: 1000, y: 200 } },
                { start: { x: 1000, y: 200 }, end: { x: 1280, y: 100 } }
            ],
            enemySpawns: [
                { spawnTime: 3000, ai: 1, startY: 100 },
                { spawnTime: 6000, ai: 0, startY: 666 },
                { spawnTime: 9000, ai: 1, startY: 50 }
            ]
        };
    }
    return level;
}

export { getLevel };