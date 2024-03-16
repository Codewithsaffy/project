import inquirer from "inquirer";
import chalk from "chalk";
import figlet from "figlet";

let todos:string[] = []; 

async function welcome() {
    console.log(chalk.yellow(figlet.textSync("Todo Manager")));
    console.log(chalk.green("Welcome to the Todo Manager! Let's get organized!"));
}

async function manageTodos() {
    let loop = true; 

    while (loop) {
        const mainMenu = await inquirer.prompt([
            {
                name: "options",
                type: "list",
                message: "What do you want to do?",
                choices: ["Add Task", "View Tasks", "Remove Task", "Quit"]
            }
        ]);

        switch (mainMenu.options) {
            case "Add Task":
                const { addTodo } = await inquirer.prompt([
                    {
                        name: "addTodo",
                        type: "input",
                        message: "What task do you want to add?",
                        validate: input => input.trim() === "" ? "Task cannot be empty." : true
                    }
                ]);
                todos.push(addTodo);
                console.log(`Task added: ${addTodo}`);
                break;

            case "View Tasks":
                console.log("Here are your current tasks:");
                if (todos.length === 0) {
                    console.log("Your todo list is empty.");
                } else {
                    todos.forEach((todo, index) => {
                        console.log(`${index + 1}. ${todo}`);
                    });
                }
                break;

            case "Remove Task":
                if (todos.length === 0) {
                    console.log("No tasks to remove.");
                    break;
                }
                const { indexToRemove } = await inquirer.prompt([
                    {
                        name: "indexToRemove",
                        type: "list",
                        message: "Which task do you want to remove?",
                        choices: todos.map((todo, index) => ({ name: todo, value: index }))
                    }
                ]);
                todos.splice(indexToRemove, 1);
                console.log("Task removed.");
                break;

            case "Quit":
                loop = false;
                break;
        }

        if (loop) {
            const { Confirm } = await inquirer.prompt([
                {
                    name: 'Confirm',
                    type: "confirm",
                    message: "Do you want to continue?",
                    default: true
                }
            ]);
            loop = Confirm;
        }
    }
}

async function startApp() {
    await welcome();
    await manageTodos();
}

startApp();

