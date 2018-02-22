import { WordSearch } from './WordSearch';

const mockSplitInputIntoArraysByNewLineThenComma = jest.fn();
const mockVerifyStringArray = jest.fn();
const mockGetWordSearchData = jest.fn();
const mockFindWordsInWordGrid = jest.fn();
const mockBuildOutputCoordString = jest.fn();

jest.mock('./wordSearch', () => {
    return jest.fn().mockImplementation(() => {
        return {
            splitInputIntoArraysByNewLineThenComma: mockSplitInputIntoArraysByNewLineThenComma,
            verifyStringArray: mockVerifyStringArray,
            getWordSearchData: mockGetWordSearchData,
            findWordsInWordGrid: mockFindWordsInWordGrid,
            buildOutputCoordString: mockBuildOutputCoordString,
        };
        // Now we can track calls to playSoundFile
    });
});

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
    describe('splitInputIntoArraysByNewLineThenComma', () => {
        it('should pass back false if there\'s less than 2 new lines', () => {
            expect(wordSearch.splitInputIntoArraysByNewLineThenComma('some body once told me')).toBe(false);
        });
        it('should pass back an array that is length of 1+ number of new lines', () => {
            expect(wordSearch.splitInputIntoArraysByNewLineThenComma('some\nbody\nonce\nblank').length).toBe(4);
        });
        it('should pass back an array that is length of 1+ number of new lines', () => {
            const returnedArray = wordSearch.splitInputIntoArraysByNewLineThenComma('some,body\nonce,blank\ntold,blank');
            expect(returnedArray[0].length).toBe(2);
            expect(returnedArray[1].length).toBe(2);
        });
    });
    describe('verifyStringArray', () => {
        it('should return false if any arrays in charGrid are different lengths', () => {
            const input = { charGrid: [['a', 'b'],['a', 'b'], ['a']]};
            expect(wordSearch.verifyStringArray(input)).toBe(false);
        });
        it('should return false if height is different than width', () => {
            const input = { charGrid: [['a', 'b'],['a', 'b'], ['a', 'b']]};
            expect(wordSearch.verifyStringArray(input)).toBe(false);
        });
    });
    describe('parseInputString', () => {
        it('should return false if splitInputIntoArraysByNewLineThenComma returns false', () => {
            mockSplitInputIntoArraysByNewLineThenComma.mockReturnValue(false);
            expect(wordSearch.parseInputString('any value')).toBe(false);
            expect(mockVerifyStringArray).not.toHaveBeenCalled();
        });
    });
});