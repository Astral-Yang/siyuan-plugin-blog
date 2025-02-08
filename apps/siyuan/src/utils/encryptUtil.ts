export function encrypt(input: string) {
    return btoa(input.split('').map(c => String.fromCharCode(c.charCodeAt(0) ^ 42)).join(''));
}

export function decrypt(encrypted: string) {
    return atob(encrypted).split('').map(c => String.fromCharCode(c.charCodeAt(0) ^ 42)).join('');
}