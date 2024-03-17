#! /usr/bin/env node

import chalk from "chalk";
import figlet from "figlet";
import inquirer from "inquirer";
class Player {
  health: number = 100;

  constructor(public name: string) {}

  increaseHealth() {
    this.health = Math.min(this.health + 25, 100);
  }

  decreaseHealth() {
    this.health = Math.max(this.health - 25, 0);
  }
}

class Opponent extends Player {}

async function main() {
    console.clear()
  console.log(chalk.yellow(figlet.textSync("Battle Game", { horizontalLayout: "full" })));

  const playerNameResponse = await inquirer.prompt({
    name: "plrName",
    type: "input",
    message: "Enter Your name",
    default: "Player",
  });

  const opponentNameResponse = await inquirer.prompt({
    name: "optName",
    type: "list",
    message: "Choose your enemy name",
    choices: ["Zombie", "Ghost", "Computer"],
  });

  let p1 = new Player(playerNameResponse.plrName);
  let o1 = new Opponent(opponentNameResponse.optName);

  console.log(`${chalk.green.bold(p1.name)}  ${chalk.blue.italic("VS")}  ${chalk.red.bold(o1.name)}\n`);

  let loop = true;
  while (loop) {
    const action = await inquirer.prompt({
      name: "act",
      type: "list",
      message: "What will you do?",
      choices: ["Attack", "Defend", "Rest"],
    });
    function deH() {
        let ranN1 = Math.floor(Math.random() * 2);
        if (ranN1 <= 0) {
            return p1.decreaseHealth();
        } else if (ranN1 > 0) {
            return o1.decreaseHealth();
        }
    }
    function inH() {
        let ranN2 = Math.floor(Math.random() * 2);
        if (ranN2 <= 0) {
            return o1.increaseHealth();
        } else if (ranN2 > 0) {
            return p1.increaseHealth();
        }
    }
    if (action.act === "Attack") {
      deH()
    } else if (action.act === "Defend") {
      inH()
    } else if (action.act === "Rest") {
      p1.increaseHealth();
    }

    if (p1.health <= 0) {
      console.clear();
      console.log(`${chalk.bold.magenta.italic(p1.name)}, ${chalk.red("you have died!")}`);
      console.log(chalk.greenBright("Good Luck for next game"));
      loop = false;
    } else if (o1.health <= 0) {
      console.clear();
      console.log(chalk.yellow(figlet.textSync("You Win", { horizontalLayout: "full" })));
      console.log(`Congratulations ${chalk.magenta.bold.bgBlack(p1.name)}`);
      loop = false;
    } else {
      console.log(chalk.blue.bold(`${p1.name} Health: `) + chalk.green(`${p1.health} out of 100`));
      console.log(chalk.blue.bold(`${o1.name} Health: `) + chalk.red(`${o1.health} out of 100`));
    }
  }
}

async function gameLoop() {
  let playAgain = true;

  while (playAgain) {
    try {
      await main();
    } catch (err) {
      console.error(chalk.bold.gray("Error Occurred!"), err);
    }

    const playAgainResponse = await inquirer.prompt({
      type: "confirm",
      name: "playAgain",
      message: "Do you want to play again?",
    });

    playAgain = playAgainResponse.playAgain;
  }

  console.log(chalk.greenBright("Thank you for playing!"));
}

gameLoop();