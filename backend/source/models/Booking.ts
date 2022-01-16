import Vertex from "#models/Vertex";

class Booking {
    readonly source: Vertex;
    readonly destination: Vertex;

    constructor({source, destination}: {source: Vertex, destination: Vertex}) {
        this.source = source;
        this.destination = destination;
    }

    public getDistance(): number {
        return this.destination.getManhattanDistanceToVertex(this.source);
    }
}

export default Booking;
