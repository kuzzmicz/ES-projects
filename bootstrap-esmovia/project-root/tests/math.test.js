const {add, substract} = require('../src/math');

test('adds 1+2 to equal 3', () => {
expect(add(1,2)).toBe(3);
});

test('substracts 5 - 3 to equal 2', () => {
    expect(substract(5,3)).toBe(2);
    });