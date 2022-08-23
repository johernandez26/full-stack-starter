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
      it('creates a new Category', async () => {
        const response = await testSession
          .post('/api/categories')
          .set('Accept', 'application/json')
          .send({
            id: 1,
            Name: 'This is a new Category Name.',
            IconBackImg: 'This is a new Category IconBackImg.',
            NavBackImg: 'This is a new Category NavBackImg.',
            Position: 1,
          })
          .expect(HttpStatus.CREATED);

        const { id, Name, IconBackImg, NavBackImg, Position } = response.body;
        assert(id);
        assert.deepStrictEqual(id, 1);
        assert.deepStrictEqual(Name, 'This is a new Category Name');
        assert.deepStrictEqual(IconBackImg, 'This is a new Category IconBackImg');
        assert.deepStrictEqual(NavBackImg, 'This is a new Category NavBackImg');
        assert.deepStrictEqual(Position, 1);

        const cat = await models.Category.findByPk(id);
        assert(cat);
        assert.deepStrictEqual(cat.id, 1);
        assert.deepStrictEqual(cat.Name, 'This is a new Category Name');
        assert.deepStrictEqual(cat.IconBackImg, 'This is a new Category IconBackImg');
        assert.deepStrictEqual(cat.NavBackImg, 'This is a new Category NavBackImg');
        assert.deepStrictEqual(cat.Position, 1);
      });
    });

    describe('PATCH /:id', () => {
      it('updates an existing Resource', async () => {
        const response = await testSession
          .patch('/api/resources/1')
          .set('Accept', 'application/json')
          .send({
            id: 1,
            Name: 'This is an updated Category Name.',
            IconBackImg: 'This is an updated Category IconBackImg.',
            NavBackImg: 'This is an updated Category NavBackImg.',
            Position: 1,
          })
          .expect(HttpStatus.OK);

        const { id, Name, IconBackImg, NavBackImg, Position } = response.body;
        assert.deepStrictEqual(id, 1);
        assert.deepStrictEqual(Name, 'This is an updated Category Name');
        assert.deepStrictEqual(IconBackImg, 'This is an updated Category IconBackImg');
        assert.deepStrictEqual(NavBackImg, 'This is an updated Category NavBackImg');
        assert.deepStrictEqual(Position, 1);

        const cat = await models.Resource.findByPk(id);
        assert(cat);
        assert.deepStrictEqual(cat.id, 1);
        assert.deepStrictEqual(cat.Name, 'This is an updated Category Name');
        assert.deepStrictEqual(cat.IconBackImg, 'This is an updated Category IconBackImg');
        assert.deepStrictEqual(cat.NavBackImg, 'This is an updated Category NavBackImg');
        assert.deepStrictEqual(cat.Position, 1);
      });
    });

    describe('DELETE /:id', () => {
      it('deletes an existing Category', async () => {
        await testSession.delete('/api/categories/1').expect(HttpStatus.OK);
        const cat = await models.Category.findByPk(1);
        assert.deepStrictEqual(cat, null);
      });
    });
  });
});
