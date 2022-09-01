import Layout from '../../components/Layout'
import MainContent from '../../components/MainContent'
import { CardMain } from '../../components/commons/CardMain'
import { openModalMovie, openModalTrailer } from '../../components/Modals/openModal'
import { fetcher } from '../../libs'
import { useEffect, useState } from 'react'
import Image from 'next/image'
import ReactMarkdown from 'react-markdown'

const Pelicula = ({ movie }) => {
  const [movieData, setMovieData] = useState({})
  console.log(movieData)
  useEffect(() => {
    setMovieData({
      id: movie.id,
      title: movie.attributes.title,
      year: movie.attributes.year,
      synopsis: movie.attributes.synopsis,
      cover: movie.attributes.cover.data.attributes.url,
      movie_uid: movie.attributes.movie_uid,
      link_movie: movie.attributes.link_movie,
      link_trailer: movie.attributes.link_trailer,
      language: movie.attributes.language,
      duration: movie.attributes.duration,
      director: movie.attributes.director,
      genreds: movie.attributes.genreds.data.map((g) => {
        return g.attributes.name
      }).join(', '),
      countries: movie.attributes.countries.data.map((g) => {
        return g.attributes.name
      }).join(', ')
    })
  }, [])
  function handleOpenModalMovie (link, title) {
    openModalMovie({ link, title })
  }
  function handleOpenModalTrailer (link, title) {
    openModalTrailer({ link, title })
  }
  return (
    <Layout>
      <MainContent>
        <div className='cc__movie-container'>
          <div className='cc__movie-portada'>
            <Image
              src={movieData.cover}
              // className='cc__img-movie'
              layout='fill'
              objectPosition='center'
              objectFit='contain'
              priority
              alt={`Poster de la película ${movieData.title}`}
            />
          </div>
          <div className='cc__movie-sinopsis'>
            <CardMain title='sinópsis'>
              <ReactMarkdown>
                {movieData.synopsis}
              </ReactMarkdown>
            </CardMain>
            <div className='cc__movie-btn-actions'>
              <button onClick={() => handleOpenModalMovie(movieData.link_movie, movieData.title)} className='cc__btn cc__btn-third-color'>▶</button>
              <button onClick={() => handleOpenModalTrailer(movieData.link_trailer, movieData.title)} className='cc__btn cc__btn-secondary-color'>ver trailer</button>
            </div>
          </div>
        </div>
        <CardMain title='información general' className='cc__movie-info'>
          <div className='cc__movie-description'>
            <div className='cc__movie-info'>
              <label>Año:</label>
              <span>{movieData.year}</span>
            </div>
            <div className='cc__movie-info'>
              <label>Duración:</label>
              <span>{movieData.duration}</span>
            </div>
            <div className='cc__movie-info'>
              <label>Director:</label>
              <span>{movieData.director}</span>
            </div>
            <div className='cc__movie-info'>
              <label>Generó:</label>
              <span>{movieData.genreds}</span>
            </div>
            <div className='cc__movie-info'>
              <label>País:</label>
              <span>{movieData.countries}</span>
            </div>
            <div className='cc__movie-info'>
              <label>Idioma:</label>
              <span>{movieData.language}</span>
            </div>
          </div>
        </CardMain>
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

  const optionsFetchMovies = {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_TOKEN_API}`
    },
    params: {
      'fields[0]': 'id',
      'fields[1]': 'movie_uid'
    }
  }

  // Call an external API endpoint to get countries
  const { data: countriesResponse } = await fetcher(`${process.env.NEXT_PUBLIC_URL_API}/movies`, optionsFetchMovies)
  const countriesData = countriesResponse.data

  // Get the paths we want to prerender based on posts
  // In production environments, prerender all pages
  // (slower builds, but faster initial page load)
  const paths = countriesData.map((country) => ({
    params: { id: country.attributes.movie_uid }
  }))

  // { fallback: false } means other routes should 404
  return { paths, fallback: false }
}

export async function getStaticProps ({ params }) {
  const optionsFetchMovies = {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_TOKEN_API}`
    },
    params: {
      'filters[movie_uid][$eq]': params.id,
      'populate[cover][fields][0]': 'url',
      'populate[genreds][fields][0]': 'genred_uid',
      'populate[genreds][fields][1]': 'name',
      'populate[countries][fields][0]': 'name',
      'populate[countries][fields][1]': 'country_uid'
    }
  }
  try {
    // Get Data From API Strapi with axios with token
    const { data: moviesResponse } = await fetcher(`${process.env.NEXT_PUBLIC_URL_API}/movies`, optionsFetchMovies)
    return {
      props: {
        movie: moviesResponse.data[0]
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

export default Pelicula
