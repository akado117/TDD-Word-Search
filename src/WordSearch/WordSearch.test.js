import { WordSearch } from './WordSearch';

describe('WordSearch Class', () => {
    let wordSearch;
    const internalVariables = ['wordsToSearch', 'charGrid', 'height', 'width'];
    function setOrCheckInternalVariables(variables, valuesToSetOrCheck, isChecking, externalWordSearch) {
        variables.forEach((variable, idx) => {
            if (isChecking) {
                expect(externalWordSearch || wordSearch).toEqual(valuesToSetOrCheck[idx]);
            } else {
                (externalWordSearch || wordSearch)[variable] = valuesToSetOrCheck[idx];
            }
        });
    }
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
    describe('getSearchData', () => {
        it('should return internal variables as a searchData object', () => {
            wordSearch.height = 1337;
            wordSearch.width = 43;
            wordSearch.charGrid = 'These are not the chars';
            wordSearch.wordsToSearch = 'you are looking for!';

            const { height, width, charGrid, wordsToSearch } = wordSearch.getSearchData();

            expect(height).toEqual(1337);
            expect(width).toEqual(43);
            expect(charGrid).toEqual('These are not the chars');
            expect(wordsToSearch).toEqual('you are looking for!');

        });
    });
    describe('setSearchData', () => {
        it('should set internal variables to default if not contained within searchData object fed in', () => {
            wordSearch.height = 1337;
            wordSearch.width = 43;
            wordSearch.charGrid = 'These are not the chars';
            wordSearch.wordsToSearch = 'you are looking for!';

            wordSearch.setSearchData();

            expect(wordSearch.height).toEqual(0);
            expect(wordSearch.width).toEqual(0);
            expect(wordSearch.charGrid).toEqual([]);
            expect(wordSearch.wordsToSearch).toEqual([]);

        });
    });
});