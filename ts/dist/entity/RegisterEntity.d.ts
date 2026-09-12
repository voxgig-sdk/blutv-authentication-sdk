import { BlutvAuthenticationEntityBase } from '../BlutvAuthenticationEntityBase';
import type { BlutvAuthenticationSDK } from '../BlutvAuthenticationSDK';
import type { Control } from '../types';
import type { Register, RegisterCreateData } from '../BlutvAuthenticationTypes';
declare class RegisterEntity extends BlutvAuthenticationEntityBase<Register> {
    constructor(client: BlutvAuthenticationSDK, entopts: any);
    make(this: RegisterEntity): RegisterEntity;
    create(this: any, reqdata?: RegisterCreateData, ctrl?: Control): Promise<RegisterEntity>;
}
export { RegisterEntity };
