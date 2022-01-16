import Grid from '#models/Grid';
import Vertex from '#models/Vertex';

describe('functional', () => {
    it('is valid vertex', () => {
        const grid = new Grid({
            topLeft: new Vertex({x: -10, y: 10}),
            bottomRight: new Vertex({x: 10, y: -10})
        });

        expect(grid.isValidVertex(new Vertex({x: 0, y: 0}))).toEqual(true);
        expect(grid.isValidVertex(new Vertex({x: -11, y: 0}))).toEqual(false);
        expect(grid.isValidVertex(new Vertex({x: 0, y: -11}))).toEqual(false);
        expect(grid.isValidVertex(new Vertex({x: 11, y: 0}))).toEqual(false);
        expect(grid.isValidVertex(new Vertex({x: 0, y: 11}))).toEqual(false);
    });
});
