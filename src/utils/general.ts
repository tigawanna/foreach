import kleur from 'kleur';

export function logNormal(message: string, data?: any) {

    console.log(kleur.blue(`${message}`))
    data && console.log(data);
}


export function logSuccess(message: string, data?: any) {
    console.log(kleur.green(`Success: ${message}`));
    data && console.log(data);
}

export function logWarning(message: string, data?: any) {
    console.log(kleur.yellow(`Warning: ${message}`));
    data && console.log(data);
}

export function logError(message: string, data?: any) {
    console.log(kleur.red(`Error: ${message}`));
    data && console.log(data);
}
