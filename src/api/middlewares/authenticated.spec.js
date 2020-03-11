const authenticated = require('./authenticated');
describe('Should pass Authenticated middelware', () => {
    it('Should be a admin with id 1', () => {
        // se agregar mock return Value tomando el id 1 como el unico q puede hacer esta operacion
        const req = {
            header: jest.fn().mockReturnValue(1)
        };
        const res = {
            status: jest.fn(),
            json: jest.fn()
        };
        const next = jest.fn();
        authenticated(req, res, next);
        expect(req.header.mock.calls).toEqual([
           ['user_id'] 
        ]);
        expect(res.status.mock.calls).toEqual([]);
        expect(next.mock.calls).toEqual([[]]);
    });

    it('Should be any id different that admin ', () => {
        const req = {
            header: jest.fn().mockReturnValue(2)
        };
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };
        const next = jest.fn();
        authenticated(req, res, next);
        console.log('MOCK RES',res.status.mock.calls);
        console.log('MOCK RES',res.json.mock.calls);
        expect(req.header.mock.calls).toEqual([
           ['user_id'] 
        ]);
        expect(res.status.mock.calls).toEqual([
            [403]    
        ]);
        expect(res.json.mock.calls).toEqual([[{
            message: 'unnauthorized user',
            ok: false,
            "user": 2
        }]]);
        expect(next.mock.calls).toEqual([]);
    });
})