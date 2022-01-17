import Vertex from "#models/Vertex";
/**
 * The grid interface was added to support expansion into different types
 * of grids (or graphs). Example: instead of using a 2D grid, what if we
 * wanted to use a 3D grid?
 */
interface GridInterface {
    isValidVertex(vertex: Vertex): boolean;
}

export default GridInterface;
