import { EnemyMovement } from "./interfaces";

function getEnemyAi(ai: number): EnemyMovement[] {
    let enemyAi: EnemyMovement[];
    if (ai === 0) {
        enemyAi = [
            { direction: { x: -1, y: 0 }, distance: 1720, speed: 8 },
            { direction: { x: 0, y: 1 }, distance: 432, speed: 8 },
            { direction: { x: 1, y: 0 }, distance: 1494, speed: 8 },
            { direction: { x: 0, y: 1 }, distance: 324, speed: 8 },
            { direction: { x: -1, y: 0 }, distance: 919, speed: 8 },
            { direction: { x: 0, y: -1 }, distance: 324, speed: 8 },
            { direction: { x: 1, y: 0 }, distance: 1145, speed: 8 }
        ];
    }
    else if (ai === 1) {
        enemyAi = [
            { direction: { x: -1, y: 0 }, distance: 800, speed: 2 },
            { direction: { x: 0, y: -1 }, distance: 200, speed: 2 },
            { direction: { x: 1, y: 0 }, distance: 800, speed: 2 }
        ];
    }
    return enemyAi;
}

export { getEnemyAi };