import { existsSync, readFileSync } from 'fs';
import { cssupPackageJson } from './constants.js';
import { errorLog } from "./log.js";

export function checkVersion() {
    if (existsSync(cssupPackageJson)) {
        let packageStr = readFileSync(cssupPackageJson);
        try {
            let packageObj = JSON.parse(packageStr);
            return packageObj.version;
        }
        catch {
            errorLog(`ERROR: Can't parse cssup version`);
        }
    }
    else {
        errorLog('ERROR: CSSup not found')
    }
}