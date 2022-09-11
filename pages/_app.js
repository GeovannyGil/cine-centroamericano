import Script from 'next/script'
import '../styles/globals.scss'

function MyApp ({ Component, pageProps }) {
  return (
    <>
      <Script strategy='afterInteractive' src='https://www.googletagmanager.com/gtag/js?id=G-6KVXTN4YHC' />
      <Script id='google-analytics' strategy='afterInteractive'>
        {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-6KVXTN4YHC');
        `}
      </Script>
      <Component {...pageProps} />
    </>
  )
}

export default MyApp
