const assert = require('assert');
const HttpStatus = require('http-status-codes');
const _ = require('lodash');
const session = require('supertest-session');

const helper = require('../../helper');
const app = require('../../../app');
const models = require('../../../models');

describe('/api/legal', () => {
  let testSession;

  beforeEach(async () => {
    await helper.loadFixtures(['legals', 'users']);
    testSession = session(app);
  });

  describe('GET /', () => {
    it('returns a list of Legals', async () => {
      const response = await testSession.get('/api/legals').expect(HttpStatus.OK);
      const cat = response.body;
      assert.deepStrictEqual(res.length, 2);
    });
  });
  describe('GET /:id', () => {
    it('returns one Legal by id', async () => {
      const response = await testSession.get('/api/legals/1').expect(HttpStatus.OK);
      const cat = response.body;
      assert.deepStrictEqual(cat.Name, 'Fixture item 1');
      assert.deepStrictEqual(cat.Description, 'This is fixture item 1.');
      assert.deepStrictEqual(cat.PhoneNumber, 'This is fixture item 1.');
      assert.deepStrictEqual(cat.Address, 'This is fixture item 1.');
      assert.deepStrictEqual(cat.Email, 'This is fixture item 1.');
    });
    it('returns NOT FOUND for an id not in the database', async () => {
      await testSession.get('/api/legals/0').expect(HttpStatus.NOT_FOUND);
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
      it('creates a new Legal', async () => {
        const response = await testSession
          .post('/api/legals')
          .set('Accept', 'application/json')
          .send({
            id: 1,
            Name: 'This is a new Legal Name.',
            Description: 'This is a new Legal Description.',
            PhoneNumber: 'This is a new Legal PhoneNumber.',
            Address: 'This is a new Legal Address.',
            Email: 'This is a new Legal Email.',
          })
          .expect(HttpStatus.CREATED);

        const { id, Name, IconBackImg, NavBackImg, Position } = response.body;
        assert(id);
        assert.deepStrictEqual(id, 1);
        assert.deepStrictEqual(Name, 'This is a new Legal Name');
        assert.deepStrictEqual(Description, 'This is a new Legal Description');
        assert.deepStrictEqual(PhoneNumber, 'This is a new Legal Phone Number');
        assert.deepStrictEqual(Address, 'This is a new Legal Address');
        assert.deepStrictEqual(Email, 'This is a new Legal Email');

        const cat = await models.Category.findByPk(id);
        assert(cat);
        assert.deepStrictEqual(cat.id, 1);
        assert.deepStrictEqual(Name, 'This is a new Legal Name');
        assert.deepStrictEqual(Description, 'This is a new Legal Description');
        assert.deepStrictEqual(PhoneNumber, 'This is a new Legal Phone Number');
        assert.deepStrictEqual(Address, 'This is a new Legal Address');
        assert.deepStrictEqual(Email, 'This is a new Legal Email');
      });
    });

    describe('PATCH /:id', () => {
      it('updates an existing Legal', async () => {
        const response = await testSession
          .patch('/api/legals/1')
          .set('Accept', 'application/json')
          .send({
            id: 1,
            Name: 'This is an updated Lgeal Name.',
            Description: 'This is an updated Legal Description',
            PhoneNumber: 'This is an updated Legal PhoneNumber.',
            Address: 'This is an updated Legal Address.',
            Email: 'This is an updated Legal Email.',
          })
          .expect(HttpStatus.OK);

        const { id, Name, IconBackImg, NavBackImg, Position } = response.body;
        assert.deepStrictEqual(id, 1);
        assert.deepStrictEqual(Name, 'This is an updated Legal Name');
        assert.deepStrictEqual(Description, 'This is an updated Legal Description');
        assert.deepStrictEqual(PhoneNumber, 'This is an updated Legal PhoneNumber');
        assert.deepStrictEqual(Address, 'This is an updated Legal Address');
        assert.deepStrictEqual(Email, 'This is an updated Legal Email');

        const cat = await models.Legal.findByPk(id);
        assert(cat);
        assert.deepStrictEqual(cat.id, 1);
        assert.deepStrictEqual(Name, 'This is an updated Legal Name');
        assert.deepStrictEqual(Description, 'This is an updated Legal Description');
        assert.deepStrictEqual(PhoneNumber, 'This is an updated Legal PhoneNumber');
        assert.deepStrictEqual(Address, 'This is an updated Legal Address');
        assert.deepStrictEqual(Email, 'This is an updated Legal Email');
      });
    });

    describe('DELETE /:id', () => {
      it('deletes an existing Legal', async () => {
        await testSession.delete('/api/legals/1').expect(HttpStatus.OK);
        const cat = await models.Legal.findByPk(1);
        assert.deepStrictEqual(cat, null);
      });
    });
  });
});
