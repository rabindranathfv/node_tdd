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
            console.log('REQUEST POST BY SUPERTEST:::',req.body);
            console.log('REQUEST POST BY SUPERTEST:::',req.request.method);
            console.log('REQUEST POST BY SUPERTEST:::',req.status);
            expect(req.status).toBe(200);
            expect(req.body).toEqual({ ok: true, post: { userId: 5, id: 101 } });
        });
    })
});