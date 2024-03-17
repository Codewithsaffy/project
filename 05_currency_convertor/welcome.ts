import chalk from "chalk";
// welcome

// Instructions:-

function displayInstructions() {
    console.log(chalk.green('Welcome to the CLI Currency Converter!'));
    console.log('-------------------------------------------------');
  console.log(chalk.yellow('Usage Instructions:'));
  console.log(chalk.cyan('1. To convert currency, you will need to enter the amount followed by the country code of the currency you are converting from and the country code of the currency you are converting to.'));
  console.log(chalk.cyan('2. Country codes should be in the ISO 4217 format. For example, USD for United States Dollar, EUR for Euro, GBP for British Pound, etc.'));
  console.log(chalk.cyan('3. An example command might look like: ') + chalk.magenta('convert 100 USD to EUR'));
  console.log(chalk.cyan('4. To see a list of all supported country codes, type: ') + chalk.magenta('codes'));
  console.log(chalk.cyan('5. For help at any time, type: ') + chalk.magenta('help'));
  console.log('-------------------------------------------------');
  console.log(chalk.yellow('Please, follow the instructions to use the app correctly.'));
  console.log(chalk.green('Thank you for using the CLI Currency Converter!'));
}

export default displayInstructions;