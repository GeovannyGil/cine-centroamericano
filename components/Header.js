import Head from 'next/head'
import { BiMenu, BiUser } from 'react-icons/bi'
import Link from 'next/link'

export default function Header ({ title = 'Cine Centroamericano' }) {
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name='description' content='Plataforma de cine Centroamericano' />
        <link rel='apple-touch-icon' sizes='180x180' href='./apple-touch-icon.png' />
        <link rel='icon' type='image/png' sizes='32x32' href='./favicon-32x32.png' />
        <link rel='icon' type='image/png' sizes='16x16' href='./favicon-16x16.png' />
        <link rel='manifest' href='./site.webmanifest' />
      </Head>
      <header className='cc__Header'>
        <Link href='/'>
          <a className='cc__logo-nav'>
            <img src='./logo.svg' alt='Logo Cine Centroamericano' className='cc__logo-img' />
            <h1 className='cc__logo-text'><span>CINE</span> CENTROAMERICANO</h1>
          </a>
        </Link>
        <nav>
          <BiMenu className='cc__menu' />
          <button className='cc__btn-login button-effect-a'>INICIAR SESIÓN <BiUser className='cc__btn-icon' /></button>
        </nav>
      </header>
    </>
  )
}
