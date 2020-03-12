const postsCtrl = require('./post');

describe(' Post Endpoints', () => {
    let axios;
    let res;
    beforeEach(async() => {
        axios = {
            //  defino el mock de la peticion del axios
            get: jest.fn().mockResolvedValue({ data: 1 }),
            post: jest.fn().mockResolvedValue({ data: 1 }),
            put: jest.fn().mockResolvedValue({ params: { id: 2 }, data: 2 }),
            delete: jest.fn()
        };
        res = {
            status: jest.fn().mockReturnThis(),
            send: jest.fn(),
            json: jest.fn().mockReturnThis()
        };
    });

    describe('Posts', () => {
        it('Should get all posts', async() => {
            await postsCtrl({ axios }).get({}, res);
            expect(res.status.mock.calls).toEqual([[200]]);
            expect(res.json.mock.calls).toEqual([[{
                ok: true,
                posts: 1
            }]]);
            expect(res.json.mock.calls.length).toBe(1);
            expect(axios.get.mock.calls[res.status.mock.calls.length - 1]).toEqual(['https://jsonplaceholder.typicode.com/posts']);
        });

        it('Should post new post', async() => {
            const body = {
                body: 'request body'
            };
            await postsCtrl({ axios}).post(body,res);
            expect(res.status.mock.calls).toEqual([[200]]);
            expect(res.json.mock.calls).toEqual([[{
                ok: true,
                posts: 1
            }]]);
            expect(res.json.mock.calls.length).toBe(1);
            expect(axios.post.mock.calls[axios.post.mock.calls.length - 1]).toEqual(['https://jsonplaceholder.typicode.com/posts', 'request body']);
        });

        it('Should update a postById', async() => {
            const body = {
                body: 'request body',
                params: {
                    id: 2
                }
            };
            await postsCtrl({ axios }).put(body, res);
            expect(res.status.mock.calls).toEqual([[200]]);
            expect(res.json.mock.calls).toEqual([[{
                ok: true,
                id: 2
            }]]);
            expect(res.json.mock.calls.length).toBe(1);
            expect(axios.put.mock.calls[axios.put.mock.calls.length - 1]).toEqual(['https://jsonplaceholder.typicode.com/posts/2', 'request body']);
        });

        it('Should delete a postById', async() => {
            const body = {
                body: 'request body',
                params: {
                    id: 2
                }
            };
            await postsCtrl({ axios }).delete(body, res);
            expect(res.status.mock.calls).toEqual([[200]]);
            expect(res.json.mock.calls).toEqual([[{
                ok: true,
                id: 2
            }]]);
            expect(res.json.mock.calls.length).toBe(1);
            expect(axios.delete.mock.calls[axios.delete.mock.calls.length - 1]).toEqual(['https://jsonplaceholder.typicode.com/posts/2']);
        });
    });
});