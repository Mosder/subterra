interface Coords {
    x: number,
    y: number
}
interface Controls {
    up: string,
    right: string,
    down: string,
    left: string,
    shoot: string,
    hitboxes: string
}
interface EnemyMovement {
    direction: Coords;
    distance: number;
    frames: number;
}
interface Line {
    start: Coords;
    end: Coords;
}
interface EnemySpawn {
    spawnTime: number;
    ai: number;
    startY: number;
    sprite: number;
    color: number;
}
interface Level {
    blackScreenLength: number;
    lines: Line[];
    enemySpawns: EnemySpawn[];
    blocks: Block[];
    lasers: Laser[];
    switches: Coords[];
}
interface Size {
    width: number;
    height: number;
}
interface Rectangle {
    topLeft: Coords;
    size: Size;
}
interface Block {
    position: Coords;
    ded: boolean;
}
interface Laser {
    position: Coords;
    height: number;
}

export { Coords, Controls, EnemyMovement, Line, EnemySpawn, Level, Rectangle, Block, Laser, Size };