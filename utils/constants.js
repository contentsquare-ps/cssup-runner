import { homedir } from "os";
import { sep } from "path";


export const fileName = 'cssup-server';
export const cssupFolder = `${homedir}${sep}cssup`;
export const cssupPackageJson = `${cssupFolder}${sep}package.json`;

export const cssupLocalZip = `${cssupFolder}${sep}${fileName}.zip`
export const cssupRemote = 'https://cshelper.contentsquare.com/cssup/';
export const cssupRemoteFile = `${cssupRemote}${fileName}.zip`;
export const cssupRemoteVersion = `${cssupRemote}${fileName}.json`;
export const serverJS = `${cssupFolder}${sep}server.js`;