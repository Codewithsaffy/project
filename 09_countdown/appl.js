import inquirer from "inquirer";
import { differenceInSeconds } from "date-fns";
import figlet from "figlet";
function validation(input) {
    let parsed = parseFloat(input);
    if (isNaN(parsed)) {
        return `Please enter a valid number.`;
    }
    else if (parsed > 60) {
        return `Seconds must be less than or equal to 60.`;
    }
    return true;
}
// Function to display the welcome message using figlet
function welcome() {
    figlet.text('Welcome to the Timer Application!', function (err, data) {
      if (err) {
        console.log('Something went wrong...');
        console.dir(err);
        return;
      }
      console.log(data);
      console.log("You will be prompted to enter the number of seconds (up to 60) for the timer.");
    });
  }
  
  // Invoke the welcome function
  welcome();
async function main() {
    welcome(); 
    const res = await inquirer.prompt({
        type: "input",
        name: "userInput",
        message: "Please enter the amount of seconds:",
        validate: validation
    });
    let input = parseFloat(res.userInput);
    startTime(input);
}
function startTime(val) {
    const time = new Date().setSeconds(new Date().getSeconds() + val);
    const date = new Date(time);
    const intervalId = setInterval(() => {
        const currentTime = new Date();
        const timeDiff = differenceInSeconds(date, currentTime);
        if (timeDiff <= 0) {
            console.log("Timer has expired");
            clearInterval(intervalId); 
            process.exit();
        }
        const minutes = Math.floor(timeDiff / 60);
        const seconds = Math.floor(timeDiff % 60);
        console.clear(); 
        console.log(`${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`);
    }, 1000);
}
main(); 
