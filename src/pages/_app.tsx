import '@webapp/styles/globals.scss';
import '@fontsource/montserrat';
import '@splidejs/react-splide/css';

import type { AppProps } from 'next/app';

const MyApp = ({ Component, pageProps }: AppProps) => <Component {...pageProps} />;

export default MyApp;
