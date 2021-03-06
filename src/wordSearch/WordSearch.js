export const DirectionalKeys = new Map([ // row, column - is up on row + is right on column
    ['UR', [-1, 1]],
    ['R', [0, 1]],
    ['DR', [1, 1]],
    ['D', [1, 0]],
    ['DL', [1, -1]],
    ['L', [0, -1]],
    ['UL', [-1, -1]],
    ['U', [-1, 0]],
]);
const numberOfDirections = DirectionalKeys.size;

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
        DirectionalKeys.forEach((value, direction) => {
            if (failedDirections[direction]) return false;
            const coordToCheck = this.buildCoord(value, distance, startPoint);
            this.checkIfCharMatch(coordToCheck, charToCheck, charGrid, callback, direction);
        });
    }
    onFailHelper(failedDirectionsObj, direction) {
        failedDirectionsObj[direction] = true;
        failedDirectionsObj.timesFailed++;
    }
    returnSuccessfulDirections(failedDirectionsObj) {
        const directionsToReturn = [];
        DirectionalKeys.forEach((value, direction) => {
            if (failedDirectionsObj[direction] !== true) directionsToReturn.push(direction);
        });
        return directionsToReturn.length ? directionsToReturn : false;
    }
    searchIfWordExistsAtPoint(word, charGrid, startingPoint) {
        const [rowPos, colPos] = startingPoint;
        if (word[0] !== charGrid[rowPos][colPos]) return false;
        const failedDirections = { timesFailed: 0 };
        for (let i = 1; i < word.length; i++) {
            if (failedDirections.timesFailed === numberOfDirections) return false;
            this.checkAroundPoint(word[i], charGrid, startingPoint, i, {}, direction => this.onFailHelper(failedDirections, direction));
        }

        return this.returnSuccessfulDirections(failedDirections);
    }
    getCoordsForDirection(wordLength, startPoint, directionKey) {
        const coords = [startPoint];
        for (let i = 1; i < wordLength; i++) {
            coords.push(this.buildCoord(directionKey, i, startPoint));
        }
        return coords;
    }
    buildWordCoords(word, directionArray, startPoint) {
        return directionArray.map(direction => ({
            word,
            coords: this.getCoordsForDirection(word.length, startPoint, DirectionalKeys.get(direction)),
        }));
    }
    findWordsAtLocation(wordArr, charGrid, startPoint) {
        let wordCoordArray = [];
        wordArr.forEach((word) => {
            const directionArray = this.searchIfWordExistsAtPoint(word, charGrid, startPoint);
            if (!directionArray) return;
            wordCoordArray = wordCoordArray.concat(this.buildWordCoords(word, directionArray, startPoint));
        });
        return wordCoordArray.length ? wordCoordArray : false;
    }
    findWordsInRow(searchData, currentRow) {
        const { wordsToSearch, charGrid } = searchData;
        let wordCoordObjects = [];
        charGrid[currentRow].forEach((charInRow, currentColumn) => {
            const wordCordObjectArray = this.findWordsAtLocation(wordsToSearch, charGrid, [currentRow, currentColumn]);
            if (!wordCordObjectArray) return;
            wordCoordObjects = wordCoordObjects.concat(wordCordObjectArray);
        });
        return !!wordCoordObjects.length && wordCoordObjects;
    }
    findWordsInCharGrid(searchData) {
        const { charGrid } = searchData;
        let wordCoordArray = [];
        charGrid.forEach((row, currentRow) => {
            const rowWordCoordArr = this.findWordsInRow(searchData, currentRow);
            if (!rowWordCoordArr) return;
            wordCoordArray = wordCoordArray.concat(rowWordCoordArr);
        });
        return !!wordCoordArray.length && wordCoordArray;
    }
    buildCoordString(coordArray) {
        let stringToReturn = '';
        coordArray.forEach((coord, idx) => {
            stringToReturn += `(${coord[0]},${coord[1]})${idx < coordArray.length - 1 ? ',' : ''}`;
        });
        return stringToReturn;
    }
    buildOutputCoordString(wordCoordArray) {
        if (!wordCoordArray || !wordCoordArray.length) return 'No words were found';
        let outputString = '';
        wordCoordArray.forEach((wordCoord, idx) => {
            outputString += `${wordCoord.word}: ${this.buildCoordString(wordCoord.coords)}${idx < wordCoordArray.length - 1 ? '\n' : ''}`;
        });

        return outputString;
    }
    main(inputString) {
        const searchData = this.parseInputString(inputString);
        if (!searchData) return 'Failed to parse input: please make sure input is formatted as follows:\ncomma,separated,words\ng,r\ni,d';
        const wordCoordArray = this.findWordsInCharGrid(searchData);
        if (!wordCoordArray) return 'Failed to find words';
        return this.buildOutputCoordString(wordCoordArray);
    }
}

export default new WordSearch();