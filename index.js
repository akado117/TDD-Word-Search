const program = require('commander');
const { prompt } = require('inquirer');
const fs = require('fs');
const Main = require('./cmd/main').default;

const questions = [
    {
        type : 'input',
        name : 'fileName',
        message : 'Please enter relative path to commands file (example "./test.txt")'
    }
];

program
    .version('0.0.43')
    .description('Trip Aggregator');

program
    .command('runDriverCommandsFromFile')
    .alias('r')
    .description('Runs commands from given file')
    .action(() => {
        prompt(questions).then((answers) => {
            try {
                console.log('Your File Path:', answers.fileName);
                const data = fs.readFileSync(answers.fileName, 'utf8').toString();
                console.log('First line of file: ', data.split(/\r?\n/)[0]);
                const main = new Main();
                console.log(main.main(data));
            } catch (err) {
                console.error(err);
            }
        })
    });

// Assert that a VALID command is provided
if (!process.argv.slice(2).length || !/[arudl]/.test(process.argv.slice(2))) {
    program.outputHelp();
    process.exit();
}
program.parse(process.argv)