interface Coords {
    x: number,
    y: number
}
interface Controls {
    up: string,
    right: string,
    down: string,
    left: string,
    shoot: string
}
interface EnemyMovement {
    direction: Coords;
    distance: number;
    speed: number;
    speedDelay: number;
}
interface Line {
    start: Coords;
    end: Coords;
}
interface EnemySpawn {
    spawnTime: number;
    ai: number;
    startY: number;
}
interface Level {
    lines: Line[];
    enemySpawns: EnemySpawn[];
}

export { Coords, Controls, EnemyMovement, Line, EnemySpawn, Level };