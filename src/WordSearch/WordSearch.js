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

        const rowsWithDifferentWidths = searchDataObj.charGrid.map((row) => {
            if (row.length !== searchDataObj.width) return row;
        });
        if (rowsWithDifferentWidths.length) return false;
    }
}

export default new WordSearch();