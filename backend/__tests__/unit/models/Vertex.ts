import Vertex from "#models/Vertex";

describe('functional', () => {
    it('calculates manhattan distance', () => {
        const source = new Vertex({x: 0, y: 0});
        const destination = new Vertex({x: 10, y: -10});
        expect(source.getManhattanDistanceToVertex(destination)).toEqual(20);
    });

    it ('converts to string', () => {
        const vertex = new Vertex({x: 0, y: 0});
        expect(vertex.toString()).toEqual('[0,0]');
    });
});
