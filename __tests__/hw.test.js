import hw from '../hw';

describe('hw', () => {
    it("hw default test", () => {
        expect(hw()).toBe("Hello World!")
    });

    it('hw "fynn" test', () => {
        expect(hw('Fynn')).toBe('Hello Fynn!')
    })
})