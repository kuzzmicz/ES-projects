const { getUser } = require('../src/userService');
const fetch = require('node-fetch');
jest.mock('node-fetch');
describe('getUser', () => {
  it('should return user data when the API call is successful', async () => {
    const mockUser = { id: 1, name: 'John Doe' };
    fetch.mockResolvedValue({
      ok: true,
      json: async () => mockUser
    });
    const user = await getUser(1);
    expect(user).toEqual(mockUser);
  });
  it('should throw an error when the API call is unsuccessful', async () => {
    fetch.mockResolvedValue({
      ok: false
    });
    await expect(getUser(1)).rejects.toThrow('Network response was not ok');
  });
  it('should throw an error when fetch fails', async () => {
    fetch.mockRejectedValue(new Error('Failed to fetch'));
    await expect(getUser(1)).rejects.toThrow('Failed to fetch');
  });
  it('should throw an error when the response is not valid JSON', async () => {
    fetch.mockResolvedValue({
      ok: true,
      json: async () => {
        throw new Error('Invalid JSON');
      }
    });
    await expect(getUser(1)).rejects.toThrow('Invalid JSON');
  });
});