import inquirer from 'inquirer'
import chalk from 'chalk'
import  displayInstructions from './welcome.js';
import  { validCurrency, validCountryCode } from "./validationFn.js";
console.clear()
displayInstructions()
// User Input
let userCurrencyCode;
const prompt = async () => {
    const answers = await inquirer.prompt([
    {
        name: "userCurrency",
        type: "input",
        message: `Enter Your Currency Like: ${chalk.yellow.bold(100)} = `,
        validate:validCurrency
    },
    {
        type: "input",
        name: "userCurrencyCode",
        message: `Enter Your Currency Country Code Like: ${chalk.yellow.bold("PKR")} = `, 
        validate:validCountryCode,
    },
    {
        type: "input",
        name: "userConvertedCode",
        message: `Enter Converted Currency Country  Code Like: ${chalk.yellow.bold("USD")} = `,
        validate:validCountryCode,
    }])
    let {userCurrency,userCurrencyCode,userConvertedCode } = answers

console.clear()
console.log(chalk.bold.magentaBright("Processing..."))
let data = await fetch(`https://v6.exchangerate-api.com/v6/2af43df1510704b304c8c24f/latest/${userCurrencyCode}`);
let response = await data.json();
let value =  response.conversion_rates[userConvertedCode];
console.clear()
console.log(`${chalk.bold.green(userCurrency)} ${chalk.red(userCurrencyCode)} =  ${chalk.yellow(Math.floor(value * userCurrency))}  ${chalk.redBright(userConvertedCode)}`);
}
prompt()
// api call 

// console.log(response.data);