const directionalKeys = new Map([ // row, column - is up on row + is right on column
    ['UR', [-1, 1]],
    ['R', [0, 1]],
    ['DR', [1, 1]],
    ['D', [1, 0]],
    ['DL', [1, -1]],
    ['L', [0, -1]],
    ['UL', [-1, -1]],
    ['U', [-1, 0]],
]);
const numberOfDirections = directionalKeys.size;

export class WordSearch {
    constructor() {
        this.wordsToSearch = [];
        this.charGrid = [];
        this.height = 0;
        this.width = 0;
    }
    getSearchData() {
        const { wordsToSearch, charGrid, height, width } = this;
        return {
            wordsToSearch,
            charGrid,
            height,
            width,
        };
    }
    setSearchData(searchDataObject) {
        const { height, width, charGrid, wordsToSearch } = (searchDataObject || {});

        this.width = width || 0;
        this.height = height || 0;
        this.charGrid = charGrid || [];
        this.wordsToSearch = wordsToSearch || [];
    }
    splitInputIntoArraysByNewLineThenComma(inputString) {
        const splitByNewLine = inputString.split(/\r?\n/);
        if (splitByNewLine.length < 2) return false;
        return splitByNewLine.map(row => row.split(','));
    }
    verifyStringArray(searchDataObj) { //modifies input
        searchDataObj.height = searchDataObj.charGrid.length;
        searchDataObj.width = searchDataObj.charGrid[0].length;
        if (searchDataObj.width !== searchDataObj.height) return false;

        const rowsWithDifferentWidths = searchDataObj.charGrid.filter(row => row.length !== searchDataObj.width);
        if (rowsWithDifferentWidths.length) return false;

        return true;
    }
    parseInputString(inputString) {
        const splitInput = this.splitInputIntoArraysByNewLineThenComma(inputString);
        if (!splitInput) return false;

        const searchDataObj = {
            wordsToSearch: splitInput.shift(),
            charGrid: splitInput,
        };
        if (!this.verifyStringArray(searchDataObj)) return false;

        return searchDataObj;
    }
    buildCoord(directionArr, distance, startingPoint) {
        return [startingPoint[0] + (directionArr[0] * distance), startingPoint[1] + (directionArr[1] * distance)];
    }
    checkIfCharMatch(coord, char, charGrid, callback, direction) {
        const [rowPos, colPos] = coord;
        if (!charGrid[rowPos]) return callback(direction);
        if (!charGrid[rowPos][colPos]) return callback(direction);
        if (charGrid[rowPos][colPos] !== char) return callback(direction);
    }
    checkAroundPoint(charToCheck, charGrid, startPoint, distance, failedDirections, callback) {
        directionalKeys.forEach((value, direction) => {
            if (failedDirections[direction]) return false;
            const coordToCheck = this.buildCoord(value, distance, startPoint);
            this.checkIfCharMatch(coordToCheck, charToCheck, charGrid, callback, direction);
        });
    }
    searchIfWordExistsAtPoint(word, charGrid, startingPoint) {
        const [rowPos, colPos] = startingPoint;
        if (word[0] !== charGrid[rowPos][colPos]) return false;
    }
}

export default new WordSearch();