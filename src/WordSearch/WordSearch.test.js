import { WordSearch } from './WordSearch';

describe('WordSearch Class', () => {
    let wordSearch;
    beforeEach(() => {
       wordSearch = new WordSearch();
    });
    describe('constructor', () => {
        it('should initialize class variables to defaults', () => {
            expect(wordSearch.wordsToSearch).toEqual([]);
            expect(wordSearch.charGrid).toEqual([]);
            expect(wordSearch.height).toEqual(0);
            expect(wordSearch.width).toEqual(0);
        });
    });
});