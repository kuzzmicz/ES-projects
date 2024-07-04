const {circle, triangle, square} = require('./area');

test("The area of square with 3cm side", ()=>{
    expect(square(3)).toBe(9);
});

test("The area of triangle with 2cm base and 4cm height", ()=>{
    expect(triangle(2,4)).toBe(4);
});

test("The area of circle with 2cm radius", ()=>{
    expect(circle(2)).toBe(12.56);
});  