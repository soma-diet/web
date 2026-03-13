// src/lib/api/error.ts
export abstract class SomaError extends Error {
    private readonly logMsg: string;

    constructor(
        message: string,
        details?: string | null,
        logOnInit: boolean = false,
    ) {
        let fullMsg = details ? message + "\n" + details : message;
        super(fullMsg);

        // 'this.constructor.name' = class name
        this.logMsg = `${this.constructor.name}: ${fullMsg}`;

        if (logOnInit) this.log();
    }

    selfAlert(): void {
        alert(this.logMsg);
    }

    log(): void {
        console.error(this.logMsg);
    }
}
