const Ship= require('./classes/ship');
const Gameboard= require('./classes/gameboard');

let gb=new Gameboard();
let barca=new Ship(4);
let barca2=new Ship(3);

gb.amplasare(barca,[[0,1],[0,2]]);

test('Verificare ocupare', () => {
    expect(gb.isOccupied([[0,4],[0,5],[5,5]])).toBe(false);
});

test('Verificare ocupare', () => {
    expect(gb.isOccupied([[0,1],[0,2]])).toBe(true);
});

test('Verificare ocupare', () => {
    expect(gb.isOccupied([[0,1],[0,6]])).toBe(true);
});

test('Verificare ocupare', () => {
    expect(gb.isOccupied([[0,7],[0,2]])).toBe(true);
});

test('Verificare bounds', () => {
    expect(gb.areWithinBounds([[0,7],[0,2]])).toBe(true);
});
test('Verificare bounds', () => {
    expect(gb.areWithinBounds([[0,3],[4,6]])).toBe(true);
});
test('Verificare bounds', () => {
    expect(gb.areWithinBounds([[0,3],[4,10]])).toBe(false);
});
test('Verificare bounds', () => {
    expect(gb.areWithinBounds([[0,3],[10,5]])).toBe(false);
});
test('Verificare bounds', () => {
    expect(gb.areWithinBounds([[2,10],[5,5]])).toBe(false);
});
test('Verificare bounds', () => {
    expect(gb.areWithinBounds([[-1,3],[5,5]])).toBe(false);
});
test('Verificare bounds', () => {
    expect(gb.areWithinBounds([[0,3],[-1,5]])).toBe(false);
});
test('Verificare bounds', () => {
    expect(gb.areWithinBounds([[0,3],[0,-1]])).toBe(false);
});
test('Verificare bounds', () => {
    expect(gb.areWithinBounds([[0,-3],[0,1]])).toBe(false);
});

test('Verificare bounds', () => {
    expect(gb.areWithinBounds([[0,7],[0,2],[0,19]])).toBe(false);
});

test('hit() should increment correctly', () => {
    expect(barca.hitFn()).toBe(1);
    expect(barca.hitFn()).toBe(2);
    expect(barca.hitFn()).toBe(3);
    expect(barca.hitFn()).toBe(4);
    expect(barca.isSunk()).toBe(true);  // Now this should pass
});

test('barca2 hit should not increment when another ship is hit', () => {
    gb.amplasare(barca2, [[1, 0], [2, 0], [3, 0]]);
    gb.receiveAttack([1, 0]);
    expect(barca2.hit).toBe(1);  // Should pass
    gb.receiveAttack([1, 0]);
    gb.receiveAttack([0, 1]);
    expect(barca2.hit).toBe(1);  // Should still pass because we're hitting the same spot
});

