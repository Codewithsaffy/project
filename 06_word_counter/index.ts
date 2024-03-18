// WORD COUNTER 
import inquirer from "inquirer"
import chalk from "chalk"
import figlet from "figlet"
console.clear()
const { yellow, red, magenta  } = chalk;
console.log(yellow(figlet.textSync("Word Counter", { horizontalLayout: 'full' })));

// Questions for user input

const answers: {
    para: string
} = await inquirer.prompt({
    name: "para",
    message: red.bold("Enter a paragraph to count the words: "),
    type: "input"
})
let { para } = answers;

let wordCount = para.trim().split(" ")
let characterCount = para.trim().split("")

console.log(magenta(`Total characters in this sentence is ${yellow.bold(characterCount.length)}`))
console.log(magenta(`Total words in this sentence is ${yellow.bold(wordCount.length)}`))
