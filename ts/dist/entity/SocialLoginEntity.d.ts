import { BlutvAuthenticationEntityBase } from '../BlutvAuthenticationEntityBase';
import type { BlutvAuthenticationSDK } from '../BlutvAuthenticationSDK';
import type { Control } from '../types';
import type { SocialLogin, SocialLoginCreateData } from '../BlutvAuthenticationTypes';
declare class SocialLoginEntity extends BlutvAuthenticationEntityBase<SocialLogin> {
    constructor(client: BlutvAuthenticationSDK, entopts: any);
    make(this: SocialLoginEntity): SocialLoginEntity;
    create(this: any, reqdata?: SocialLoginCreateData, ctrl?: Control): Promise<SocialLoginEntity>;
}
export { SocialLoginEntity };
