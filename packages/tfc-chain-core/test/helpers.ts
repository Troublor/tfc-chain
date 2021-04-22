import * as crypto from 'crypto';

export function genAfid(): string {
    const bytes = crypto.randomBytes(28);
    return '0x' + bytes.toString('hex');
}