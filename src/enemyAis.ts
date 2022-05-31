import { boardSize, enemySize } from "./consts";
import { EnemyMovement } from "./interfaces";

function getEnemyAi(ai: number): EnemyMovement[] {
    let enemyAi: EnemyMovement[];
    if (ai === 0) {
        enemyAi = [
            { direction: { x: -1, y: 0 }, distance: 1730, frames: 50 },
            { direction: { x: 0, y: 1 }, distance: 430, frames: 20 },
            { direction: { x: 1, y: 0 }, distance: 1440, frames: 40 },
            { direction: { x: 0, y: 1 }, distance: 325, frames: 15 },
            { direction: { x: -1, y: 0 }, distance: 1080, frames: 50 },
            { direction: { x: 0, y: -1 }, distance: 325, frames: 15 },
            { direction: { x: 1, y: 0 }, distance: 1370, frames: 65 }
        ];
    }
    else if (ai === 1) {
        enemyAi = [
            { direction: { x: -1, y: 0 }, distance: 1655, frames: 80 },
            { direction: { x: 0, y: 1 }, distance: 540, frames: 25 },
            { direction: { x: 1, y: 0 }, distance: 1655, frames: 230 }
        ];
    }
    else if (ai === 2) {
        enemyAi = [
            { direction: { x: -1, y: 0 }, distance: 1655, frames: 115 },
            { direction: { x: 0, y: -1 }, distance: 505, frames: 35 },
            { direction: { x: 1, y: 0 }, distance: 1655, frames: 115 }
        ];
    }
    else if (ai === 3) {
        enemyAi = [
            { direction: { x: -1, y: 0 }, distance: 150, frames: 10 },
            { direction: { x: -1, y: -0.5 }, distance: 135, frames: 10 },
            { direction: { x: -0.5, y: -1 }, distance: 75, frames: 5 },
            { direction: { x: 0, y: -1 }, distance: 70, frames: 5 },
            { direction: { x: -0.5, y: -1 }, distance: 75, frames: 5 },
            { direction: { x: -1, y: -0.5 }, distance: 135, frames: 10 }
        ];
        let groundCovered = 495;
        let yWay = -1;
        while (true) {
            for (let i = 0; i < 6; i++) {
                let e = enemyAi[i];
                enemyAi.push({
                    direction: {
                        x: e.direction.x,
                        y: e.direction.y * yWay
                    },
                    distance: e.distance,
                    frames: e.frames
                });
            }
            groundCovered += 495;
            if (groundCovered > boardSize.width + enemySize.width)
                break;
            yWay *= -1;
        }
    }
    else if (ai === 4) {
        enemyAi = [
            { direction: { x: -1, y: 0 }, distance: 150, frames: 20 },
            { direction: { x: 0, y: -1 }, distance: 1080, frames: 75 },
            { direction: { x: -1, y: 0 }, distance: 1010, frames: 35 },
            { direction: { x: 0, y: 1 }, distance: 1267, frames: 100 }
        ];
    }
    return enemyAi;
}

export { getEnemyAi };