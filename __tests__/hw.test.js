import hw from '../hw';

describe('hw', () => {
    xit("hw default test", () => {
        expect(hw()).toBe("Hello World!")
    });

    it('hw "fynn" test', () => {
        expect(hw('Fynn')).toBe('Hello Fynn!')
    })
})