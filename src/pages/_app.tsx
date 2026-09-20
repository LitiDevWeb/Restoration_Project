import { ToastContainer } from "react-toastify";
import NextNProgress from "nextjs-progressbar";

import "@webapp/styles/globals.scss";
import "@splidejs/react-splide/css";
import "react-toastify/dist/ReactToastify.css";
import "react-calendar/dist/Calendar.css";

import type { AppProps } from "next/app";

const MyApp = ({ Component, pageProps }: AppProps) => (
  <>
    <NextNProgress color="#c9a24d" />
    <Component {...pageProps} />
    <ToastContainer
      position="bottom-center"
      autoClose={5000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="light"
    />
  </>
);

export default MyApp;
