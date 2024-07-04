const {wait} = require('./async_jest');
test('wait must return a promise', () => {

    expect(wait(1000)).toBeInstanceOf(Promise);
});

test('wait must resolve after a given time', async () => {
    const start = Date.now();
    await wait(1000);
    const end = Date.now();
    expect(end - start).toBeGreaterThanOrEqual(1000);
} );

test('wait must resolve with the given value', async () => {
    const value = 1000;
    const result = await wait(1000, value);
    expect(result).toBe(value);
});