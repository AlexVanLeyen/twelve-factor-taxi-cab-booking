import Booking from "#models/Booking";
import Car from "#models/Car";
import Vertex from "#models/Vertex";

describe('functional', () => {

    it('computes distance to destination', () => {
        const car = new Car({id: 1});
        const booking = new Booking({
            source: new Vertex({x: 0, y: 0}),
            destination: new Vertex({x: 0, y: 0})
        });
        car.book(booking);
        const distance = car.getDistanceToDestination();
        expect(distance).toEqual(0);
    });

    it('moves towards positive x destination', () => {
        const car = new Car({id: 1});
        const booking = new Booking({
            source: new Vertex({x: 1, y: 0}),
            destination: new Vertex({x: 0, y: 0})
        });
        car.book(booking);
        car.onTick();
        expect(car.location.x).toEqual(1);
        expect(car.location.y).toEqual(0);
    });

    it('moves towards positive y destination', () => {
        const car = new Car({id: 1});
        const booking = new Booking({
            source: new Vertex({x: 0, y: 1}),
            destination: new Vertex({x: 0, y: 0})
        });
        car.book(booking);
        car.onTick();
        expect(car.location.x).toEqual(0);
        expect(car.location.y).toEqual(1);
    });

    it('moves towards negative x destination', () => {
        const car = new Car({id: 1});
        const booking = new Booking({
            source: new Vertex({x: -1, y: 0}),
            destination: new Vertex({x: 0, y: 0})
        });
        car.book(booking);
        car.onTick();
        expect(car.location.x).toEqual(-1);
        expect(car.location.y).toEqual(0);
    });

    it('moves towards negative y destination', () => {
        const car = new Car({id: 1});
        const booking = new Booking({
            source: new Vertex({x: 0, y: -1}),
            destination: new Vertex({x: 0, y: 0})
        });
        car.book(booking);
        car.onTick();
        expect(car.location.x).toEqual(0);
        expect(car.location.y).toEqual(-1);
    });

    it('is busy when booked', () => {
        const car = new Car({id: 1});
        const booking = new Booking({
            source: new Vertex({x: 0, y: 0}),
            destination: new Vertex({x: 0, y: 0})
        });
        car.book(booking);
        expect(car.isBusy()).toEqual(true);
    });

    it('booking is on same node as car', () => {
        const car = new Car({id: 1});
        const booking = new Booking({
            source: new Vertex({x: 0, y: 0}),
            destination: new Vertex({x: 0, y: 0})
        });
        car.book(booking);
        car.onTick();
        expect(car.location.x).toEqual(0);
        expect(car.location.y).toEqual(0);
    });

    it('throws exception when booking a booked car', () => {
        const car = new Car({id: 1});
        const booking = new Booking({
            source: new Vertex({x: 0, y: 0}),
            destination: new Vertex({x: 0, y: 0})
        });
        car.book(booking);
        expect(() => {car.book(booking);}).toThrowError();
    });

    it('throws exception when requesting distance with no destination', () => {
        const car = new Car({id: 1});
        expect(() => {car.getDistanceToDestination();}).toThrowError();
    });
});

describe('coverage', () => {
    it('tick immediately returns when car has no destination', () => {
        const car = new Car({id: 1});
        car.onTick();
    });
});
