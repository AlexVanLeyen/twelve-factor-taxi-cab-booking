class Vertex {
    readonly x: number;
    readonly y: number;

    constructor({x, y}: {x: number, y: number}) {
        this.x = x;
        this.y = y;
    }

    public getManhattanDistanceToVertex(destination: Vertex): number {
        const {x: x0, y: y0} = this;
        const {x: x1, y: y1} = destination;

        return Math.abs(x1 - x0) + Math.abs(y1 - y0);
    }

    toString() {
        return `[${this.x},${this.y}]`;
    }

}

export default Vertex;
