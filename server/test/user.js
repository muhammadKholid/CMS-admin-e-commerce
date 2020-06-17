const app = require('../app');
const request = require('supertest');

function user() {
  describe('user testing', () => {
    describe('POST /register', () => {
      it('should send  new user with status code 201', async (done) => {
        let { body, status } = await request(app).post('/register').send({
          name: 'admin',
          email: 'admin@admin.com',
          password: 'adminku',
          role: 'admin',
        });
        expect(status).toBe(201);
        expect(body).toHaveProperty('message', body.message);
        expect(body).toHaveProperty('data', body.data);
        done();
      });

      it('should send  error with status code 400', async (done) => {
        let { body, status } = await request(app).post('/register').send({
          name: 'admin',
          email: 'admin@admin.com',
          password: 'adminku',
          role: 'admin',
        });
        expect(status).toBe(400);
        expect(body).toHaveProperty('message', body.message);
        done();
      });

      it('should send error message object with status code 400', async (done) => {
        let { body, status } = await request(app).post('/register').send({
          name: '',
          email: 'admin@admin.com',
          password: 'adminku',
          role: 'admin',
        });
        expect(status).toBe(400);
        expect(body).toHaveProperty('message');
        done();
      });

      it('should send error message object with status code 400', async (done) => {
        let { body, status } = await request(app).post('/register').send({
          name: 'admin',
          email: '',
          password: 'adminku',
          role: 'admin',
        });
        expect(status).toBe(400);
        expect(body).toHaveProperty('message', 'Validation isEmail on email failed');
        done();
      });

      it('should send error message object with status code 400', async (done) => {
        let { body, status } = await request(app).post('/register').send({
          name: 'admin',
          email: 'admin@admin.com',
          password: null,
          role: 'admin',
        });
        expect(status).toBe(404);
        expect(body).toHaveProperty('message', 'data and salt arguments required');
        done();
      });

      it('should send error message object with status code 400', async (done) => {
        let { body, status } = await request(app).post('/register').send({
          name: 'admin',
          email: 'admin@admin.com',
          password: 'adminku',
          role: null,
        });
        expect(status).toBe(400);
        expect(body).toHaveProperty('message', 'User.role cannot be null');
        done();
      });
    });

    describe('POST /login', () => {
      it('should send a user object with status code 200', async (done) => {
        let { body, status } = await request(app).post('/login').send({
          email: 'admin@admin.com',
          password: 'adminku',
        });
        expect(status).toBe(200);
        expect(body).toHaveProperty('message');
        expect(body).toHaveProperty('token');
        global.token = body.token;
        done();
      });

      it('should send error message object with status code 403', async (done) => {
        let { body, status } = await request(app).post('/login').send({
          email: 'admin@admin.com',
          password: 'adnk',
        });
        expect(status).toBe(403);
        expect(body).toHaveProperty('message');
        done();
      });

      it('should send error message object with status code 404', async (done) => {
        let { body, status } = await request(app).post('/login').send({
          email: 'adm@admin.com',
          password: 'adminku',
        });
        expect(status).toBe(404);
        expect(body).toHaveProperty('message');
        done();
      });

      it('should send error message object with status code 404', async (done) => {
        let { body, status } = await request(app).post('/login').send({
          email: '',
          password: 'adminku',
        });
        expect(status).toBe(404);
        expect(body).toHaveProperty('message');
        done();
      });

      it('should send error message object with status code 403', async (done) => {
        let { body, status } = await request(app).post('/login').send({
          email: 'admin@admin.com',
          password: '',
        });
        expect(status).toBe(403);
        console.log(body);
        expect(body).toHaveProperty('message');
        done();
      });
    });
  });
}

module.exports = user;
