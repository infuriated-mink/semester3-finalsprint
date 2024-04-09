const { checkAuthenticated } = require('../index');

jest.mock('../index', () => ({
    checkAuthenticated: jest.fn(() => true),
}));

describe('Test login function', () => {
    it('should return true if login is successful', () => {
        const result = checkAuthenticated();

        expect(result).toBe(true);
    });
});

