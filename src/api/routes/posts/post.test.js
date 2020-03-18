const request = require('supertest');
const app = require('../../../server');

describe('BACKEND Test', () => {
    describe('Endpoints', () => {
        it('create new Posts', async () => {
            const req = await request(app)
                    .post('/posts')
                    .send({ userId: 5})
                    .set('user_id', 1)
                    .set('Content-type', 'application/json');
            console.log('REQUEST BY SUPERTEST:::',req);
            
        });
    })
});