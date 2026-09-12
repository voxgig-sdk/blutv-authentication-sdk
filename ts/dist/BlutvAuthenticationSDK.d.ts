import { LoginEntity } from './entity/LoginEntity';
import { PasswordRecoveryEntity } from './entity/PasswordRecoveryEntity';
import { RegisterEntity } from './entity/RegisterEntity';
import { SocialLoginEntity } from './entity/SocialLoginEntity';
export type * from './BlutvAuthenticationTypes';
import { inspect } from 'node:util';
import type { Context, Feature } from './types';
import { config } from './Config';
import { BlutvAuthenticationEntityBase } from './BlutvAuthenticationEntityBase';
import { Utility } from './utility/Utility';
import { BaseFeature } from './feature/base/BaseFeature';
declare const stdutil: Utility;
declare class BlutvAuthenticationSDK {
    _mode: string;
    _options: any;
    _utility: Utility;
    _features: Feature[];
    _rootctx: Context;
    constructor(options?: any);
    options(): any;
    utility(): any;
    prepare(fetchargs?: any): Promise<any>;
    direct(fetchargs?: any): Promise<Error | {
        ok: boolean;
        status: number;
        headers: any;
        data: any;
        err?: undefined;
    } | {
        ok: boolean;
        err: any;
        status?: undefined;
        headers?: undefined;
        data?: undefined;
    }>;
    _rawRequest(fetchargs?: any): Promise<Error | {
        ok: boolean;
        status: number;
        headers: any;
        data: any;
        err?: undefined;
    } | {
        ok: boolean;
        err: any;
        status?: undefined;
        headers?: undefined;
        data?: undefined;
    }>;
    graphql(query: string, variables?: any, ctrl?: any): Promise<any>;
    Login(entopts?: Record<string, any>): LoginEntity;
    PasswordRecovery(entopts?: Record<string, any>): PasswordRecoveryEntity;
    Register(entopts?: Record<string, any>): RegisterEntity;
    SocialLogin(entopts?: Record<string, any>): SocialLoginEntity;
    static test(testoptsarg?: any, sdkoptsarg?: any): BlutvAuthenticationSDK;
    tester(testopts?: any, sdkopts?: any): BlutvAuthenticationSDK;
    toJSON(): {
        name: string;
    };
    toString(): string;
    [inspect.custom](): string;
}
declare const SDK: typeof BlutvAuthenticationSDK;
export { stdutil, config, BaseFeature, BlutvAuthenticationEntityBase, BlutvAuthenticationSDK, SDK, };
