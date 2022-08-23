import 'slick-carousel/slick/slick-theme.css'
import 'slick-carousel/slick/slick.css'
import { MdOutlineArrowBackIosNew, MdOutlineArrowForwardIos } from 'react-icons/md'
import { useState } from 'react'
import clsx from 'clsx'
import Layout from '../../components/Layout'
import MainContent from '../../components/MainContent'
import portada from '../../public/portada.jpg'
import Slider from 'react-slick'
import { Movie } from '../../components/commons/Movie'

const filters = [
  'todos',
  'clasico',
  'documental',
  'infantil',
  'musical',
  'terror'
]

const CategoryCountry = () => {
  const [filter, setFilter] = useState('todos')
  const handleSetFilter = (filter) => {
    setFilter(filter)
  }
  return (
    <Layout title='Guatemala'>
      <MainContent>
        <div className='cc__portada'>
          <img src={portada.src} alt='Guatemala' />
          <div className='cc__portada-country-text'>
            PELÍCULAS GUATEMALTECAS
          </div>
        </div>
        <div className='cc__movies-categories'>
          <Slider
            className='cc__movies-categories-slider'
            infinite={false}
            slidesToShow={5}
            slidesToScroll={1}
            arrows
            nextArrow={<MdOutlineArrowForwardIos />}
            prevArrow={<MdOutlineArrowBackIosNew />}
          >
            {filters.map((fil) =>
              <span key={fil} className={clsx(filter === fil && 'active')} onClick={() => handleSetFilter(fil)}>{fil}</span>
            )}
          </Slider>
        </div>
        <div className='cc__movies-grid-category'>
          <Movie title='CADEJO BLANCO' imageUrl='./../portada_pelicula.png' />
          <Movie title='JOJO RABBIT' imageUrl='./../portada2.jpg' />
          <Movie title='HARRY POTER' imageUrl='./../portada3.jpg' />
          <Movie title='1917' imageUrl='./../portada4.jpg' />
          <Movie title='Aquaman' imageUrl='./../portada5.jpg' />
        </div>
      </MainContent>
    </Layout>
  )
}

export default CategoryCountry
