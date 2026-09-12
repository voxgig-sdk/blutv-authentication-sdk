import { Context } from './Context';
declare class BlutvAuthenticationError extends Error {
    isBlutvAuthenticationError: boolean;
    sdk: string;
    code: string;
    ctx: Context;
    status: number;
    get notFound(): boolean;
    constructor(code: string, msg: string, ctx: Context);
}
export { BlutvAuthenticationError };
