const assert = require('assert');
const HttpStatus = require('http-status-codes');
const _ = require('lodash');
const session = require('supertest-session');

const helper = require('../../helper');
const app = require('../../../app');
const models = require('../../../models');

describe('/api/housings', () => {
  let testSession;

  beforeEach(async () => {
    await helper.loadFixtures(['housings', 'users']);
    testSession = session(app);
  });

  describe('GET /', () => {
    it('returns a list of Housings', async () => {
      const response = await testSession.get('/api/housings').expect(HttpStatus.OK);
      const cat = response.body;
      assert.deepStrictEqual(res.length, 2);
    });
  });
  describe('GET /:id', () => {
    it('returns one Housing by id', async () => {
      const response = await testSession.get('/api/housings/1').expect(HttpStatus.OK);
      const cat = response.body;
      assert.deepStrictEqual(cat.Name, 'Fixture item 1');
      assert.deepStrictEqual(cat.Description, 'This is fixture item 1.');
      assert.deepStrictEqual(cat.PhoneNumber, 'This is fixture item 1.');
      assert.deepStrictEqual(cat.Address, 'This is fixture item 1.');
      assert.deepStrictEqual(cat.Email, 'This is fixture item 1.');
    });
    it('returns NOT FOUND for an id not in the database', async () => {
      await testSession.get('/api/housings/0').expect(HttpStatus.NOT_FOUND);
    });
  });

  context('authenticated', () => {
    beforeEach(async () => {
      await testSession
        .post('/api/auth/login')
        .set('Accept', 'application/json')
        .send({ email: 'admin.user@test.com', password: 'abcd1234' })
        .expect(HttpStatus.OK);
    });

    describe('POST /', () => {
      it('creates a new Housing', async () => {
        const response = await testSession
          .post('/api/housings')
          .set('Accept', 'application/json')
          .send({
            id: 1,
            Name: 'This is a new Housing Name.',
            Description: 'This is a new Housing Description.',
            PhoneNumber: 'This is a new Housing PhoneNumber.',
            Address: 'This is a new Housing Address.',
            Email: 'This is a new Housing Email.',
          })
          .expect(HttpStatus.CREATED);

        const { id, Name, IconBackImg, NavBackImg, Position } = response.body;
        assert(id);
        assert.deepStrictEqual(id, 1);
        assert.deepStrictEqual(Name, 'This is a new Housing Name');
        assert.deepStrictEqual(Description, 'This is a new Housing Description');
        assert.deepStrictEqual(PhoneNumber, 'This is a new Housing Phone Number');
        assert.deepStrictEqual(Address, 'This is a new Housing Address');
        assert.deepStrictEqual(Email, 'This is a new Housing Email');

        const cat = await models.Category.findByPk(id);
        assert(cat);
        assert.deepStrictEqual(cat.id, 1);
        assert.deepStrictEqual(Name, 'This is a new Housing Name');
        assert.deepStrictEqual(Description, 'This is a new Housing Description');
        assert.deepStrictEqual(PhoneNumber, 'This is a new Housing Phone Number');
        assert.deepStrictEqual(Address, 'This is a new Housing Address');
        assert.deepStrictEqual(Email, 'This is a new Housing Email');
      });
    });

    describe('PATCH /:id', () => {
      it('updates an existing Housing', async () => {
        const response = await testSession
          .patch('/api/housings/1')
          .set('Accept', 'application/json')
          .send({
            id: 1,
            Name: 'This is an updated Housing Name.',
            Description: 'This is an updated Housing Description',
            PhoneNumber: 'This is an updated Housing PhoneNumber.',
            Address: 'This is an updated Housing Address.',
            Email: 'This is an updated Housing Email.',
          })
          .expect(HttpStatus.OK);

        const { id, Name, IconBackImg, NavBackImg, Position } = response.body;
        assert.deepStrictEqual(id, 1);
        assert.deepStrictEqual(Name, 'This is an updated Housing Name');
        assert.deepStrictEqual(Description, 'This is an updated Housing Description');
        assert.deepStrictEqual(PhoneNumber, 'This is an updated Housing PhoneNumber');
        assert.deepStrictEqual(Address, 'This is an updated Housing Address');
        assert.deepStrictEqual(Email, 'This is an updated Housing Email');

        const cat = await models.Housing.findByPk(id);
        assert(cat);
        assert.deepStrictEqual(cat.id, 1);
        assert.deepStrictEqual(Name, 'This is an updated Housing Name');
        assert.deepStrictEqual(Description, 'This is an updated Housing Description');
        assert.deepStrictEqual(PhoneNumber, 'This is an updated Housing PhoneNumber');
        assert.deepStrictEqual(Address, 'This is an updated Housing Address');
        assert.deepStrictEqual(Email, 'This is an updated Housing Email');
      });
    });

    describe('DELETE /:id', () => {
      it('deletes an existing Housing', async () => {
        await testSession.delete('/api/housings/1').expect(HttpStatus.OK);
        const cat = await models.Housing.findByPk(1);
        assert.deepStrictEqual(cat, null);
      });
    });
  });
});
