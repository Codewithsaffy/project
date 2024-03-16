#! /usr/bin/env node
import inquirer from "inquirer";
import chalk from "chalk";
import figlet from "figlet";

//welcome fn
const welcome = () => {
  console.clear()
  console.log(
    chalk.yellow(
      figlet.textSync("CLI Calculator", { horizontalLayout: "full" })
    )
  );
};

//? ====================================================================
//* Input Data Types
//? ====================================================================

interface inputType{
  Num1:string;
  Num2:string;
  // operator is always a string in this case because it's the user choice
}
//? ====================================================================
//* Enums for operations
//? ====================================================================

enum operations {
  add = "Addition (+)",
  sub = "Substraction (-)",
  div = "Division (/)",
  mul = "Multiplication (x)",
}

//? ====================================================================
//* Check input Value is  number or not
//? ====================================================================
const validateNumberInput = (input: string) => {
  const parsed = parseFloat(input);
  if (isNaN(parsed)) {
    return "Please enter a valid number.";
  }
  return true;
};
//? ====================================================================
//* CALCULATION FUNCTION
//? ====================================================================

const answer = async () => {
  const calculator = await inquirer.prompt([
    {
      message: chalk.redBright("Enter First Number: "),
      type: "input",
      name: "Num1",
      validate: validateNumberInput,
    },
    {
      message: chalk.green(" Chose Operation What Do You Want"),
      type: "rawlist",
      name: "operator",
      choices: Object.values(operations).map((item) =>{ return chalk.bold.magentaBright(item)})
    },
    {
      message: chalk.redBright("Enter Second Number: "),
      type: "input",
      name: "Num2",
      validate: validateNumberInput,
    },
  ]);

  //? ====================================================================
  //* Result  of the Calculation
  //? ====================================================================

  let result;
  switch (calculator.operator) {
    case chalk.bold.magentaBright("Addition (+)"):
      calculator.operations = "+";
      break;
    case chalk.bold.magentaBright("Substraction (-)"):
      calculator.operations = "-";
      break;
    case chalk.bold.magentaBright("Division (/)"):
      calculator.operations = "/";
      break;
    case chalk.bold.magentaBright("Multiplication (x)"):
      calculator.operations = "*";
      break;
    default:
      break;
  }
  console.clear();
  let ans = chalk.yellowBright.bold(
    eval(calculator.Num1 + calculator.operations + calculator.Num2)
  );
  result = `${chalk.bgRed.black.bold(" Result:- ")} \n \n ${calculator.Num1} ${calculator.operations
    } ${calculator.Num2} =   ${ans} `;
  console.log(result);
};

//? ====================================================================
//* Confirming if user wants to continue or not
//? ====================================================================
let confirm;
welcome();
do {
  await answer().catch((e) => {
    console.log(chalk.bold.yellow(e));
  });
  confirm = await inquirer.prompt([
    {
      type: "confirm",
      name: "con",
      message: "Do you want to do more calculations?",
    },
  ]);
} while (confirm.con);
