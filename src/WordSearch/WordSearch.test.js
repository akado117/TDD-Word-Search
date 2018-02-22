import { WordSearch } from './WordSearch';

const CHECK = 'Check';
const SET = 'SET';

describe('WordSearch Class', () => {
    let wordSearch;
    const internalVariables = ['height', 'width', 'charGrid', 'wordsToSearch'];
    function setOrCheckInternalVariables(variables, valuesToSetOrCheck, isChecking, externalWordSearch) {
        variables.forEach((variable, idx) => {
            if (isChecking === CHECK) {
                expect((externalWordSearch || wordSearch)[variable]).toEqual(valuesToSetOrCheck[idx]);
            } else if (isChecking === SET) {
                (externalWordSearch || wordSearch)[variable] = valuesToSetOrCheck[idx];
            }
        });
    }
    beforeEach(() => {
        wordSearch = new WordSearch();
    });
    describe('constructor', () => {
        it('should initialize class variables to defaults', () => {
            const internalVariablesToCheck = [0, 0, [], []];
            setOrCheckInternalVariables(internalVariables, internalVariablesToCheck, CHECK);
        });
    });
    describe('getSearchData', () => {
        it('should return internal variables as a searchData object', () => {
            const internalVariablesToSet = [1337, 43, 'These are not the chars', 'you are looking for!'];
            setOrCheckInternalVariables(internalVariables, internalVariablesToSet, SET);

            const { height, width, charGrid, wordsToSearch } = wordSearch.getSearchData();

            expect(height).toEqual(1337);
            expect(width).toEqual(43);
            expect(charGrid).toEqual('These are not the chars');
            expect(wordsToSearch).toEqual('you are looking for!');

        });
    });
    describe('setSearchData', () => {
        it('should set internal variables to default if not contained within searchData object fed in', () => {
            const internalVariablesToSet = [1337, 43, 'These are not the chars', 'you are looking for!'];
            const internalVariablesToCheck = [0, 0, [], []];
            setOrCheckInternalVariables(internalVariables, internalVariablesToSet, SET);

            wordSearch.setSearchData();

            setOrCheckInternalVariables(internalVariables, internalVariablesToCheck, CHECK);
        });
        it('should set internal variables to default if not contained within searchData object fed in', () => {
            const internalVariablesToCheck = [1337, 43, 'These are not the chars', 'you are looking for!'];
            const searchDataObj = {};
            internalVariablesToCheck.forEach((value, idx) => {
                searchDataObj[internalVariables[idx]] = value;
            });
            wordSearch.setSearchData(searchDataObj);

            setOrCheckInternalVariables(internalVariables, internalVariablesToCheck, CHECK);
        });
    });
});