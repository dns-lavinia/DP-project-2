import type { AppProps } from 'next/app'
import "tailwindcss/tailwind.css"
import Head from 'next/head'
import Layout from 'layouts/Layout'
import { UserProvider } from 'contexts/UserContext'

function MyApp({ Component, pageProps }: AppProps) {
    return (
        <UserProvider>
            <Head>
                <title>Cruce</title>
                <link rel="icon" href="/favicon.ico" />
                <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@300&display=swap" rel="stylesheet" />
            </Head>
            <Layout>
                <Component {...pageProps} />
            </Layout>
        </UserProvider>
    )
}

export default MyApp
