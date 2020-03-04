const controllers = require('./users');

describe('Endpoints ', () => {
    describe('Users', () => {
        it('Should get all users', async () => {
            const axios = {
                //  defino el mock de la peticion del axios
                get: jest.fn().mockResolvedValue({ data: 1})
            };
            const res = {
                status: jest.fn().mockReturnThis(),
                send: jest.fn(),
                json: jest.fn().mockReturnThis()
            }
            await controllers({ axios }).get({}, res)
            console.log(axios.get);
            console.log(res.status.mock);
            console.log(res.json.mock.calls);
            expect(res.json.mock.calls).toEqual([[{
                ok: true,
                data: 1
            }]]);
        });
    });
});