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
        }
    }
}

export default new WordSearch();