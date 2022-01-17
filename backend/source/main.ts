/**
 * main.ts
 *
 * This is the entry point for the taxi booking service.
 * This module initializes the service's world engine.
 */

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

function _init(): void {
    world = new World({grid});
    world.addCar(new Car({id: 1}));
    world.addCar(new Car({id: 2}));
    world.addCar(new Car({id: 3}));
}

/**
 * Reinitializes the world. All car positions will be
 * reset back to the center of the map, and all active
 * bookings will be dropped.
 */
function resetWorld(): void {
    _init();
}

_init();

export {
    world,
    resetWorld
};
