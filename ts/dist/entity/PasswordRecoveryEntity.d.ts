import { BlutvAuthenticationEntityBase } from '../BlutvAuthenticationEntityBase';
import type { BlutvAuthenticationSDK } from '../BlutvAuthenticationSDK';
import type { Control } from '../types';
import type { PasswordRecovery, PasswordRecoveryCreateData } from '../BlutvAuthenticationTypes';
declare class PasswordRecoveryEntity extends BlutvAuthenticationEntityBase<PasswordRecovery> {
    constructor(client: BlutvAuthenticationSDK, entopts: any);
    make(this: PasswordRecoveryEntity): PasswordRecoveryEntity;
    create(this: any, reqdata?: PasswordRecoveryCreateData, ctrl?: Control): Promise<PasswordRecoveryEntity>;
}
export { PasswordRecoveryEntity };
