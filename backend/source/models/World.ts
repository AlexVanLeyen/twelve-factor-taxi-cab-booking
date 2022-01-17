import GridInterface from '#interfaces/GridInterface';
import Car from '#models/Car';
import Booking from '#models/Booking';
import Vertex from '#models/Vertex';
import OutsideGridException from '#exceptions/OutsideGridException';
import NonUnqiueException from '#exceptions/NonUniqueException';

export type BookingResponse = {
    carId: number
    totalTime: number
};

/**
 * The world engine.
 *
 * This class is expected to contain everything needed
 * to manage a single instance of the taxi booking service.
 */
class World {

    private _cars: Car[];
    private _grid: GridInterface;

    constructor({grid}: {grid: GridInterface}) {
        this._cars = [];
        this._grid = grid;
    }

    /**
     * Attempts to book the nearest available taxi.
     * @param booking
     * @returns BookingResponse on a successful booking or false if no taxis are available.
     */
    public book(booking: Booking): BookingResponse | false {
        if ( this._grid.isValidVertex(booking.source) === false ||
            this._grid.isValidVertex(booking.destination) === false) {
                throw new OutsideGridException('Booking source or destination is outside of the world.');
        }

        const car = this.findNearestAvailableCar(booking.source);

        if (car === null) {
            return false;
        }

        car.book(booking);

        return {
            carId: car.id,
            totalTime: car.getDistanceToDestination() + booking.getDistance()
        };
    }

    /**
     * Adds a car to the world.
     * @throws OutsideGridException is thrown if the provided taxi's location is outside of the world's grid.
     * @throws NonUniqueException is thrown if the provided taxi's unique identifier matches another taxi's unique identifier.
     * @param car The taxi.
     */
    public addCar(car: Car): void {
        if (this._grid.isValidVertex(car.location) === false) {
            throw new OutsideGridException('Car is outside of the world');
        }

        if (this._cars.find((existingCars) => existingCars.id === car.id)) {
            throw new NonUnqiueException('Car ID is nonunique');
        }

        this._cars.push(car);
    }

    /**
     * Advances the world by one tick.
     */
    public tick(): void {
        this._cars.forEach((car) => car.onTick());
    }

    private findNearestAvailableCar(vertex: Vertex): Car | null {
        const availableCars = this._cars.filter((car) => car.isBusy() === false);

        let nearestCar;
        if (availableCars.length > 0) {
            nearestCar = availableCars.reduce(
                (previous, current) => {
                    const delta = current.location.getManhattanDistanceToVertex(vertex) - previous.location.getManhattanDistanceToVertex(vertex);

                    return  delta < 0 || (delta === 0 && current.id < previous.id) ? current : previous;
                }
            );
        }

        return  nearestCar ? nearestCar : null;
    }

}

export default World;
