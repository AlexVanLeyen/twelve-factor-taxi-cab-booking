import TickInterface from "#interfaces/TickInterface";
import Vertex from "#models/Vertex";
import Booking from "#models/Booking";
import NoDestinationException from "#exceptions/NoDestinationException";
import CarBusyException from "#exceptions/CarBusyException";

class Car implements TickInterface {

    readonly id: number;
    private _location: Vertex;
    private _destinations: Vertex[];

    constructor({id}: {id: number}) {
        this._location = new Vertex({x: 0, y: 0});
        this._destinations = [];
        this.id = id;
    }

    get location(): Vertex {
        return this._location;
    }

    /**
     * Convenience method for determining if this taxi is busy.
     * @returns boolean
     */
    public isBusy(): boolean {
        return this.hasDestination();
    }

    /**
     * Books this taxi.
     * @throws CarBusyException is thrown when booking a taxi that is already booked.
     * @param booking
     */
    public book(booking: Booking): void {
        if (this.isBusy()) {
            throw new CarBusyException("Car is busy");
        }

        this._destinations.push(booking.source);
        this._destinations.push(booking.destination);
    }

    /**
     * Calculates the distance between the taxi's current location and it's
     * current destination.
     * @throws NoDestinationException is thrown when the taxi has no destination.
     * @returns The distance in units.
     */
    public getDistanceToDestination(): number {
        if (this.hasDestination() === false) {
            throw new NoDestinationException("Car has no destination");
        }

        const [destination] = this._destinations;

        return this._location.getManhattanDistanceToVertex(destination);
    }

    /**
     * Handler for world tick event.
     *
     * This method moves the taxi one unit towards its current
     * destination.
     */
    public onTick(): void {
        if (this.hasDestination() === false) {
            return;
        }

        const [destination] = this._destinations;
        const currentLocation = this._location;

        if (currentLocation.getManhattanDistanceToVertex(destination) > 0) {
            const deltaX = destination.x - currentLocation.x;
            const deltaY = destination.y - currentLocation.y;

            this._location =
                Math.abs(deltaX) > Math.abs(deltaY) ?
                    new Vertex({x: currentLocation.x - (deltaX > 0 ? -1 : 1), y: currentLocation.y}) :
                    new Vertex({x: currentLocation.x, y: currentLocation.y - (deltaY > 0 ? -1 : 1)});
        }

        if (this._location.getManhattanDistanceToVertex(destination) === 0) {
            this._destinations.shift();
        }
    }

    private hasDestination(): boolean {
        return this._destinations.length > 0;
    }
}

export default Car;
