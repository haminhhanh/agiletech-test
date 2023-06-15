import { useAuthenState } from "./../../atom/authen/index";
import dayjs from "dayjs";
import jwt_decode from "jwt-decode";
import { StorageKey } from "./storage/index";
import { setCookie } from "cookies-next";
import TokenManager, { injectBearer, parseJwt } from "brainless-token-manager";
import { refresh_token } from "./refreshToken";

export const tokenManager = new TokenManager({
  getAccessToken: async () => {
    const token = window?.localStorage.getItem(StorageKey.Authen);
    return `${token}`;
  },
  getRefreshToken: async () => {
    const refreshToken = window?.localStorage.getItem(StorageKey.Refresh_token);
    return `${refreshToken}`;
  },
  isValidToken: async () => {
    const token = window?.localStorage.getItem(StorageKey.Authen);
    const decode: any = token && jwt_decode(token);
    const current_time = dayjs(new Date());
    return current_time < dayjs(decode?.exp * 1000);
  },
  executeRefreshToken: async () => {
    const refreshToken: any = window?.localStorage.getItem(
      StorageKey.Refresh_token
    );
    if (!refreshToken) {
      return {
        token: "",
        refresh_token: "",
      };
    } else {
      try {
        const r = await refresh_token(refreshToken);
        return {
          token: r?.access?.token,
          refresh_token: r?.refresh?.token,
        };
      } catch (error) {
        setCookie("shopDunkToken", "");
        window?.localStorage.setItem(StorageKey.Authen, "");
        window?.localStorage.set(StorageKey.Refresh_token, "");
        return {
          token: "",
          refresh_token: "",
        };
      }
    }
  },
  onInvalidRefreshToken: () => {
    window?.localStorage.set(StorageKey.Authen, "");
    window?.localStorage.set(StorageKey.Refresh_token, "");
  },
  onRefreshTokenSuccess: ({ token, refresh_token }) => {
    if (token && refresh_token) {
      window?.localStorage.setItem(StorageKey.Authen, token);
      window?.localStorage.setItem(StorageKey.Refresh_token, token);
    }
  },
  isValidRefreshToken: async (refresh_token: string) => {
    if (!refresh_token) {
      window?.localStorage.setItem(StorageKey.Authen, "");
      window?.localStorage.setItem(StorageKey.Refresh_token, "");
      return false;
    }
    const decode: any = refresh_token && jwt_decode(refresh_token);
    const current_time = dayjs(new Date());
    return current_time < dayjs(decode?.exp * 1000);
  },
});
