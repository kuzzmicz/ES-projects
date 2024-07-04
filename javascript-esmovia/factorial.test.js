const {factorial} = require('./factorial');

test("factorial of 5 is 120", async ()=>{
    const result = await factorial(5);
    expect(result).toBe(120);
});

test("factorial of 3 is 6", async ()=>{
    const result = await factorial(3);
    expect(result).toBe(6);
});

test("factorial of 4 is 24", async()=>{
    const result = await factorial(4);
    expect(result).toBe(24);
});

test("factorial of 6 is 720", async()=>{
    const result = await factorial(6);
    expect(result).toBe(720);
});

test("factorial of 0 is 1", async()=>{
    const result = await factorial(0);
    expect(result).toBe(1);
});