import Booking from "#models/Booking";
import Car from "#models/Car";
import Grid from "#models/Grid";
import Vertex from "#models/Vertex";
import World from "#models/World";

const grid = new Grid({
    topLeft: new Vertex({x: -10, y: 10}),
    bottomRight: new Vertex({x: 10, y: -10})
});

describe('functional', () => {

    it('creates a booking', () => {
        const world = new World({grid});
        const booking = new Booking({
            source: new Vertex({x: 2, y: -8}),
            destination: new Vertex({x: -5, y: 4})
        });

        world.addCar(new Car({id: 1}));
        world.addCar(new Car({id: 2}));
        world.addCar(new Car({id: 3}));

        expect(world.book(booking)).toMatchObject({
            carId: 1,
            totalTime: 29
        });

    });

    it('ticks', () => {
        const world = new World({grid});
        world.tick();
    });

});

describe('Coverage - Busy Cars', () => {

    beforeAll(() => {
        jest.spyOn(Car.prototype, 'isBusy').mockImplementation(() => true);
    });

    it('booking returns false when all cars are busy', () => {
        const world = new World({grid});
        const booking = new Booking({
            source: new Vertex({x: 2, y: -8}),
            destination: new Vertex({x: -5, y: 4})
        });

        world.addCar(new Car({id: 1}));
        world.addCar(new Car({id: 2}));
        world.addCar(new Car({id: 3}));

        expect(world.book(booking)).toEqual(false);
    });

    afterAll(() => {
        jest.restoreAllMocks();
    });

});

describe('coverage - exceptions', () => {
    it('throws exception when booking is out of bounds', () => {
        const world = new World({grid});
        const booking = new Booking({
            source: new Vertex({x: 11, y: -8}),
            destination: new Vertex({x: -5, y: 4})
        });

        expect(() => world.book(booking)).toThrowError();
    });

    it('throws exception when adding a car that is out of bounds', () => {
        const car = new Car({id: 1});
        const spy = jest.spyOn(car, 'location', 'get').mockReturnValue(new Vertex({x: 11, y: 0}));

        const world = new World({grid});

        expect(() => world.addCar(car)).toThrowError();

        spy.mockRestore();
    });

    it('throws exception when adding nonunique cars.', () => {
        const world = new World({grid});
        world.addCar(new Car({id: 1}));
        expect(() => { world.addCar(new Car({id: 1})); }).toThrowError();
    });
});

describe('coverage - alternative booking scenarios', () => {
    it('when booking results in a tie, car with smaller id wins', () => {
        const car1 = new Car({id: 1});
        const car2 = new Car({id: 2});
        const world = new World({grid});

        world.addCar(car2);
        world.addCar(car1);
        const result = world.book(
            new Booking({
                source: new Vertex({x: 5, y: -2}),
                destination: new Vertex({x: 5, y: -2})
            })
        );
        expect(result).toMatchObject({
            carId: 1
        });
    });

    it('selects nearest car when cars are at different locations', () => {
        const car1 = new Car({id: 1});
        const car2 = new Car({id: 2});
        const car3 = new Car({id: 3});

        const spy1 = jest.spyOn(car1, 'location', 'get').mockReturnValue(new Vertex({x: 2, y: 0}));
        const spy2 = jest.spyOn(car2, 'location', 'get').mockReturnValue(new Vertex({x: 4, y: -5}));
        const spy3 = jest.spyOn(car3, 'location', 'get').mockReturnValue(new Vertex({x: -7, y: 4}));

        const world = new World({grid});

        world.addCar(car1);
        world.addCar(car2);
        world.addCar(car3);

        const result = world.book(
            new Booking({
                source: new Vertex({x: -6, y: 3}),
                destination: new Vertex({x: 0, y: 0})
            })
        );
        expect(result).toMatchObject({
            carId: 3
        });

        spy1.mockRestore();
        spy2.mockRestore();
        spy3.mockRestore();
    });

});
