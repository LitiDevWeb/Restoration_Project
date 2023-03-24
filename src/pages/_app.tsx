import { ToastContainer } from "react-toastify";

import "@webapp/styles/globals.scss";
import "@fontsource/montserrat";
import "@splidejs/react-splide/css";
import "react-toastify/dist/ReactToastify.css";

import type { AppProps } from "next/app";

const MyApp = ({ Component, pageProps }: AppProps) => (
  <>
    <Component {...pageProps} />;
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
