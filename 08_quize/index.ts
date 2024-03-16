import chalk from 'chalk';
import inquirer from 'inquirer';
import chalkAnimation from 'chalk-animation';


const sleep = (ms = 2000) => new Promise((r) => setTimeout(r, ms));


async function welcome() {
    const rainbowTitle = chalkAnimation.rainbow(
        'Who Wants To Be A JavaScript Millionaire? \n'
    );

    await sleep();
    rainbowTitle.stop();
}

async function questions() {
    let score: number = 0;
    function validation(input: boolean) {
        if (input) {
            score++;
            return true
        }
        else {
            return false
        }
    }
    const userQuestion1:{
        answer_1:string
    } = await inquirer.prompt({
    name: 'answer_1',
        type: 'list',
        message: 'Which of the following is a statically typed superset of JavaScript?',
        choices: [
            'JavaScript',
            'TypeScript',
            'ES6',
            'Node.js',
        ]
    });
    validation(userQuestion1.answer_1 === "TypeScript");
    const userQuestion2:{
        answer_2:string
    } = await inquirer.prompt({
        name: 'answer_2',
        type: 'list',
        message: 'Which of the following is used to define custom types in TypeScript?',
        choices: [
            'class',
            'interface',
            'function',
            'module',
        ]
    });
    validation(userQuestion2.answer_2 === "interface")

    const userQuestion3:{
        answer_3:string
    } = await inquirer.prompt({
        name: 'answer_3',
        type: 'list',
        message: 'Which of the following ES6 features does TypeScript support?',
        choices: [
            'Arrow functions',
            'Classes',
            'Promises',
            'Generators',
        ]
    });
    validation(userQuestion3.answer_3.includes("Arrow functions"));

    const userQuestion4:{
        answer_4:string
    } = await inquirer.prompt({
        name: 'answer_4',
        type: 'list',
        message: 'Which of the following is a feature unique to JavaScript compared to TypeScript?',
        choices: [
            'Optional Static Typing',
            'Strict Null Checks',
            'Classes',
            'Async/Await',
        ]
    });
    validation(userQuestion4.answer_4 === "Async/Await")
    const userQuestion5:{
        answer_5:string
    } = await inquirer.prompt({
        name: 'answer_5',
        type: 'list',
        message: 'Which of the following is a benefit of using TypeScript over JavaScript?',
        choices: [
            'Faster execution time',
            'Greater browser compatibility',
            'Static type checking',
            'Built-in testing framework',
        ]
    });
    validation(userQuestion5.answer_5 === "Static type checking")
    console.log(`Your answer is correct ${score} out of 5`)
}
let conFirm;
do {
    await welcome()
    await questions()
    conFirm = await inquirer.prompt([{
        type: 'confirm',
        name: 'restart',
        message: 'Do you want to continue?'
    }])
} while (conFirm.restart)
