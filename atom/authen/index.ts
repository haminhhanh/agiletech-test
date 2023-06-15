import { StorageKey } from './../../src/api/storage/index';
import { ATOM } from "../atom";
import {
  atom,
  useRecoilState,
  useRecoilValue,
  useSetRecoilState,
} from "recoil";
import dayjs from "dayjs";
import { useMount } from "ahooks";

type TAuthenState = {
  token: string | undefined | null;
  loading: boolean;
  reinitialized: boolean;
};

const initialState: TAuthenState = {
  token: undefined,
  loading: false,
  reinitialized: true,
};

export const authenAtom = atom<TAuthenState>({
  key: ATOM.AUTHEN,
  default: initialState,
});

export const useAuthenState = () => {
  return useRecoilState(authenAtom);
};

export const useAuthenStateValue = () => {
  return useRecoilValue(authenAtom);
};

export const useSetAuthenState = () => {
  return useSetRecoilState(authenAtom);
};

export const useRehydrateAuthenState = () => {
  const [, setAuthenState] = useAuthenState();

  useMount(() => {
    const locale = window?.localStorage.getItem(StorageKey.Language);
    const token = window?.localStorage.getItem(StorageKey.Authen);

    setAuthenState({ loading: false, reinitialized: false, token: token });
  });
};
