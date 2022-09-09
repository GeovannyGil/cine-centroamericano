import Head from 'next/head'
import { BiMenu, BiUser } from 'react-icons/bi'
import Link from 'next/link'
import logoSvg from '../public/logo.svg'
import { useState } from 'react'
import Menu from './Menu/Menu'

export default function Layout ({
  children,
  title = 'Cine Centroamericano',
  descriptionOg = 'Plataforma de streaming con cine 100% centroamericano',
  typeOg = 'website',
  imageOg = './public/og_image.jpg',
  urlOg = ''
}) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta lang='es' />
        <meta name='viewport' content='initial-scale=1.0, width=device-width' />
        <meta name='description' content={descriptionOg} />
        <meta name='og:url' content={`${process.env.NEXT_PUBLIC_URL_PAGE}${urlOg}`} />
        {/* <meta name='robots' content='index, follow' /> */}
        <meta property='og:description' content={descriptionOg} />
        <meta property='og:title' content={title} />
        <meta property='og:type' content={typeOg} />
        <meta property='og:image' content={imageOg} />
        <link rel='canonical' href='https://cine-centroamericano.geovannygil.dev/' />
        <link rel='apple-touch-icon' sizes='180x180' href='./apple-touch-icon.png' />
        <link rel='icon' type='image/png' sizes='32x32' href='./favicon-32x32.png' />
        <link rel='icon' type='image/png' sizes='16x16' href='./favicon-16x16.png' />
        <link rel='manifest' href='./site.webmanifest' />
      </Head>
      <Menu isOpen={isOpen} onChange={setIsOpen} />
      <header className='cc__Header'>
        <Link href='/'>
          <a className='cc__logo-nav'>
            <img src={logoSvg.src} alt='Logo Cine Centroamericano' className='cc__logo-img' />
            <h1 className='cc__logo-text'><span>CINE</span> CENTROAMERICANO</h1>
          </a>
        </Link>
        <nav>
          <BiMenu onClick={() => setIsOpen(true)} className='cc__menu' />
          <button className='cc__btn-login button-effect-a'>INICIAR SESIÓN <BiUser className='cc__btn-icon' /></button>
        </nav>
      </header>
      {children}
      <footer className='cc__footer'>
        <div>
          <Link href='/'>
            <a className='cc__footer-logo'>
              <img src={logoSvg.src} alt='Logo Cine Centroamericano - Footer' />
              <h3 className='cc__footer-logo-text'><span>CINE</span> CENTROAMERICANO</h3>
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
