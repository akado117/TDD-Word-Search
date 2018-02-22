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
}

export default new WordSearch();