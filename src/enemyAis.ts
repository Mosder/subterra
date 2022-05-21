import { EnemyMovement } from "./interfaces";

function getEnemyAi(ai: number): EnemyMovement[] {
    let enemyAi: EnemyMovement[];
    if (ai === 0) {
        enemyAi = [
            { direction: { x: -1, y: 0 }, distance: 800, speed: 2, speedDelay: 1 },
            { direction: { x: 0, y: -1 }, distance: 200, speed: 2, speedDelay: 1 },
            { direction: { x: 1, y: 0 }, distance: 800, speed: 2, speedDelay: 1 }
        ];
    }
    else if (ai === 1) {
        enemyAi = [
            { direction: { x: -1, y: 0 }, distance: 800, speed: 2, speedDelay: 1 },
            { direction: { x: 0, y: 1 }, distance: 200, speed: 2, speedDelay: 1 },
            { direction: { x: 1, y: 0 }, distance: 700, speed: 2, speedDelay: 1 },
            { direction: { x: 0, y: 1 }, distance: 200, speed: 2, speedDelay: 1 },
            { direction: { x: -1, y: 0 }, distance: 700, speed: 2, speedDelay: 1 },
            { direction: { x: 0, y: 1 }, distance: 200, speed: 2, speedDelay: 1 },
            { direction: { x: 1, y: 0 }, distance: 800, speed: 2, speedDelay: 1 }
        ];
    }
    return enemyAi;
}

export { getEnemyAi };