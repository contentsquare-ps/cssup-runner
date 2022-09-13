import { promisify } from 'util';
import { exec, execFile } from 'child_process';
import { serverJS } from './constants.js';
import { infoLog } from './log.js';
import { setTimeoutAsPromise } from './sleep.js';

const promiseExec = promisify(exec);

export async function runCSSup() {
    infoLog('Starting Server');
    try {
        await promiseExec(`kill -9 $(ps aux | grep '\snode\s' | awk '{print $2}')`);
    } catch { }
    execFile(`node`, [`${serverJS}`], (error, stdout, stderr) => {
        if (error) {
            throw error;
        }
        console.log(stdout);
    });
    await setTimeoutAsPromise();
    infoLog('Starting Client');
    await promiseExec(`open -a "Google Chrome" http://localhost:3000`);
    return;
}