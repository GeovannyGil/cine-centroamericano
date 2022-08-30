import 'slick-carousel/slick/slick-theme.css'
import 'slick-carousel/slick/slick.css'
import { MdOutlineArrowBackIosNew, MdOutlineArrowForwardIos } from 'react-icons/md'
import { useEffect, useState } from 'react'
import clsx from 'clsx'
import Layout from '../../components/Layout'
import MainContent from '../../components/MainContent'
import Slider from 'react-slick'
import { Movie } from '../../components/commons/Movie'
import { fetcher } from '../../libs/api'
import Image from 'next/image'

const CategoryCountry = ({ country, genres, movies }) => {
  const [moviesData, setMoviesData] = useState([])
  const [filter, setFilter] = useState('all_movies')
  const handleSetFilter = (filter) => {
    setFilter(filter)
  }
  useEffect(() => {
    // FORMAT DATA API MOVIES
    const data = movies.data.map((movie) => {
      return {
        id: movie.id,
        title: movie.attributes.title,
        cover: movie.attributes.cover.data.attributes.url,
        movie_uid: movie.attributes.movie_uid,
        genreds: movie.attributes.genred.data.map((g) => {
          return g.attributes.genred_uid
        })
      }
    })
    setMoviesData(data)
    console.log(data)
  }, [])
  return (
    <Layout title='Guatemala'>
      <MainContent>
        <div className='cc__portada'>
          <Image
            src={`${country.attributes.banner.data.attributes.url}`}
            alt={`Imagen del banner de películas de ${country.attributes.name}`}
            priority
            layout='fill'
            objectFit='cover'
          />
          <div className='cc__portada-country-text'>
            {
              country.attributes.title !== null
                ? country.attributes?.title
                : `Películas de ${country.attributes.name}`
            }
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
            <span className={clsx(filter === 'all_movies' && 'active')} onClick={() => handleSetFilter('all_movies')}>Todos</span>
            {genres.map((gen) =>
              <span key={gen.attributes.genred_uid} className={clsx(filter === gen.attributes.genred_uid && 'active')} onClick={() => handleSetFilter(gen.attributes.genred_uid)}>{gen.attributes.name}</span>
            )}
          </Slider>
        </div>
        <div className='cc__movies-grid-category'>
          {
            moviesData?.length === 0
              ? <h1>Cargando Peliculas</h1>
              : moviesData?.map(movie =>
                <Movie
                  key={movie.id}
                  title={movie.title}
                  imageUrl={movie.cover}
                  id={movie.id}
                  movieUid={movie.movie_uid}
                />
              )
          }
          {/* <Movie title='CADEJO BLANCO' imageUrl='./../portada_pelicula.png' /> */}
          {/* <Movie title='JOJO RABBIT' imageUrl='./../portada2.jpg' />
          <Movie title='HARRY POTER' imageUrl='./../portada3.jpg' />
          <Movie title='1917' imageUrl='./../portada4.jpg' />
          <Movie title='Aquaman' imageUrl='./../portada5.jpg' /> */}
        </div>
      </MainContent>
    </Layout>
  )
}

export async function getStaticPaths () {
  // When this is true (in preview environments) don't
  // prerender any static pages
  // (faster builds, but slower initial page load)
  // if (process.env.SKIP_BUILD_STATIC_GENERATION) {
  //   return {
  //     paths: [],
  //     fallback: 'blocking'
  //   }
  // }

  // Call an external API endpoint to get countries
  const { data: countriesResponse } = await fetcher(`${process.env.URL_API}/countries?populate=%2A`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${process.env.TOKEN_API}`
    }
  })
  const countriesData = countriesResponse.data

  // Get the paths we want to prerender based on posts
  // In production environments, prerender all pages
  // (slower builds, but faster initial page load)
  const paths = countriesData.map((country) => ({
    params: { id: country.attributes.country_uid }
  }))

  // { fallback: false } means other routes should 404
  return { paths, fallback: false }
}

export async function getStaticProps ({ params }) {
  const optionsFetchGenred = {
    method: 'GET',
    params: {
      populate: '%2A',
      'pagination[pageSize]': '100'
    },
    headers: {
      Authorization: `Bearer ${process.env.TOKEN_API}`
    }
  }
  const optionsFetchCountry = {
    method: 'GET',
    params: {
      'populate[0]': 'banner',
      'filters[country_uid][$eq]': params.id
    },
    headers: {
      Authorization: `Bearer ${process.env.TOKEN_API}`
    }
  }
  const optionsFetchMovies = {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${process.env.TOKEN_API}`
    },
    params: {
      'filters[country][country_uid][$eq]': params.id,
      'fields[0]': 'title',
      'fields[1]': 'movie_uid',
      'populate[cover][fields][0]': 'url',
      'populate[genred][fields][0]': 'genred_uid'
    }
  }
  try {
    // Get Data From API Strapi with axios with token
    const { data: countriesResponse } = await fetcher(`${process.env.URL_API}/countries`, optionsFetchCountry)
    const { data: genredResponse } = await fetcher(`${process.env.URL_API}/genreds`, optionsFetchGenred)
    const { data: moviesResponse } = await fetcher(`${process.env.URL_API}/movies`, optionsFetchMovies)
    return {
      props: {
        country: countriesResponse.data[0],
        genres: genredResponse.data,
        movies: moviesResponse
      }
    }
  } catch (error) {
    console.error(error)
    return {
      props: {
        country: {}
      }
    }
  }
}

export default CategoryCountry
