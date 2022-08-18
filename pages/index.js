// import Head from 'next/head'
import { CardMovies } from '../components/commons/CardsMovies'
import { Movie } from '../components/commons/Movie'
import Header from '../components/Header'
import MainContent from '../components/MainContent'
import Glider from 'react-glider'
import { MdOutlineArrowBackIosNew, MdOutlineArrowForwardIos } from 'react-icons/md'
import 'glider-js/glider.min.css'

export default function Home () {
  return (
    <>
      <Header />
      <MainContent>
        <div className='cc__slider-movies'>
          <img src='./sliders-2.jpg' alt='portada pelicula' />
        </div>
        <CardMovies
          title='AGREGADOS RECIENTEMENTE'
        >
          <Glider
            className='Grid3Movies'
            hasArrows
            slidesToShow={3}
            slidesToScroll={1}
            scrollLock
            draggable
            iconLeft={<MdOutlineArrowBackIosNew />}
            iconRight={<MdOutlineArrowForwardIos />}
          >
            {/* <div className='Grid3Movies'> */}
            <Movie title='CADEJO BLANCO' />
            <Movie title='CADEJO DE HOY EN LA NOCHE PERO NO ME ACUERDO SDF SDFSD SDF DSF' />
            <Movie title='MERCEDEZ' />
            <Movie title='PASANDO QUITO' />
            {/* </div> */}
          </Glider>
        </CardMovies>
      </MainContent>
    </>
  )
}
