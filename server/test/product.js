const app = require('../app');
const request = require('supertest');
const { sequelize } = require('../models');
const { queryInterface } = sequelize;

let wrongToken =
  'yJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJmb29iYXJAZW1haWwuY29tIiwiaWF0IjoxNTgzODIzMjM5fQ.vL5RfRUdXW1ADJYkrSHSYbxyhvAOC613zN0PTSeXNa8';
let id;

function product() {
  describe('product testing', () => {
    describe('POST/ addProdcut', () => {
      it('should send new data object with status code 201', async (done) => {
        let { body, status } = await request(app)
          .post('/products')
          .send({
            name: 'Xiaomi',
            image_url: 'blablabla',
            price: 1500000,
            stock: 15,
          })
          .set('token', global.token);
        expect(status).toBe(201);
        expect(body).toHaveProperty('message', body.message);
        expect(body).toHaveProperty('data', body.data);
        done();
      });

      it('should send error with status code 400', async (done) => {
        let { body, status } = await request(app)
          .post('/products')
          .send({
            name: '',
            image_url: 'blablabla',
            price: 1500000,
            stock: 15,
          })
          .set('token', global.token);
        expect(status).toBe(400);
        expect(body).toHaveProperty('message');
        done();
      });

      it('should send error with status code 400', async (done) => {
        let { body, status } = await request(app)
          .post('/products')
          .send({
            name: 'xiaomi',
            image_url: 'blablabla',
            price: -1500000,
            stock: 15,
          })
          .set('token', global.token);
        expect(status).toBe(400);
        expect(body).toHaveProperty('message');
        done();
      });

      it('should send error with status code 404', async (done) => {
        let { body, status } = await request(app)
          .post('/products')
          .send({
            name: 'xiaomi',
            image_url: 'blablabla',
            price: 1500000,
            stock: 15,
          })
          .set('token', wrongToken);
        expect(status).toBe(404);
        expect(body).toHaveProperty('message');
        done();
      });

      it('should send error with status code 400', async (done) => {
        let { body, status } = await request(app)
          .post('/products')
          .send({
            name: 'xiaomi',
            image_url: 'blablabla',
            price: 1500000,
            stock: -15,
          })
          .set('token', global.token);
        expect(status).toBe(400);
        expect(body).toHaveProperty('message');
        done();
      });
    });

    describe('GET/ all data', () => {
      it('should be return with error and 404 status', async (done) => {
        let { body, status } = await request(app).get(`/products`).set('token', wrongToken);
        expect(status).toBe(404);
        expect(body).toHaveProperty('message');
        done();
      });
    });

    describe('PUT/ edit', () => {
      it('should be return with edited data and 201 status', async (done) => {
        let { body, status } = await request(app)
          .put(`/products/1`)
          .send({
            name: 'Galaxy S10',
            image_url: 'galaxy samsung',
            price: 5000000,
            stock: 7,
          })
          .set('token', global.token);
        expect(status).toBe(201);
        expect(body).toHaveProperty('message');
        expect(body).toHaveProperty('data');
        done();
      });

      it('should be return with error and 404 status', async (done) => {
        let { body, status } = await request(app)
          .put(`/products/`)
          .send({
            name: 'Galaxy S10',
            image_url: 'galaxy samsung',
            price: 5000000,
            stock: 7,
          })
          .set('token', global.token);
        expect(status).toBe(404);
        done();
      });
      it('should be return with error and 404 status', async (done) => {
        let { body, status } = await request(app)
          .put(`/products/1`)
          .send({
            name: 'Galaxy S10',
            image_url: 'galaxy samsung',
            price: 5000000,
            stock: 7,
          })
          .set('token', wrongToken);
        expect(status).toBe(404);
        expect(body).toHaveProperty('message');
        done();
      });
      it('should be return with error and 400 status', async (done) => {
        let { body, status } = await request(app)
          .put(`/products/1`)
          .send({
            name: '',
            image_url: 'galaxy samsung',
            price: 5000000,
            stock: 7,
          })
          .set('token', global.token);
        expect(status).toBe(400);
        expect(body).toHaveProperty('message');
        done();
      });
      it('should be return with error and 400 status', async (done) => {
        let { body, status } = await request(app)
          .put(`/products/1`)
          .send({
            name: 'Galaxy S10',
            image_url: 'galaxy samsung',
            price: -5000000,
            stock: 7,
          })
          .set('token', global.token);
        expect(status).toBe(400);
        expect(body).toHaveProperty('message');
        done();
      });
      it('should be return with error and 400 status', async (done) => {
        let { body, status } = await request(app)
          .put(`/products/1`)
          .send({
            name: 'Galaxy S10',
            image_url: 'galaxy samsung',
            price: 5000000,
            stock: -7,
          })
          .set('token', global.token);
        expect(status).toBe(400);
        expect(body).toHaveProperty('message');
        done();
      });

      describe('DELETE/ one data', () => {
        it('should be return with data and 200 status', async (done) => {
          let { body, status } = await request(app)
            .delete(`/products/1`)
            .set('token', global.token);
          expect(status).toBe(200);
          expect(body).toHaveProperty('message');
          done();
        });
        it('should be return with error and 404 status', async (done) => {
          let { body, status } = await request(app).delete(`/products/1`).set('token', wrongToken);
          expect(status).toBe(404);
          expect(body).toHaveProperty('message');
          done();
        });
      });
    });
  });
}

module.exports = product;
