import { cloneDeep } from 'lodash';
import { WordSearch, DirectionalKeys } from './WordSearch';

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
        it('should add height and width to searchDataObj passed in if checks pass and return true', () => {
            const input = { charGrid: [['a', 'b'],['a', 'b']]};
            expect(wordSearch.verifyStringArray(input)).toBe(true);
            expect(input.height).toBe(2);
            expect(input.width).toBe(2);
        });
    });
    describe('parseInputString', () => {
        beforeEach(() => {
            wordSearch.splitInputIntoArraysByNewLineThenComma = jest.fn();
            wordSearch.verifyStringArray = jest.fn();
        });
        it('should return false if splitInputIntoArraysByNewLineThenComma returns false', () => {
            wordSearch.splitInputIntoArraysByNewLineThenComma.mockReturnValue(false);
            expect(wordSearch.parseInputString('any value')).toBe(false);
            expect(wordSearch.verifyStringArray).not.toHaveBeenCalled();
        });
        it('should return false if splitInputIntoArraysByNewLineThenComma returns value, but verifyStringArray returns false', () => {
            wordSearch.splitInputIntoArraysByNewLineThenComma.mockReturnValue([['any'], ['array', 'of', 'arrays']]);
            expect(wordSearch.parseInputString('any value')).toBe(false);
            expect(wordSearch.verifyStringArray).toHaveBeenCalledWith({
                wordsToSearch: ['any'],
                charGrid: [['array', 'of', 'arrays']],
            });
        });
        it('should return search data object if neither verifyStringArray or splitInput return falsy values', () => {
            wordSearch.splitInputIntoArraysByNewLineThenComma.mockReturnValue([['any'], ['array', 'of', 'arrays']]);
            wordSearch.verifyStringArray.mockReturnValue('back to the future');
            const searchDataObj = {
                wordsToSearch: ['any'],
                charGrid: [['array', 'of', 'arrays']],
            };

            expect(wordSearch.parseInputString('any value')).toEqual(searchDataObj);
            expect(wordSearch.splitInputIntoArraysByNewLineThenComma).toHaveBeenCalledWith('any value');
            expect(wordSearch.verifyStringArray).toHaveBeenCalledWith(searchDataObj);
        });
    });
    describe('buildCoord', () => {
        it('should return coord arr adjusted by distance and direction array', () => {
            expect(wordSearch.buildCoord([0, -1], 4, [5, 5])).toEqual([5, 1]);
        });
    });
    describe('checkIfCharMatch', () => {
        const charGrid = [['a', 'b'], ['c', 'd']];
        it('should call callback if row coord doesn\'t exist', () => {
            const callback = jest.fn();
            wordSearch.checkIfCharMatch([-1, 3], 'a', charGrid, callback, 'ul');
            expect(callback).toHaveBeenCalledWith('ul');
        });
        it('should call callback if col coord doesn\'t exist', () => {
            const callback = jest.fn();
            wordSearch.checkIfCharMatch([1, 3], 'a', charGrid, callback, 'ul');
            expect(callback).toHaveBeenCalledWith('ul');
        });
        it('should call callback if char at coord doesn\'t match', () => {
            const callback = jest.fn();
            wordSearch.checkIfCharMatch([1, 1], 'a', charGrid, callback, 'ul');
            expect(callback).toHaveBeenCalledWith('ul');
        });
        it('shouldn\'t call callback if char at coord matches', () => {
            const callback = jest.fn();
            wordSearch.checkIfCharMatch([1, 1], 'd', charGrid, callback, 'ul');
            expect(callback).not.toHaveBeenCalled();
        });
    });
    describe('checkAroundPoint', () => {
        beforeEach(() => {
            wordSearch.buildCoord = jest.fn();
            wordSearch.checkIfCharMatch = jest.fn();
        });
        it('should not call buildCoord if direction has already failed', () => {
            wordSearch.checkAroundPoint('A', 'charGrid', [0, 2], 2, { UL: true, DR: true }, () => {});
            expect(wordSearch.buildCoord).toHaveBeenCalledTimes(6);
        });
        it('should call checkIfCharMatch for each direction that hasn\'t failed and be called with results from buildCoord', () => {
            wordSearch.buildCoord.mockReturnValue([-1, 3]);
            function cb() {};
            wordSearch.checkAroundPoint('A', 'charGrid', [0, 2], 2, { UL: true, DR: true }, cb);
            expect(wordSearch.checkIfCharMatch).toHaveBeenCalledTimes(6);
            expect(wordSearch.checkIfCharMatch.mock.calls[0][0]).toEqual([-1, 3]);
            expect(wordSearch.checkIfCharMatch.mock.calls[0][1]).toBe('A');
            expect(wordSearch.checkIfCharMatch.mock.calls[0][2]).toBe('charGrid');
            expect(wordSearch.checkIfCharMatch.mock.calls[0][3]).toBe(cb);
            expect(wordSearch.checkIfCharMatch.mock.calls[0][4]).toBe('UR');//first direction in DirectionalKeys Map
        });
    });
    describe('onFailHelper', () => {
        it('should added direction to failedDirections var and increment timesFailed by one', () => {
            const failedDirections = {
                timesFailed: 0,
            };
            wordSearch.onFailHelper(failedDirections, 'ul');
            expect(failedDirections.ul).toBe(true);
            expect(failedDirections.timesFailed).toBe(1);
        });
    });
    describe('returnSuccessfulDirections', () => {
        const failedDirectionsObj = {
            UR: true,
            R: true,
            DR: true,
            D: true,
            DL: true,
            L: true,
            UL: true,
            U: true,
            timesFailed: 0,
        };
        it('should return false if no successful directions', () => {
            expect(wordSearch.returnSuccessfulDirections(failedDirectionsObj)).toBe(false);
        });
        it('should return false if no successful directions', () => {
            const failedDirectionsClone = cloneDeep(failedDirectionsObj);
            delete failedDirectionsClone.UR;
            delete failedDirectionsClone.R;
            expect(wordSearch.returnSuccessfulDirections(failedDirectionsClone)).toEqual(['UR', 'R']);
        });
    });
    describe('searchIfWordExistsAtPoint', () => {
        const charGrid = [['a', 'b'], ['c', 'd']];
        beforeEach(() => {
            wordSearch.checkAroundPoint = jest.fn();
            wordSearch.returnSuccessfulDirections = jest.fn();
        });
        it('should not call checkAroundPoint if first char doesn\'t match startingPoint ', () => {
            expect(wordSearch.searchIfWordExistsAtPoint('lol', charGrid, [1,1])).toBe(false);
            expect(wordSearch.checkAroundPoint).not.toHaveBeenCalled();
        });
        it('should call checkAroundPoint for each char in word after first', () => {
            wordSearch.searchIfWordExistsAtPoint('bab', charGrid, [0,1]);
            expect(wordSearch.checkAroundPoint).toHaveBeenCalledTimes(2);
        });
        it('should call checkAroundPoint until all directions have failed', () => {
            function fakeCheck(word, charGrid, startingPoint, i, {}, cb) {//this relies on onFailHelpers implementation
                for (let i = 0; i < 8; i++) {
                    cb('winning');
                }
            }
            wordSearch.checkAroundPoint = jest.fn(fakeCheck);
            wordSearch.searchIfWordExistsAtPoint('bab', charGrid, [0,1]);
            expect(wordSearch.checkAroundPoint).toHaveBeenCalledTimes(1);
        });
        it('should call returnSuccessfulDirections with failedDirectionsObj if not all directions fail', () => {
            function onFail(failedDirectionsObj) {
                failedDirectionsObj.UR = true;
                failedDirectionsObj.R = true;
                failedDirectionsObj.DR = true;
                failedDirectionsObj.D = true;
            }
            wordSearch.checkAroundPoint = jest.fn((word, charGrid, startingPoint, i, {}, cb) => cb());
            wordSearch.onFailHelper = jest.fn(onFail);
            wordSearch.returnSuccessfulDirections.mockReturnValue('to late batman');

            expect(wordSearch.searchIfWordExistsAtPoint('bab', charGrid, [0,1])).toEqual('to late batman');
            expect(wordSearch.returnSuccessfulDirections).toHaveBeenCalledWith({
                UR: true,
                R: true,
                DR: true,
                D: true,
                timesFailed: 0,
            });
        });
    });
    describe('getCoordsForDirection', () => {
        it('should return array of coordinates of same length as word', () => {
           expect(wordSearch.getCoordsForDirection(5, [0, 0], [1,1]).length).toBe(5);
        });
        it('should call buildCoord one less times than wordLength and what\'s returned added to coord array', () => {
            wordSearch.buildCoord = jest.fn().mockReturnValue([1, 1]);
            expect(wordSearch.getCoordsForDirection(2, [0, 0], [1,1])).toEqual([[0, 0], [1, 1]]);
            expect(wordSearch.buildCoord).toHaveBeenCalledTimes(1);
        });
    });
    describe('buildWordCoords', () => {
        it('should return same number of wordCoordObjects as directions in direction array', () => {
            expect(wordSearch.buildWordCoords('living', ['the', 'dream'], [0, 0]).length).toBe(2);
        });
        it('should call getCoordsForWords for each direction and use whats returned within wordCoordObj returned', () => {
            wordSearch.getCoordsForDirection = jest.fn().mockReturnValue('IMA ARRAY OF ARRAYS');
            const solution = {
                word: 'lep',
                coords: 'IMA ARRAY OF ARRAYS',
            };
            expect(wordSearch.buildWordCoords('lep', ['UL', 'DR'], [0, 0])).toEqual([solution, solution]);
            expect(wordSearch.getCoordsForDirection.mock.calls[0][0]).toBe('lep');
            expect(wordSearch.getCoordsForDirection.mock.calls[0][1]).toEqual([0, 0]);
            expect(wordSearch.getCoordsForDirection.mock.calls[0][2]).toBe(DirectionalKeys.get('UL'));
            expect(wordSearch.getCoordsForDirection.mock.calls[1][2]).toBe(DirectionalKeys.get('DR'));
        });
    });
});