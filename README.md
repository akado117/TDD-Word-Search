# TDD Word Search Solver

Using TDD based upon Pillars approach, every class will be built step by step allowing tests to drive majority of functional architecture. Test file are denoted with .test.js and will be siblings to the classes they test. This makes it much simpler to import and maintain when changes are made. This is a remake of a previous attempt, with intent of focusing on applying what I've learned instead of learning new tools and architecture.

### Scripts and Running
Built using node version v8.9.4 and npm version 5.6.0
* `runDriverCommands` - Runs command line program. Follow onscreen prompt to enter file path and press enter. Then watch the magic!
* `npm install` - Installs needed dependencies for commands other than `runDriverCommands` to work 
* `test` - Runs any tests within any files that have .test in their name. Will continue to watch files for updates and will rerun any tests that would be impacted by these changes.
* `buildCMD` - Used to transpile main.js and its dependencies into a single npm package that can be consumed by a command line utility for node.
* `buildAndRun` - Runs both `buildCMD` then `runDriverCommands` in one simple script. Used when making code changes and running a final test.

### General Architecture
* NPM package with single index.js to expose to node command line
* TDD build process with jest unit testing framework
* Webpack transplier using babel
* EsLint plugin for real time linting support
* Exposed as an instantiated singleton

### WordSearch Outline
* getSearchData - Returns internal search data as a single object.
* setSearchData - Takes search data object, and sets internal search data.
* parseInputString - Takes wordSearchString from file or any source and parses into searchData
* splitInputIntoArraysByNewLineThenComma - Takes string and returns array of string arrays split by 'new line characters' then commas
* verifyStringArray - Takes gridArray and verifies it's square
* searchIfWordExistsAtPoint - Takes word, charGrid, and startingPoint then returns an array of any directions the word exists in, or false if not found
* buildCoord - Takes direction map, distance, and startingPoint and returns coord obj based upon superposition of distance on starting point
* checkIfCharMatch - Takes coord, char, charGrid, callback, direction and calls callBack with current direction on any failures
* checkAroundPoint - Takes charToCheck, searchData, startPoint, distance, failedDirections, and a callback then calls callBack on any direction it fails to find a character match at.
* onFailHelper - Takes failedDirectionsObj and direction and adds direction to failedDirectionsObj as prop and sets to true, also increments timesFailed within failedDirectionsObject
* returnSuccessfulDirections - Takes failedDirectionsObj and returns false if all directions failed or array of directions that didn't fail
* getCoordsForDirection - Takes wordLength, startPoint, and directionKey to return an array of coord arrays the same length as the word length
* buildWordCoords - Takes word, directionArray, and startPoint then returns wordCoordObj array for each direction
* findWordsAtLocation - Takes charGrid, startingPoint, and words then returns array of wordCoordObj for any found words
* findWordsInRow - Takes searchDataObject, currentRow and returns array of wordCoordObj for any words found
* buildOutputCoordString - Takes array of wordCoordObj and returns formatted string based upon them.
 