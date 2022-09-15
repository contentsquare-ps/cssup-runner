import { existsSync, readFileSync, writeFileSync } from "fs";
import { getHardwareUuid } from "./getuuid.js";
import { sep } from 'path';
import { cssupFolder } from "./constants.js";

export function getCredentials() {
    const uuidH = getHardwareUuid();
    const emptyCreds = '';

    try {
        const filename = `${cssupFolder}${sep}cred-${uuidH}.json`;
        if (existsSync(filename)) {
            const credsJson = readFileSync(filename, { encoding: 'utf-8' });
            return credsJson;
        }
    }
    catch (err) {
        console.log(err);
    }
    return emptyCreds
}

/**
 * 
 * @param {!string} credentials 
 */
export function writeCredentials(credentials) {
    const uuidH = getHardwareUuid();
    const filename = `${cssupFolder}${sep}cred-${uuidH}.json`;
    writeFileSync(filename, credentials, { encoding: 'utf-8' });
}