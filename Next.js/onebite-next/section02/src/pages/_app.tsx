import type { AppProps } from "next/app";
import Link from "next/link";
import { useRouter } from "next/router";

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const onClickButton = () => {
    router.push("/test");
  };

  return (
    <div>
      <header></header>
      <main>
        <Component {...pageProps} />
      </main>
      ;<footer></footer>
    </div>
  );
}
