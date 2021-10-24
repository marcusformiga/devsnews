import { AppProps } from "next/app"
import "../../styles/global.scss"
import { Header } from "./components/Header"
import {Provider as NextGhAuthProvider} from "next-auth/client"

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <NextGhAuthProvider session={pageProps.session}>
      <Header />
      <Component {...pageProps} />
    </NextGhAuthProvider>
  );
}

export default MyApp
