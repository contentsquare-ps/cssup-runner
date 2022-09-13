#!/usr/bin/env node

import { existsSync } from 'fs';
import { rm } from 'fs/promises';
import { argv } from "process";
import { cssupFolder, cssupPackageJson } from './utils/constants.js';

import { getPackageAndUnzip, getRemoteVersion } from './utils/fetch.js';
import { QandA } from './utils/QanA.js';
import { errorLog, infoLog, okLog, warnLog, codeLog } from './utils/log.js';
import { checkVersion } from './utils/version.js';
import { runCSSup } from './utils/run.js';

console.clear();
; (async () => {
    let action;
    if (argv.length < 3) {
        action = 'run';
    }
    else if (argv.length > 3) {
        errorLog('ERROR: too many arguments');
        return 1;
    }
    else {
        action = argv[2];
    }
    let qA;
    switch (action) {
        case 'run':
            infoLog('Checking if cssup folder exists');
            if (existsSync(cssupPackageJson)) {
                let currentVersion = checkVersion();
                infoLog(`Checking for updates (current version: ${currentVersion})`);
                try {
                    let remoteVersion = await getRemoteVersion();
                    if (remoteVersion !== currentVersion) {
                        warnLog(`New version found! (${remoteVersion})`);
                        qA = new QandA();
                        let proceed = await qA.ask('Update now? (y/n) ');
                        if (proceed && proceed.toLowerCase() === 'y') {
                            infoLog('Removing cssup folder');
                            await rm(cssupFolder, { recursive: true, force: true });
                            await getPackageAndUnzip();
                        }
                    }
                    infoLog('Running!')
                    await runCSSup()
                }
                catch (err) {
                    console.log(err)
                    errorLog(`ERROR: Couldn't fetch remote version`);
                    infoLog('Running!')
                    await runCSSup()
                }
            }
            else {
                warnLog(`Can't find cssup folder - installing!`)
                await getPackageAndUnzip();
                infoLog('Running!')
                await runCSSup()
            }
            break;
        case 'help':
            //todo combine readme and this part

            codeLog(`cssup-runner`);
            codeLog(`cssup-runner run`);
            console.log(`Check if cssup exists\n\t* yes - check version\n\t* no - install\nRun cssup\n`);

            codeLog(`cssup-runner help`);
            console.log(`show this\n`);

            codeLog(`cssup-runner uninstall`);
            codeLog(`cssup-runner remove`);
            console.log('removes the cssup folder\n');

            codeLog(`cssup-runner version`);
            console.log('get current version\n');
            return 0;
        case 'remove':
            qA = new QandA();
            let proceed = await qA.ask('Are you sure? (y/n)');
            if (proceed && proceed.toLowerCase() === 'y') {
                infoLog('Removing cssup folder');
                await rm(cssupFolder, { recursive: true, force: true });
                okLog('Done!');
            }
            return 0;
        case 'version':
            infoLog(`Version: ${checkVersion()}`);
            break;
        default:
            errorLog(`ERROR: unknown argument ${action}`);
            return 1;
    }


})();