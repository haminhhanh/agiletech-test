import { request } from '..';
import { REFRESH_TOKEN } from './query';

export const refresh_token = async (params: { refresh_token: string }) => {
  const result = await request(REFRESH_TOKEN, params);
  return result?.refresh_token?.token;
};