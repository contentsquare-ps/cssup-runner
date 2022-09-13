import * as readline from 'readline'

export class QandA {
    constructor() {
        this.rl = this.makeInterface();
    }

    ask(question) {
        return new Promise((resolve) => {
            this.rl.question(question, answer=>{                
                resolve(answer);
                this.rl.close();
            });
            
        });
    }

    makeInterface() {
        return readline.createInterface({
            input: process.stdin,
            output: process.stdout
        });
    }
}