import inquirer from "inquirer";
import chalk from "chalk";
import figlet from "figlet";
import { faker } from "@faker-js/faker";
console.clear();

// Custumor class
class Customor {
  constructor(
    public firstName: string,
    public lastName: string,
    public age: number,
    public gender: string,
    public mobileNo: number,
    public accountNo: number
  ) { }
}

// Interface BankAccount
interface BankAccount {
  accountNo: number;
  balance: number;
}

//class Bank
class Bank {
  customer: Customor[] = [];
  account: BankAccount[] = [];

  addcustomer(obj: Customor) {
    this.customer.push(obj);
  }

  addAccountNumber(obj: BankAccount) {
    this.account.push(obj);
  }
  // method to tancsaction
  transaction(obj: BankAccount) {
    let newAccount = this.account.filter(
      (acc) => acc.accountNo !== obj.accountNo
    );
    this.account = [...newAccount, obj];
  }
}

// instance of cus

let bank = new Bank();

// customer create

for (let i: number = 1; i <= 3; i++) {
  let fName = faker.person.firstName("male");
  let lName = faker.person.lastName();
  let moNum = parseInt(faker.phone.number());
  const cus = new Customor(
    fName,
    lName,
    Math.floor(Math.random() * (70 - 25) + 25),
    "Male",
    moNum,
    1000 + i
  );
  bank.addcustomer(cus);
  bank.addAccountNumber({ accountNo: cus.accountNo, balance: 100 * i });
}
// Bank fn

async function banksercive(bank: Bank) {
  do {
    let service: {
      select: string
    } = await inquirer.prompt([
      {
        type: "list",
        name: "select",
        message: "please select the Services",
        choices: ["view Balance", "Cash Deposit", "Cash Withdraw", "Exit"],
      },
    ]);
    if (service.select === "view Balance") {
      let res = await inquirer.prompt([
        {
          type: "number",
          name: "num",
          message: "Please enter your Account Number",
        },
      ]);
      let account = bank.account.find((val) => val.accountNo === res.num);
      if (!account) {
        console.log(chalk.red.bold("Invalid Account Number"));
      }
      if (account) {
        let name = bank.customer.find(
          (val) => val.accountNo == account.accountNo
        );
        console.log(
          `Dear ${chalk.green.italic(
            name?.firstName,
            name?.lastName
          )}, Your account balance is ${chalk.blue.bold("$" + account.balance)}`
        );
      }
    }
    if (service.select === "Cash Withdraw") {
      let res = await inquirer.prompt([
        {
          type: "number",
          name: "num",
          message: "Please enter your Account Number",
        },
      ]);
      let account = bank.account.find((val) => val.accountNo === res.num);
      if (!account) {
        console.log(chalk.red.bold("Invalid Account Number"));
      }
      if (account) {
        let ans = await inquirer.prompt([
          {
            type: "number",
            name: "rupee",
            message: "please Enter your number",
          },
        ]);
        if (ans.rupee > account.balance) {
          console.log(chalk.red.bold("Insufficient Balance!"));
        } else {
          let newBalance = account.balance - ans.rupee;
          bank.transaction({ accountNo: account.accountNo, balance: newBalance });
        }
      }
    }
    if (service.select === "Cash Deposit") {
      let res = await inquirer.prompt([
        {
          type: "number",
          name: "num",
          message: "Please enter your Account Number",
        },
      ]);
      let account = bank.account.find((val) => val.accountNo === res.num);
      if (!account) {
        console.log(chalk.red.bold("Invalid Account Number"));
      }
      if (account) {
        let ans = await inquirer.prompt([
          {
            type: "number",
            name: "rupee",
            message: "please Enter your number",
          },
        ]);
        let newBalance = account.balance + ans.rupee;
        bank.transaction({ accountNo: account.accountNo, balance: newBalance });
      }
    }
    if (service.select === "Exit") {
      console.clear()
      return;
    }
  } while (true)
}
try {
  banksercive(bank);
} catch {
  console.log(chalk.red.bold('Something went wrong'));
}

