const assert = require('assert');

const helper = require('../helper');
const models = require('../../models');

describe('models.Housing', () => {
  beforeEach(async () => {
    await helper.loadFixtures(['housings']);
  });

  it('creates a new Item record', async () => {
    let item = models.Housing.build({
      Name: 'Test Title',
      Description: 'This is longer test Text.',
      PhoneNumber: 'Yo',
      Address: 'Yoo',
      Email: 'Yoooo',
    });
    assert.deepStrictEqual(item.id, null);
    await item.save();
    assert(item.id);

    item = await models.Housing.findByPk(item.id);
    assert.deepStrictEqual(item.Name, 'Test Title');
    assert.deepStrictEqual(item.Description, 'This is longer test Text.');
    assert.deepStrictEqual(item.PhoneNumber, 'Yo');
    assert.deepStrictEqual(item.Address, 'Yoo');
    assert.deepStrictEqual(item.Email, 'Yoooo');
  });

  it('returns all the Items', async () => {
    const results = await models.Housing.findAll();
    assert.deepStrictEqual(results.length, 2);
  });
});
