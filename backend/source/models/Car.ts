import TickInterface from "#interfaces/TickInterface";
import Vertex from "#models/Vertex";
import Booking from "#models/Booking";

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

    public isBusy(): boolean {
        return this.hasDestination();
    }

    public book(booking: Booking): void {
        if (this.isBusy()) {
            throw new Error("Car is busy");
        }

        this._destinations.push(booking.source);
        this._destinations.push(booking.destination);
    }

    public getDistanceToDestination() {
        if (this.hasDestination() === false) {
            throw new Error("Car has no destination");
        }

        const [destination] = this._destinations;

        return this._location.getManhattanDistanceToVertex(destination);
    }

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
