import Booking from '#models/Booking';
import Vertex from '#models/Vertex';

describe('functional', () => {
    it('gets the correct distance', () => {
        const booking = new Booking({
            source: new Vertex({x: 0, y: 0}),
            destination: new Vertex({x: 0, y: 0})
        });
        const booking2 = new Booking({
            source: new Vertex({x: -1, y: 0}),
            destination: new Vertex({x: 1, y: 0})
        });

        expect(booking.getDistance()).toEqual(0);
        expect(booking2.getDistance()).toEqual(2);
    });
});
