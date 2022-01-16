import Car from '#models/Car';
import Grid from '#models/Grid';
import Vertex from '#models/Vertex';
import World from '#models/World';

const MAX_INT = 2147483647;
const MIN_INT = -2147483648;

const topLeft = new Vertex({x: MIN_INT, y: MAX_INT});
const bottomRight = new Vertex({x: MAX_INT, y: MIN_INT});
const grid = new Grid({topLeft, bottomRight});

let world: World;

function init(): void {
    world = new World({grid});
    world.addCar(new Car({id: 1}));
    world.addCar(new Car({id: 2}));
    world.addCar(new Car({id: 3}));
}

function resetWorld(): void {
    init();
}

init();

export {
    world,
    resetWorld
};
