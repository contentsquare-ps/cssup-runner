
import { get } from 'https';
import { createWriteStream } from 'fs';
import { mkdir, rm } from 'fs/promises';
import { promisify } from 'util';
import { exec } from 'child_process';
import { cssupFolder, cssupLocalZip, cssupRemoteFile, cssupRemoteVersion } from './constants.js';
import { errorLog, infoLog } from './log.js';
import { stderr } from 'process';


const promiseExec = promisify(exec);

export function getPackage() {
    return new Promise((resolve, reject) => {
        let request = get(cssupRemoteFile).on('response', (response) => {
            response.pipe(createWriteStream(cssupLocalZip, { encoding: null }));
        }).on('error', reject).on('close', resolve);
        request.end();
    });
}

export async function getPackageAndUnzip() {
    try {
        infoLog('Create cssup folder');
        await mkdir(cssupFolder);
        infoLog('Retrieve package file');
        await getPackage(cssupRemoteFile, cssupLocalZip);
        infoLog('Unzip package file');
        let std = await promiseExec(`unzip ${cssupLocalZip} -d ${cssupFolder}`);
        if (std.stderr) {
            console.log(stderr);
            return 1;
        }
        rm(cssupLocalZip);
    }
    catch (err) {
        errorLog(`Error: Couldn't fetch package zip`);
        console.log(err);
    }
}

export function getRemoteVersion() {
    return new Promise((resolve, reject) => {
        let request = get(cssupRemoteVersion).on('response', (response) => {
            let jsonText = '';
            response.on('data', chunk => {
                jsonText += chunk;
            });
            
            response.on('end', () => {
                try {
                    let packageObj = JSON.parse(jsonText);
                    let { version } = packageObj;
                    resolve(version);
                }
                catch {
                    reject();
                }
            })
        }).on('error', reject);
        request.end();
    });
}