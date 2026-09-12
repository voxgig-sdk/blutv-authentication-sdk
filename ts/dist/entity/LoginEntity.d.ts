import { BlutvAuthenticationEntityBase } from '../BlutvAuthenticationEntityBase';
import type { BlutvAuthenticationSDK } from '../BlutvAuthenticationSDK';
import type { Control } from '../types';
import type { Login, LoginCreateData } from '../BlutvAuthenticationTypes';
declare class LoginEntity extends BlutvAuthenticationEntityBase<Login> {
    constructor(client: BlutvAuthenticationSDK, entopts: any);
    make(this: LoginEntity): LoginEntity;
    create(this: any, reqdata?: LoginCreateData, ctrl?: Control): Promise<LoginEntity>;
}
export { LoginEntity };
