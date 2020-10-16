const newsAuthenticator = require('./NewsAuthenticity/news_authenticator');
const limeLightPeople = require('./LimeLightPeople/limelight_people');

const readline = require('readline');

let inputStream = process.stdin;

const rl = readline.createInterface({
    input: inputStream,
    output: process.stdout
})


const template = `Supportable Commands = 
    1.) 1: <enter a title to check for authenticity>
    2.) 2: <category> (get people in lime light in category)
    3.) Press ctrl + C to exit
    `
console.log(template)

rl.prompt()

rl.on('line', (line) => {
    try {
        const command = line.trim().split(':')[0];
        const searchString = line.trim().split(':')[1];
        switch (command) {
            case '1':
                newsAuthenticator.checkAuthenticity(searchString);
                break;
            case '2':
                limeLightPeople.getLimeLightPeople(searchString);
                break;
            default:
                console.log(`'${line.trim()}' is an unsupported command`);
                break;
        }
    }
    catch (ex) {
        console.log(`Error: ${ex.message}`)
    }

    setTimeout(() => { 
        rl.prompt(); 
        }, 
        3000
    );

}).on('close', () => {
    console.log('Bye Bye!')
    process.exit(0)
})