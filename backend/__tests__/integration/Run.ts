import Booking from "#models/Booking";
import Car from "#models/Car";
import Grid from "#models/Grid";
import Vertex from "#models/Vertex";
import World from "#models/World";

describe('Integration', () => {
    it('runs a few ticks', () => {
        const grid = new Grid({topLeft: new Vertex({x: -10, y: 10}), bottomRight: new Vertex({x: 10, y: -10})});
        const world = new World({grid});

        const car1 = new Car({id: 1});
        const car2 = new Car({id: 2});
        const car3 = new Car({id: 3});

        world.addCar(car1);
        world.addCar(car2);
        world.addCar(car3);

        expect(car1.location).toMatchObject({x: 0, y: 0});
        expect(car2.location).toMatchObject({x: 0, y: 0});
        expect(car2.location).toMatchObject({x: 0, y: 0});

        expect(
            world.book(
                new Booking({
                    source: new Vertex({x: 2, y: -2}),
                    destination: new Vertex({x: -10, y: 0})
                })
            )
        )
        .toMatchObject({
            carId: 1,
            totalTime: 18
        });

        world.tick();

        expect(car1.location).toMatchObject({x: 0, y: -1});
        expect(car2.location).toMatchObject({x: 0, y: 0});
        expect(car2.location).toMatchObject({x: 0, y: 0});

        world.tick();

        expect(car1.location).toMatchObject({x: 1, y: -1});
        expect(car2.location).toMatchObject({x: 0, y: 0});
        expect(car2.location).toMatchObject({x: 0, y: 0});

        world.tick();

        expect(car1.location).toMatchObject({x: 1, y: -2});
        expect(car2.location).toMatchObject({x: 0, y: 0});
        expect(car2.location).toMatchObject({x: 0, y: 0});

    });
});
