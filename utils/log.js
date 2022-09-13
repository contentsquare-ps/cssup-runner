import chalk from 'chalk';

const errorLog = msg => console.log(chalk.bold.red(msg));
const infoLog = msg => console.log(chalk.blue(msg));
const okLog = msg => console.log(chalk.green(msg));
const warnLog = msg => console.log(chalk.hex('#FFA500')(msg))
const codeLog = msg => console.log(chalk.magentaBright.bgGray(msg))


export { errorLog, infoLog, okLog, warnLog, codeLog }