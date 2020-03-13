const postsCtrl = require('./post');

describe(' Post Endpoints', () => {
    let axios;
    let res;
    let post;
    let mockUsers;
    beforeEach(async() => {
        mockUsers = [
            {
              "id": 1,
            },
            {
              "id": 2,
            },
            {
              "id": 3,
            }
        ];  
        post = {
            userId: 1,
            id: 101,
            title: "titulo",
            body: "body post"
        }
        axios = {
            //  defino el mock de la peticion del axios
            get: jest.fn().mockResolvedValue({ data: mockUsers }),
            post: jest.fn().mockResolvedValue({ data: post }),
            put: jest.fn().mockResolvedValue({ params: { id: 2 }, data: post }),
            delete: jest.fn()
        };
        res = {
            status: jest.fn().mockReturnThis(),
            send: jest.fn(),
            json: jest.fn().mockReturnThis()
        };
        req = {
            body: post
        };
    });

    describe('Posts', () => {
        it('Should get all posts', async() => {
            await postsCtrl({ axios }).get({} , res);
            expect(res.status.mock.calls).toEqual([[200]]);
            expect(res.json.mock.calls).toEqual([[{
                ok: true,
                posts: mockUsers
            }]]);
            expect(res.json.mock.calls.length).toBe(1);
            expect(axios.get.mock.calls[res.status.mock.calls.length - 1]).toEqual(['https://jsonplaceholder.typicode.com/posts']);
        });

        it('Should post new post', async() => {
            await postsCtrl({ axios}).post(req , res);
            expect(res.status.mock.calls).toEqual([[200]]);
            expect(res.json.mock.calls).toEqual([[{
                ok: true,
                post: post
            }]]);
            expect(res.json.mock.calls.length).toBe(1);
            expect(axios.post.mock.calls[axios.post.mock.calls.length - 1]).toEqual(['https://jsonplaceholder.typicode.com/posts', post]);
        });

        it('Should can not create post if not is admin ', async() => {
            req.body.userId = 11;
            await postsCtrl({ axios}).post(req , res);
            const isAdmin = mockUsers.find( u => u.id === req.body.userId);
            expect(postsCtrl.isAdmin).toBeFalsy();
            expect(res.status.mock.calls).toEqual([[500]]);
            expect(res.json.mock.calls).toEqual([[{
                ok: false,
                message: 'not is admin'
            }]]);
            expect(res.json.mock.calls.length).toBe(1);

        });

        it('Should update a postById', async() => {
            req['params'] = {
                id: 2
            };
            await postsCtrl({ axios }).put(req, res);
            expect(res.status.mock.calls).toEqual([[200]]);
            expect(res.json.mock.calls).toEqual([[{
                ok: true,
                post: post
            }]]);
            expect(res.json.mock.calls.length).toBe(1);
            expect(axios.put.mock.calls[axios.put.mock.calls.length - 1]).toEqual(['https://jsonplaceholder.typicode.com/posts/2', post ]);
        });

        it('Should delete a postById', async() => {
            const reqDelete = {
                req,
                params: {
                    id: 2
                }
            };
            await postsCtrl({ axios }).delete(reqDelete, res);
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