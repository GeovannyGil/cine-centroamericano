import 'slick-carousel/slick/slick-theme.css'
import 'slick-carousel/slick/slick.css'
import { MdOutlineArrowBackIosNew, MdOutlineArrowForwardIos } from 'react-icons/md'
import { useCallback, useEffect, useState } from 'react'
import clsx from 'clsx'
import Layout from '../../components/Layout'
import MainContent from '../../components/MainContent'
import Slider from 'react-slick'
import { Movie } from '../../components/commons/Movie'
import { fetcher, fetchMoreMovies, formatMovies } from '../../libs'
import Image from 'next/image'
import InfiniteScroll from 'react-infinite-scroller'
import { Spinner } from '../../components/commons/Spinners'
import { useRouter } from 'next/router'
import { parse as parseUrl } from 'query-string'
// ESTO LO VOY A UTILIZAR PARA PODER EVITAR CARGA DE COMPONENTES QUE NO SE VEN
// INTERSECTION OBSERVER
// const LazyMovies = () => {
//   const [show, setShow] = useState(false)
//   useEffect(() => {
//     const onChange = (entries) => {
//       console.log(entries)
//       const el = entries[0]
//     }
//     const observer = new IntersectionObserver(onChange, {
//       rootMargin: '100px'
//     })

//     observer.observe(document.getElementById('LazyMovies'))
//   })

//   return (
//     <div id='LazyMovies'>
//       {show ? 'Hola' : null}
//     </div>
//   )
// }

const CategoryCountry = ({ country, genres }) => {
  const router = useRouter()
  const [filter, setFilter] = useState('all_movies')
  const handleSetFilter = (filter) => {
    setFilter(filter)
    router.push({
      pathname: `/country/${router.query.id}`,
      query: { filter }
    }, undefined, { shallow: true })
  }
  const [moviesData, setMoviesData] = useState([])
  const [page, setPage] = useState(1)
  const [pageLimit, setPageLimit] = useState(true)
  const [fetching, setFetching] = useState(false)
  const GetMoreMovies = useCallback(
    async () => {
      if (fetching) {
        return
      }
      if (!pageLimit) {
        return
      }
      setFetching(true)
      try {
        const { movies, pagination } = await fetchMoreMovies({
          country: country.attributes.event_uid,
          genred: filter !== 'all_movies' ? filter : '',
          page,
          pageSize: 12
        })
        const formatData = formatMovies(movies)
        setMoviesData([...moviesData, ...formatData])
        // setMoviesFilter([...moviesFilter, ...formatData])
        if (page === 1) {
          setPage(2)
        } else {
          setPage(page => page + 1)
        }
        setPageLimit(page < pagination.pageCount)
      } finally {
        setFetching(false)
      }
    },
    [moviesData, fetching, pageLimit]
  )

  useEffect(() => {
    const querysUrl = parseUrl(router.asPath.split(/\?/)[1])
    if (querysUrl?.filter) {
      setFilter(querysUrl.filter)
    }
  }, [])

  useEffect(() => {
    setMoviesData([])
    setPage(1)
    setPageLimit(true)
  }, [filter])

  return (
    <Layout
      title={`${country.attributes.name} | Cine Centroamericano`}
      descriptionOg={`Secci??n de peliculas solo de ${country.attributes.name}`}
      typeOg='section.country'
      imageOg={country.attributes.banner.data.attributes.url}
      urlOg={`/movie/${country.attributes.event_uid}`}
    >
      <MainContent>
        <div className='cc__portada'>
          <Image
            src={`${country.attributes.banner.data.attributes.url}`}
            alt={`Imagen del banner de pel??culas de ${country.attributes.name}`}
            priority
            width={1200}
            height={400}
            layout='responsive'
            // objectFit='cover'
          />
          <div className='cc__portada-country-text'>
            {
              country.attributes.title !== null
                ? country.attributes?.title
                : `Pel??culas de ${country.attributes.name}`
            }
          </div>
        </div>
        <div className='cc__movies-categories'>
          <Slider
            className='cc__movies-categories-slider'
            slidesToShow={5}
            slidesToScroll={1}
            arrows
            nextArrow={<MdOutlineArrowForwardIos />}
            prevArrow={<MdOutlineArrowBackIosNew />}
            infinite={genres.length > 5}
            responsive={
              [
                {
                  breakpoint: 600,
                  settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1,
                    infinite: genres.length > 3
                    // dots: true,
                    // arrows: false
                  }
                }
              ]
            }
          >
            <span className={clsx(filter === 'all_movies' && 'active')} onClick={() => handleSetFilter('all_movies')}>Todos</span>
            {genres.map((gen) =>
              <span key={gen.attributes.genred_uid} className={clsx(filter === gen.attributes.genred_uid && 'active')} onClick={() => handleSetFilter(gen.attributes.genred_uid)}>{gen.attributes.name}</span>
            )}
          </Slider>
        </div>
        <InfiniteScroll
          pageStart={1}
          loadMore={GetMoreMovies}
          hasMore={pageLimit}
          loader={<Spinner container textActive />}
        >
          {
            moviesData.length !== 0 && (
              <div className='cc__movies-grid-category'>
                {
                  moviesData?.map(movie =>
                    <Movie
                      key={movie.id}
                      title={movie.title}
                      imageUrl={movie.cover}
                      id={movie.id}
                      movieUid={movie.movie_uid}
                    />
                  )
                }
              </div>
            )
          }
        </InfiniteScroll>
        {
          (moviesData.length === 0 && fetching === false) &&
            <div className='cc__null-movies'>NO SE ENCONTRO NINGUNA PEL??CULA</div>
        }
      </MainContent>
    </Layout>
  )
}

export async function getServerSideProps ({ params }) {
  const optionsFetchGenred = {
    method: 'GET',
    params: {
      populate: '%2A',
      'pagination[pageSize]': '100'
    },
    headers: {
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_TOKEN_API}`
    }
  }
  const optionsFetchCountry = {
    method: 'GET',
    params: {
      'populate[0]': 'banner',
      'filters[event_uid][$eq]': params.id
    },
    headers: {
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_TOKEN_API}`
    }
  }
  try {
    // Get Data From API Strapi with axios with token
    const { data: countriesResponse } = await fetcher(`${process.env.NEXT_PUBLIC_URL_API}/countries`, optionsFetchCountry)
    const { data: genredResponse } = await fetcher(`${process.env.NEXT_PUBLIC_URL_API}/genreds`, optionsFetchGenred)
    // const { data: moviesResponse } = await fetcher(`${process.env.NEXT_PUBLIC_URL_API}/movies`, optionsFetchMovies)
    return {
      props: {
        country: countriesResponse.data[0],
        genres: genredResponse.data
        // movies: moviesResponse
      }
    }
  } catch (error) {
    console.error(error)
    return {
      props: {
        country: {},
        genres: {}
      }
    }
  }
}

export default CategoryCountry
