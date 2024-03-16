#! /usr/bin/env node

// Improved Number Guessing Game

import inquirer from "inquirer";
import chalk from "chalk";
import figlet from "figlet";

// Welcome message to start the game
const welcome = () => {
    console.clear();
    console.log(chalk.redBright.bold(figlet.textSync('Guess the Number!', { horizontalLayout: 'full' })));
    console.log(chalk.bgBlack.greenBright.bold('Instructions: \n'));
    console.log(chalk.bold.red('(1)=> Guess a number between 0-99.'));
    console.log(chalk.bold.blue('(2)=>  You have 10 chances to guess correctly.'));
    console.log(chalk.bold.yellow('(3)=>  Hints will be provided each attempt.\n'));
    console.log(chalk.redBright.bgBlue.bold('Good Luck!\n'));
};

// Validate user input
const validateInput = (input:string) => {
    const number = parseInt(input, 10);
    if (isNaN(number)) {
        return "Please enter a valid number.";
    }
    if (number < 0 || number > 99) {
        return "The number must be between 0 and 99.";
    }
    return true;
};

// Provide hints to the user
const getHint = (userNumber:number, computerNumber:number) => {
    const difference = Math.abs(userNumber - computerNumber);
    if (difference === 0) {
        return 'Correct!';
    } else if (difference <= 5) {
        return 'Hot! You are very close!';
    } else if (difference <= 10) {
        return 'Warm. Quite close.';
    } else if (difference <= 20) {
        return 'Cold. Not too far.';
    } else {
        return 'Very cold. Far from the number.';
    }
};

// Game logic
const game = async () => {
    const computerNumber = Math.floor(Math.random() * 100);
    let attempts = 0;
    const maxAttempts = 10;

    while (attempts < maxAttempts) {
        const answer = await inquirer.prompt({
            name: "userNumber",
            type: "input",
            message: "Guess a number between 0 - 99:",
            validate: validateInput
        });

        const userNumber = parseInt(answer.userNumber, 10);
        const hint = getHint(userNumber, computerNumber);
        
        if (userNumber === computerNumber) {
            console.clear();
            console.log(chalk.yellow(figlet.textSync('YOU WON!', { horizontalLayout: 'full' })));
            console.log(chalk.bold.gray('The number was ' + computerNumber));
            return; 
        } else {
            console.log(chalk.blue(hint)); 
        }

        attempts++;

        if (attempts === maxAttempts) {
            console.log(chalk.red(`You've run out of attempts! The number was ${computerNumber}.`));
            return; 
        }
    }
};

const startGame = async () => {
    let playAgain = false;
    do {
        welcome();
        await game().catch(e => {
            console.error(chalk.bold.red(e.message));
        });
        const confirm = await inquirer.prompt([
            {
                type: "confirm",
                name: "playAgain",
                message: "Would you like to play again?",
            },
        ]);
        playAgain = confirm.playAgain;
    } while (playAgain);
};

startGame().catch(e => {
    console.error(chalk.bold.red('An error occurred: ' + e.message));
});