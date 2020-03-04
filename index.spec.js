describe('Test jest', () => {
    describe('test sum function', ()=> {
        it('add two numbers', ()=> {
            const sum = (a,b) => {
                return a + b;
            }

            expect(sum(1,1)).toBe(2);
        });
    })
});