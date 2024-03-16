import inquirer from "inquirer";
import chalk from "chalk";
import figlet from "figlet";
import RandomName from './randomName.js'

console.clear()
// Number format function

function formatNumber(num:number):string {
  if (num < 1000) {
    return num.toString();
  } else if (num < 1000000) {
    return (num / 1000).toFixed(1).replace(/\.0$/, "") + " k";
  } else if (num < 1000000000) {
    return (num / 1000000).toFixed(1).replace(/\.0$/, "") + " M";
  } else if (num < 1000000000000) {
    return (num / 1000000000).toFixed(1).replace(/\.0$/, "") + " B";
  } else {
    return (num / 1000000000000).toFixed(1).replace(/\.0$/, "") + " T";
  }
}
// user input
const prompt = inquirer.createPromptModule();
const welcome = () => {
  console.log(
    chalk.yellow(figlet.textSync("Islamic Bank", { horizontalLayout: "full" }))
  );
};
const valid = (input:string):string | boolean => {
  return /^\d+$/.test(input)
    ? true
    : chalk.red("Please enter a valid numeric string.");
};
const atm = async ():Promise<void> => {
  welcome();
  let userBalance = Math.floor(Math.random() * 1000000);
  let questions = await prompt([
    {
      name: "id",
      type: "input",
      message: chalk.yellowBright("Enter your ID number:"),
      validate: valid,
    },
    {
      name: "pinCode",
      type: "password",
      message: chalk.blue("Enter your PIN code:"),
      mask: "*",
      validate: valid,
    },
    {
      name: "payType",
      type: "list",
      choices: ["Deposit", "Withdraw", "Balance", "Exit"],
      message: chalk.red("What do you want to do?"),
    },
    {
      name: "deposit",
      type: "input",
      message: chalk.green("How much money do you want to deposit?"),
      when(answers):boolean {
        return answers.payType === "Deposit";
      },
      validate: valid,
    },
    {
      name: "withdrawMethod",
      type: "rawlist",
      choices: ["Fast Cash", "Withdraw"],
      message: chalk.magenta("Choose the method of payment?"),
      when(answers):boolean {
        return answers.payType === "Withdraw";
      },
    },
    {
      name: "withdrawAmount",
      type: "rawlist",
      message: chalk.gray("Choose an amount"),
      choices: [1000, 2000, 5000, 10000, 50000, 100000],
      when(answers):boolean {
        return answers.withdrawMethod === "Fast Cash";
      },
    },
    {
      name: "withdrawAmount",
      type: "input",
      message: chalk.blue("How much money do you want to withdraw?"),
      validate: valid,
      when(answers):boolean {
        return answers.withdrawMethod === "Withdraw";
      },
    },
  ]);
  console.clear();
  console.log(chalk.green.bold("Processing..."));
  await new Promise((resolve) => setTimeout(resolve, 2000));
  console.clear();
  console.log(chalk.gray.bold(RandomName()))
  if (questions.payType === "Withdraw") {
    if (userBalance < questions.withdrawAmount) {
      console.log(
        `${chalk.green("Your Balanace is")} : ${chalk.green(
          userBalance
        )}\n ${chalk.green("You can not get excess amount above your balance")}`
      );
    } else {
      console.log(
        chalk.bold.blueBright(
          `Your Balance before Transaction:  ${chalk.bold.yellow(
            formatNumber(userBalance)
          )}\n`
        )
      );
      userBalance -= parseInt(questions.withdrawAmount);
      console.log(
        chalk.bold.blueBright(
          `Your Balance After Transaction:  ${chalk.bold.yellow(
            formatNumber(userBalance)
          )}\n`
        )
      );
    }
  } else if (questions.payType === "Deposit") {
    console.log(
      chalk.bold.blueBright(
        `Your Balance before Transaction:  ${chalk.bold.yellow(
          formatNumber(userBalance)
        )}\n`
      )
    );
    userBalance += parseInt(questions.deposit);
    console.log(
      chalk.bold.blueBright(
        `Your Balance After Transaction:  ${chalk.bold.yellow(
          formatNumber(userBalance)
        )}\n`
      )
    );
  } else if (questions.payType === "Balance") {
    console.clear();
    console.log(
      chalk.bold.blueBright(
        `Current Balance:  ${chalk.bold.yellow(formatNumber(userBalance))}\n`
      )
    );
  } else if (questions.payType === "Exit") {
    console.clear();
  }
};
let confirm;
do {
  await atm();
  confirm = await prompt([
    {
      name: "continue",
      type: "confirm",
      message: chalk.magentaBright("Do you want to make another transaction?"),
    },
  ]);
} while (confirm.continue);
