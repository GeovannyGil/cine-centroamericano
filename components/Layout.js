import Head from 'next/head'
import { BiMenu, BiUser } from 'react-icons/bi'
import Link from 'next/link'
import logoSvg from '../public/logo.svg'

export default function Layout ({ children, title = 'Cine Centroamericano' }) {
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name='viewport' content='initial-scale=1.0, width=device-width' />
        <meta property='og:title' content={title} />
        <meta property='og:type' content='website' />
        <meta property='og:url' content='https://cinecentroamericano.com' />
        <meta property='og:image' content='blob:https://vercel.com/9a5ce8cf-96da-4867-bc2d-920dc0af67d5' />
        <meta name='description' content='Plataforma de Peliculas de Cine Centroamericano' />
        <link rel='apple-touch-icon' sizes='180x180' href='./apple-touch-icon.png' />
        <link rel='icon' type='image/png' sizes='32x32' href='./favicon-32x32.png' />
        <link rel='icon' type='image/png' sizes='16x16' href='./favicon-16x16.png' />
        <link rel='manifest' href='./site.webmanifest' />
      </Head>
      <header className='cc__Header'>
        <Link href='/'>
          <a className='cc__logo-nav'>
            <img src={logoSvg.src} alt='Logo Cine Centroamericano' className='cc__logo-img' />
            <h1 className='cc__logo-text'><span>CINE</span> CENTROAMERICANO</h1>
          </a>
        </Link>
        <nav>
          <BiMenu className='cc__menu' />
          <button className='cc__btn-login button-effect-a'>INICIAR SESIÓN <BiUser className='cc__btn-icon' /></button>
        </nav>
      </header>
      {children}
      <footer className='cc__footer'>
        <div>
          <Link href='/'>
            <a className='cc__footer-logo'>
              <img src={logoSvg.src} alt='Logo Cine Centroamericano' />
              <h1><span>CINE</span> CENTROAMERICANO</h1>
            </a>
          </Link>
        </div>
        <div className='cc__footer-info'>
          <span>Todos los derechos reservados</span>
          <span>© Cine Centroamericano 2022</span>
          <span>Aviso legal y políticas de la plataforma</span>
        </div>
      </footer>
    </>
  )
}
