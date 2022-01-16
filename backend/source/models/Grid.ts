import GridInterface from "#interfaces/GridInterface";
import Vertex from "#models/Vertex";

class Grid implements GridInterface {
    readonly topLeft: Vertex;
    readonly bottomRight: Vertex;

    constructor({topLeft, bottomRight}: {topLeft: Vertex, bottomRight: Vertex}) {
        this.topLeft = topLeft;
        this.bottomRight = bottomRight;
    }

    public isValidVertex(vertex: Vertex): boolean {
        return vertex.x >= this.topLeft.x &&
            vertex.y <= this.topLeft.y &&
            vertex.x <= this.bottomRight.x &&
            vertex.y >= this.bottomRight.y;
    }

}

export default Grid;
