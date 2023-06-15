import "../styles/globals.scss";
import type { AppProps } from "next/app";
import { appWithTranslation } from "next-i18next";
import nextI18nConfig from "../next-i18next.config";
import { RecoilRoot } from "recoil";
// import { memoize } from "src/utils/common";
// import ErrorBoundary from "src/components/ErrorBoundary";
import Head from "next/head";
import MainLayout from "src/layout/MainLayout";
import Login from "./login";
import { useAuthenStateValue, useRehydrateAuthenState } from "atom/authen";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useMount } from "ahooks";
import { ReactElement, ReactNode } from "react";

type AppPropsWithLayout = AppProps & {
  Component: {
    getLayout?: (page: ReactElement) => typeof page | ReactNode;
  };
};
const RootContainer = ({ Component, pageProps }: any) => {
  const authen = useAuthenStateValue();
  useRehydrateAuthenState();
  const contextClass = {
    success: "bg-blue-600",
    error: "bg-red-600",
    info: "bg-gray-600",
    warning: "bg-orange-400",
    default: "bg-indigo-600",
    dark: "bg-white-600 font-gray-300",
  };

  return (
    <>
      {/* {!authen?.token && (
        <>
          <ToastContainer
            style={{ color: "#000000" }}
            bodyClassName={() => "font-#000000"}
          />

          <Login />
        </>
      )} */}
      {/* {authen?.token && ( */}
      <MainLayout>
        <ToastContainer />
        <Component {...pageProps} />
      </MainLayout>
      {/* )} */}
    </>
  );
};

function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? ((page) => page);

  return (
    <>
      <Head>
        <meta name="robots" content="index, follow" />
        <meta charSet="utf-8" />
        <meta name="theme-color" content="#476055" />
        <meta name="title" content="Nextjs Initial" />
        <meta name="description" content="Nextjs Initial" />
        <link rel="shortcut icon" href="/static/favicon.ico" />
        <meta
          name="viewport"
          content="width=device-width,initial-scale=1,maximum-scale=2,shrink-to-fit=no"
        />
      </Head>
      {/* <ErrorBoundary> */}
      <RecoilRoot>{getLayout(<Component {...pageProps} />)}</RecoilRoot>
      {/* </ErrorBoundary> */}
    </>
  );
}

// ignore in-browser next/js recoil warnings until its fixed.
// const mutedConsole = memoize((console: any) => ({
//   ...console,
//   warn: (...args: any) =>
//     args[0].includes("Duplicate atom key") ? null : console.warn(...args),
// }));
// global.console = mutedConsole(global.console);

export default appWithTranslation(MyApp, nextI18nConfig);
