const program = require('commander');
const { prompt } = require('inquirer');
const fs = require('fs');
const WordSearch = require('./cmd/main').default;

const questions = [
    {
        type : 'input',
        name : 'fileName',
        message : 'Please enter relative path to your search file and press enter (example "./test.txt")'
    }
];

program
    .version('0.0.43')
    .description('Word Search Solver');

program
    .command('searchForWords')
    .alias('s')
    .description('Searches for words in a grid of chars based on input of:\ncomma,separated,words\ng,r\ni,d')
    .action(() => {
        prompt(questions).then((answers) => {
            try {
                console.log('Your File Path:', answers.fileName);
                const data = fs.readFileSync(answers.fileName, 'utf8').toString();
                console.log('First line of file: ', data.split(/\r?\n/)[0], '\n');
                console.log(WordSearch.main(data));
            } catch (err) {
                console.error(err);
            }
        })
    });

if (!process.argv.slice(2).length || !/[arudl]/.test(process.argv.slice(2))) {
    program.outputHelp();
    process.exit();
}
program.parse(process.argv);