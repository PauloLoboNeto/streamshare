// const generateCodeverifier = (): string => Math.random().toString(36).substring(2, 15);
import sha256 from 'crypto-js/sha256';

export function generateCodeverifier(): string {
    const array = new Uint8Array(32);
    crypto.getRandomValues(array);
    return Array.from(array, byte => ('0' + (byte & 0xff).toString(16)).slice(-2)).join('');
}

export function generateCodeChallenge(codeVerifier: string): string { return btoa(sha256(codeVerifier).toString()) };