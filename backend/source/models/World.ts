import GridInterface from '#interfaces/GridInterface';
import Car from '#models/Car';
import Booking from '#models/Booking';
import Vertex from '#models/Vertex';
import OutsideGridException from '#exceptions/OutsideGridException';
import NonUnqiueException from '#exceptions/NonUniqueException';

export type BookingResponse = {
    carId: number
    totalTime: number
} | false;


class World {

    private cars: Car[];
    private grid: GridInterface;

    constructor({grid}: {grid: GridInterface}) {
        this.cars = [];
        this.grid = grid;
    }

    public book(booking: Booking): BookingResponse {
        if ( this.grid.isValidVertex(booking.source) === false ||
            this.grid.isValidVertex(booking.destination) === false) {
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

    public addCar(car: Car): void {
        if (this.grid.isValidVertex(car.location) === false) {
            throw new OutsideGridException('Car is outside of the world');
        }

        if (this.cars.find((existingCars) => existingCars.id === car.id)) {
            throw new NonUnqiueException('Car ID is nonunique');
        }

        this.cars.push(car);
    }

    public tick(): void {
        this.cars.forEach((car) => car.onTick());
    }

    private findNearestAvailableCar(vertex: Vertex): Car | null {
        const availableCars = this.cars.filter((car) => car.isBusy() === false);

        return  availableCars.length > 0 ?
            availableCars.reduce(
                (previous, current) => {
                    const delta = current.location.getManhattanDistanceToVertex(vertex) - previous.location.getManhattanDistanceToVertex(vertex);

                    return  delta < 0 || (delta === 0 && current.id < previous.id) ? current : previous;
                }
            ) : null;
    }

}

export default World;
