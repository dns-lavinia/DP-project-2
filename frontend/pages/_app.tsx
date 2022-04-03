import type { AppProps } from 'next/app'
import "tailwindcss/tailwind.css"
import Head from 'next/head'

function MyApp({ Component, pageProps }: AppProps) {
    return (
        <>
            <Head>
                <title>Cruce</title>
                <link rel="icon" href="/favicon.ico" />
                <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@300&display=swap" rel="stylesheet" />
            </Head>
            <div className=" bg-dark-4 min-h-screen w-screen">
                <Component {...pageProps} />
            </div>
        </>
    )
}

export default MyApp
