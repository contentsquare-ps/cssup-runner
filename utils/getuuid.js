import { execSync } from 'child_process';

export function getHardwareUuid() {
    const uuidH = execSync(`ioreg -d2 -c IOPlatformExpertDevice | awk -F\\" '/IOPlatformUUID/{print $(NF-1)}'`, { encoding: 'utf-8' });
    return uuidH.trim()
}


