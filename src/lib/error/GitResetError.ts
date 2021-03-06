/**
 * Generate Release
 * Written by Kevin Gravier <kevin@mrkmg.com>
 * MIT License 2018
 */

export class GitResetError extends Error {
    constructor(public originalError?: Error) {
        super(originalError ? originalError.message : "Unknown Error, Resetting.");
        const proto = new.target.prototype;
        if (Object.setPrototypeOf) {
            Object.setPrototypeOf(this, proto);
        } else {
            (this as any).__proto__ = new.target.prototype;
        }
    }
}
