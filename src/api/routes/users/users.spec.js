const controllers = require('./users');

describe(' Users Endpoints ', () => {
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
    describe('Users', () => {
        it('Should get all users', async () => {
            await controllers({ axios }).get({}, res);
            // check if the status of response is 200
            expect(res.status.mock.calls).toEqual([[200]]);
            // should receive response { ok: true, data: 1 }
            expect(res.json.mock.calls).toEqual([[{
                ok: true,
                data: 1
            }]]);
            // should call get function one time
            expect(res.json.mock.calls.length).toBe(1);
            // check if axios is call with those params
            expect(axios.get.mock.calls[res.json.mock.calls.length -1]).toEqual(['https://jsonplaceholder.typicode.com/users']);
        });

        it('Should post new user', async () => {
            const body = {
                body: 'request body'
            };
            await controllers({ axios }).post(body, res);
            // check if the status of response is 200
            expect(res.status.mock.calls).toEqual([[200]]);
            // should receive response { ok: true, data: 1 }
            expect(res.json.mock.calls).toEqual([[{ 
                ok: true,
                data: 1
            }]]);
            // should call get function one time
            expect(res.json.mock.calls.length).toBe(1);
            // check if axios is call with those params
            expect(axios.post.mock.calls[axios.post.mock.calls.length -1]).toEqual(['https://jsonplaceholder.typicode.com/users', 'request body']);
        });

        it('Should update userById', async () => {
            const body = {
                body: 'request body',
                params: {
                    id: 2
                }
            };
            await controllers({ axios }).put(body, res);
            // check if the status of response is 200
            expect(res.status.mock.calls).toEqual([[200]]);
            expect(res.json.mock.calls).toEqual([[{ 
                ok: true,
                id: 2
            }]]);
            // should call get function one time
            expect(res.json.mock.calls.length).toBe(1);
            // check if axios is call with those params
            expect(axios.put.mock.calls[axios.put.mock.calls.length -1]).toEqual([`https://jsonplaceholder.typicode.com/users/2`, `request body`]);
        });

        it('Should delete userById', async () => {
            const body = {
                params: {
                    id: 6
                }
            };
            await controllers({ axios }).delete(body, res);
            // check if the status of response is 200
            expect(res.status.mock.calls).toEqual([[200]]);
            expect(res.json.mock.calls).toEqual([[{
                ok: true,
                id: 6
            }]]);
            // should call get function one time
            expect(res.json.mock.calls.length).toBe(1);
            // check if axios is call with those params
            expect(axios.delete.mock.calls[axios.delete.mock.calls.length -1]).toEqual([`https://jsonplaceholder.typicode.com/users/6`]);
        });
    });
});