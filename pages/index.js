// import Head from 'next/head'
import { CardMain } from '../components/commons/CardMain'
import { Movie } from '../components/commons/Movie'
import Layout from '../components/Layout'
import MainContent from '../components/MainContent'
import { MdOutlineArrowBackIosNew, MdOutlineArrowForwardIos } from 'react-icons/md'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import Country from '../components/commons/Country'

export default function Home () {
  return (
    <Layout>
      <MainContent>
        <div className='cc__slider-movies'>
          <img src='./sliders-2.jpg' alt='portada pelicula' />
        </div>
        <CardMain
          title='AGREGADOS RECIENTEMENTE'
        >
          <div className='container-movies'>
            <Slider
              slidesToShow={3}
              slidesToScroll={1}
              arrows
              nextArrow={<MdOutlineArrowForwardIos />}
              prevArrow={<MdOutlineArrowBackIosNew />}
            >
              {/* <div className='Grid4Movies'> */}
              <Movie title='CADEJO BLANCO' imageUrl='./portada_pelicula.png' />
              <Movie title='JOJO RABBIT' imageUrl='./portada2.jpg' />
              <Movie title='HARRY POTER' imageUrl='./portada3.jpg' />
              <Movie title='1917' imageUrl='./portada4.jpg' />
              <Movie title='Aquaman' imageUrl='./portada5.jpg' />
              {/* </div> */}
            </Slider>
          </div>
        </CardMain>
        <CardMain
          title='!Mira libre ahora¡'
        >
          <div className='container-movies'>
            <Slider
              className='slider-movies-grid-4'
              slidesToShow={4}
              slidesToScroll={1}
              arrows
              nextArrow={<MdOutlineArrowForwardIos />}
              prevArrow={<MdOutlineArrowBackIosNew />}
            >
              {/* <div className='Grid4Movies'> */}
              <Movie title='CADEJO BLANCO' imageUrl='./portada_pelicula.png' />
              <Movie title='JOJO RABBIT' imageUrl='./portada2.jpg' />
              <Movie title='HARRY POTER' imageUrl='./portada3.jpg' />
              <Movie title='1917' imageUrl='./portada4.jpg' />
              <Movie title='Aquaman' imageUrl='./portada5.jpg' />
              {/* </div> */}
            </Slider>
          </div>
        </CardMain>
        <CardMain
          title='VIVE EL CINE CENTROAMERICANO'
        >
          <div className='container-movies'>
            <Slider
              slidesToShow={7}
              slidesToScroll={1}
              infinite={false}
              responsive={[
                {
                  breakpoint: 1280,
                  settings: {
                    slidesToShow: 4,
                    slidesToScroll: 1
                  }
                }
              ]}
              arrows
              nextArrow={<MdOutlineArrowForwardIos />}
              prevArrow={<MdOutlineArrowBackIosNew />}
            >
              <Country link='/country/guatemala' imgUrl='./paises/guatemala.png' />
              <Country link='/country/elsalvador' imgUrl='./paises/el-salvador.png' />
              <Country link='/country/honduras' imgUrl='./paises/honduras.png' />
              <Country link='/country/nicaragua' imgUrl='./paises/nicaragua.png' />
              <Country link='/country/costa-rica' imgUrl='./paises/costa-rica.png' />
              <Country link='/country/panama' imgUrl='./paises/panama.png' />
            </Slider>
          </div>
        </CardMain>
        <CardMain
          title='¡MIRA LIBRE AHORA!'
        >
          <div className='container-movies'>
            <Slider
              className='slider-movies-grid-4'
              slidesToShow={4}
              slidesToScroll={1}
              arrows
              nextArrow={<MdOutlineArrowForwardIos />}
              prevArrow={<MdOutlineArrowBackIosNew />}
            >
              {/* <div className='Grid4Movies'> */}
              <Movie title='CADEJO BLANCO' imageUrl='./portada_pelicula.png' />
              <Movie title='JOJO RABBIT' imageUrl='./portada2.jpg' />
              <Movie title='HARRY POTER' imageUrl='./portada3.jpg' />
              <Movie title='1917' imageUrl='./portada4.jpg' />
              <Movie title='Aquaman' imageUrl='./portada5.jpg' />
              {/* </div> */}
            </Slider>
          </div>
        </CardMain>
      </MainContent>
    </Layout>
  )
}
