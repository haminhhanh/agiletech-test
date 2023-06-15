import React, { ReactElement, useEffect, useState } from "react";
import Form, { Field, useForm } from "rc-field-form";
import styles from "./index.module.scss";
import { useRequest } from "ahooks";
import { request } from "src/api";
import { API_PATH } from "src/constant";
import { setCookie } from "cookies-next";
import { StorageKey } from "src/api/storage";
import Router from "next/router";

const Login = () => {
  const [useName, setUseName]: any = useState("");
  const requestLogin = useRequest(
    async (values) => {
      const params = {
        username: values,
      };
      return request.post(API_PATH.LOGIN, {
        data: params,
      });
    },
    {
      manual: true,
      onSuccess: (r) => {
        console.log("r", r);
        setCookie("shopDunkToken", r?.accessToken);
        window?.localStorage.setItem(StorageKey.Authen, r?.accessToken);
        window?.localStorage.setItem(StorageKey.Refresh_token, r?.refreshToken);

        Router.push("/");
      },
      onError: (err) => {
        console.log("err", err);
      },
    }
  );
  const onSubmit = () => {
    requestLogin.run(useName);
  };
  console.log("useName", useName);
  return (
    <>
      <div className={styles.login}>
        <input
          onChange={(event) => setUseName(event?.target?.value)}
          style={{ color: "black" }}
        />
        <button onClick={onSubmit}>submit</button>
      </div>
    </>
  );
};

export default Login;
