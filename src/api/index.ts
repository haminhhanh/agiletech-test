import { extend } from 'umi-request';
import { tokenManager } from './tokenManager';
import { StorageKey } from './storage';
import  { injectBearer } from "brainless-token-manager";
import { ENVIRONMENTS } from 'src/constant';

const request = extend({
  prefix: ENVIRONMENTS.API_URL,
  errorHandler: async (error) => {
    if (error.response?.status === 401) {
      await tokenManager.getToken().then((res:any) => {
          window?.localStorage.setItem(StorageKey.Authen,res );
      });
      window?.location.reload();
      // clean all token
    }
    throw error?.data || error?.response;
  },
});

const privateRequest = async (
  request: any,
  suffixUrl: string,
  configs?: any,
) => {
  const token: string = (await tokenManager.getToken()) as string;
  return request(suffixUrl, injectBearer(token, configs));
};
export {  request, privateRequest };