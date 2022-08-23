const assert = require('assert');
const HttpStatus = require('http-status-codes');
const _ = require('lodash');
const session = require('supertest-session');

const helper = require('../../helper');
const app = require('../../../app');
const models = require('../../../models');

describe('/api/foods', () => {
  let testSession;

  beforeEach(async () => {
    await helper.loadFixtures(['foods', 'users']);
    testSession = session(app);
  });

  describe('GET /', () => {
    it('returns a list of Foods', async () => {
      const response = await testSession.get('/api/foods').expect(HttpStatus.OK);
      const cat = response.body;
      assert.deepStrictEqual(res.length, 2);
    });
  });
  describe('GET /:id', () => {
    it('returns one Food by id', async () => {
      const response = await testSession.get('/api/foods/1').expect(HttpStatus.OK);
      const cat = response.body;
      assert.deepStrictEqual(cat.Name, 'Fixture item 1');
      assert.deepStrictEqual(cat.Description, 'This is fixture item 1.');
      assert.deepStrictEqual(cat.PhoneNumber, 'This is fixture item 1.');
      assert.deepStrictEqual(cat.Address, 'This is fixture item 1.');
      assert.deepStrictEqual(cat.Email, 'This is fixture item 1.');
    });
    it('returns NOT FOUND for an id not in the database', async () => {
      await testSession.get('/api/foods/0').expect(HttpStatus.NOT_FOUND);
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
      it('creates a new Food', async () => {
        const response = await testSession
          .post('/api/foods')
          .set('Accept', 'application/json')
          .send({
            id: 1,
            Name: 'This is a new Food Name.',
            Description: 'This is a new Food Description.',
            PhoneNumber: 'This is a new Food PhoneNumber.',
            Address: 'This is a new Food Address.',
            Email: 'This is a new Food Email.',
          })
          .expect(HttpStatus.CREATED);

        const { id, Name, IconBackImg, NavBackImg, Position } = response.body;
        assert(id);
        assert.deepStrictEqual(id, 1);
        assert.deepStrictEqual(Name, 'This is a new Food Name');
        assert.deepStrictEqual(Description, 'This is a new Food Description');
        assert.deepStrictEqual(PhoneNumber, 'This is a new Food Phone Number');
        assert.deepStrictEqual(Address, 'This is a new Food Address');
        assert.deepStrictEqual(Email, 'This is a new Food Email');

        const cat = await models.Category.findByPk(id);
        assert(cat);
        assert.deepStrictEqual(cat.id, 1);
        assert.deepStrictEqual(Name, 'This is a new Food Name');
        assert.deepStrictEqual(Description, 'This is a new Food Description');
        assert.deepStrictEqual(PhoneNumber, 'This is a new Food Phone Number');
        assert.deepStrictEqual(Address, 'This is a new Food Address');
        assert.deepStrictEqual(Email, 'This is a new Food Email');
      });
    });

    describe('PATCH /:id', () => {
      it('updates an existing Food', async () => {
        const response = await testSession
          .patch('/api/foods/1')
          .set('Accept', 'application/json')
          .send({
            id: 1,
            Name: 'This is an updated Food Name.',
            Description: 'This is an updated Food Description',
            PhoneNumber: 'This is an updated Food PhoneNumber.',
            Address: 'This is an updated Food Address.',
            Email: 'This is an updated Food Email.',
          })
          .expect(HttpStatus.OK);

        const { id, Name, IconBackImg, NavBackImg, Position } = response.body;
        assert.deepStrictEqual(id, 1);
        assert.deepStrictEqual(Name, 'This is an updated Food Name');
        assert.deepStrictEqual(Description, 'This is an updated Food Description');
        assert.deepStrictEqual(PhoneNumber, 'This is an updated Food PhoneNumber');
        assert.deepStrictEqual(Address, 'This is an updated Food Address');
        assert.deepStrictEqual(Email, 'This is an updated Food Email');

        const cat = await models.Food.findByPk(id);
        assert(cat);
        assert.deepStrictEqual(cat.id, 1);
        assert.deepStrictEqual(Name, 'This is an updated Food Name');
        assert.deepStrictEqual(Description, 'This is an updated Food Description');
        assert.deepStrictEqual(PhoneNumber, 'This is an updated Food PhoneNumber');
        assert.deepStrictEqual(Address, 'This is an updated Food Address');
        assert.deepStrictEqual(Email, 'This is an updated Food Email');
      });
    });

    describe('DELETE /:id', () => {
      it('deletes an existing Food', async () => {
        await testSession.delete('/api/foods/1').expect(HttpStatus.OK);
        const cat = await models.Food.findByPk(1);
        assert.deepStrictEqual(cat, null);
      });
    });
  });
});
