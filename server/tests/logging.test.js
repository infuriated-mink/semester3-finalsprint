const fs = require('fs');
const logSearch = require('../routes/logging');

// Mock fs.appendFile
jest.mock('fs', () => ({
  appendFile: jest.fn((path, data, callback) => callback(null))
}));

describe('logSearch', () => {
  const name = 'testUser';
  const searchTerm = 'jest';
  const timestamp = '2024-04-09T15:07:06.252Z';

  beforeEach(() => {
    // Clear all instances and calls to constructor and all methods:
    fs.appendFile.mockClear();
  });

  it('writes the correct log note to the file', () => {
    const expectedLogNote = `User: ${name} searched for ${searchTerm} at ${timestamp}\n`;

    logSearch(name, searchTerm, timestamp, () => {});

    expect(fs.appendFile).toHaveBeenCalledWith(
      expect.any(String), 
      expectedLogNote,
      expect.any(Function) 
    );
  });

  it('calls the callback function after logging', done => {
    logSearch(name, searchTerm, timestamp, () => {
      done();
    });

    expect(fs.appendFile).toHaveBeenCalledTimes(1);
  });
});