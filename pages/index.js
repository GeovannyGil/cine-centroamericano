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
// import axios from 'axios'
// eslint-disable-next-line no-unused-vars
import { fetcher, fetchMoreMovies, formatMovies, formatOnlyMovies } from '../libs'
import { useCallback, useEffect, useState } from 'react'
import { Spinner } from '../components/commons/Spinners'
import InfiniteScroll from 'react-infinite-scroller'
// import Image from 'next/image'

export default function Home ({ countries, movies, sliders }) {
  const moviesData = formatOnlyMovies(movies.data)
  // const [moviesByCountries] = useState([])
  const [moviesByCountries, setMoviesByCountries] = useState([])
  const [lengthCountries, setLengthCountries] = useState(1)
  const [lengthLimit, setLengthLimit] = useState(true)
  const [fetching, setFetching] = useState(false)

  const GetMoreMoviesByCountries = useCallback(
    async () => {
      if (fetching) {
        return
      }
      if (!lengthLimit) {
        return
      }
      setFetching(true)
      try {
        const { movies } = await fetchMoreMovies({
          country: countries[lengthCountries - 1].uid,
          pageSize: 10
        })
        const data = {
          country: countries[lengthCountries - 1],
          movies: formatMovies(movies)
        }
        setMoviesByCountries([...moviesByCountries, data])
        setLengthCountries(lengthCountries => lengthCountries + 1)
        setLengthLimit(!(lengthCountries === countries.length))
      } finally {
        setFetching(false)
      }
    },
    [moviesByCountries, fetching, lengthLimit]
  )

  useEffect(() => {
    if (countries.length === 0) {
      setLengthLimit(false)
    }
  }, [])

  return (
    <Layout>
      <MainContent>
        <div className='cc__slider-movies'>
          <Slider
            draggable
            className='cc__slider-home-content'
            slidesToShow={1}
            slidesToScroll={1}
            infinite={sliders.length > 1}
            dots
            swipeToSlide
            arrows={false}
            autoplay
            autoplaySpeed={6000}
            adaptiveHeight
            fade
            pauseOnHover
            responsive={
              [
                {
                  breakpoint: 992,
                  settings: {
                    dots: false
                  }
                }
              ]
            }
          >
            {
              sliders.map(slider => (
                <img src={slider.attributes.image.data.attributes.url} loading='lazy' alt={slider.attributes.title || `Slider No.${slider.id}`} key={slider.id} />
              ))
            }
          </Slider>
        </div>
        <CardMain
          title='AGREGADOS RECIENTEMENTE'
        >
          <div className='container-movies'>
            <Slider
              slidesToShow={3}
              slidesToScroll={1}
              arrows
              draggable
              swipeToSlide
              infinite={movies.length > 3}
              nextArrow={<MdOutlineArrowForwardIos />}
              prevArrow={<MdOutlineArrowBackIosNew />}
              responsive={
                [
                  {
                    breakpoint: 600,
                    settings: {
                      dots: true,
                      arrows: false
                    }
                  }
                ]
              }
            >
              {
                moviesData.map(movie =>
                  <Movie
                    key={movie.id}
                    title={movie.title}
                    imageUrl={movie.cover}
                    id={movie.id}
                    movieUid={movie.movie_uid}
                    priority
                  />
                )
              }
            </Slider>
          </div>
        </CardMain>
        <InfiniteScroll
          key='InfiniteScrollMovies'
          pageStart={1}
          loadMore={GetMoreMoviesByCountries}
          hasMore={lengthLimit}
          loader={<Spinner container textActive />}
        >
          {
            moviesByCountries.map(movieBycountry => {
              if (movieBycountry.movies.length !== 0) {
                return (
                  <CardMain
                    title={`Películas de ${movieBycountry.country.name}`}
                    key={`${movieBycountry.country.uid}-slider`}
                  >
                    <div className='container-movies'>
                      <Slider
                        className='slider-movies-grid-4'
                        slidesToShow={4}
                        infinite={movieBycountry.movies.length > 4}
                        swipeToSlide
                        slidesToScroll={1}
                        arrows
                        draggable
                        nextArrow={<MdOutlineArrowForwardIos />}
                        prevArrow={<MdOutlineArrowBackIosNew />}
                        responsive={
                          [
                            {
                              breakpoint: 500,
                              settings: {
                                slidesToShow: 3,
                                slidesToScroll: 1,
                                infinite: movieBycountry.movies.length > 3,
                                dots: true,
                                arrows: false
                              }
                            }
                          ]
                        }
                      >
                        {
                          movieBycountry.movies.map(movie =>
                            <Movie
                              key={movie.id}
                              title={movie.title}
                              imageUrl={movie.cover}
                              id={movie.id}
                              movieUid={movie.movie_uid}
                              priority
                            />)
                        }
                      </Slider>
                    </div>
                  </CardMain>
                )
              }
              return true
            })
          }
        </InfiniteScroll>

        <CardMain
          title='VIVE EL CINE CENTROAMERICANO'
        >
          <div className='container-movies'>
            <Slider
              slidesToShow={6}
              draggable
              swipeToSlide
              slidesToScroll={1}
              infinite={countries.length > 6}
              responsive={
                [
                  {
                    breakpoint: 768,
                    settings: {
                      slidesToShow: 4,
                      slidesToScroll: 1,
                      infinite: countries.length > 4,
                      dots: true,
                      arrows: false
                    }
                  },
                  {
                    breakpoint: 600,
                    settings: {
                      slidesToShow: 3,
                      slidesToScroll: 1,
                      infinite: countries.length > 3,
                      dots: true,
                      arrows: false
                    }
                  }
                ]
              }
              arrows
              nextArrow={<MdOutlineArrowForwardIos />}
              prevArrow={<MdOutlineArrowBackIosNew />}
            >
              {
                countries.map(country => (
                  <Country
                    key={country.id}
                    imgUrl={`${country.image}`}
                    country={country.name}
                    link={country.id}
                    linkAs={country.uid}
                  />
                ))
              }
            </Slider>
          </div>
        </CardMain>
      </MainContent>
    </Layout>
  )
}

export async function getServerSideProps (context) {
  try {
    const optionsSliders = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_TOKEN_API}`
      },
      params: {
        'fields[1]': 'title',
        'fields[2]': 'description',
        'populate[image][fields][0]': 'url'
      }
    }
    const optionsCountriMovies = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_TOKEN_API}`
      },
      params: {
        'fields[0]': 'name',
        'fields[1]': 'title',
        'fields[2]': 'country_uid',
        'populate[image][fields][0]': 'url'
      }
    }
    const optionsFetchMovies = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_TOKEN_API}`
      },
      params: {
        'fields[0]': 'title',
        'fields[1]': 'movie_uid',
        'populate[cover][fields][0]': 'url',
        'pagination[page]': 1,
        'pagination[pageSize]': 10,
        'sort[0]​': 'createdAt:desc'
      }
    }

    const { data: slidersResponse } = await fetcher(`${process.env.NEXT_PUBLIC_URL_API}/sliders`, optionsSliders)
    const { data: countriesResponse } = await fetcher(`${process.env.NEXT_PUBLIC_URL_API}/countries`, optionsCountriMovies)
    const formatCountrie = countriesResponse.data.map(country => {
      return {
        id: country.id,
        name: country.attributes.name,
        title: country.attributes.title,
        uid: country.attributes.country_uid,
        image: country.attributes.image.data.attributes.url
      }
    })
    const { data: moviesResponse } = await fetcher(`${process.env.NEXT_PUBLIC_URL_API}/movies`, optionsFetchMovies)

    return {
      props: {
        sliders: slidersResponse.data,
        countries: formatCountrie,
        movies: moviesResponse
      }
    }
  } catch (error) {
    console.error(error)
    return {
      props: {
        countries: {}
      }
    }
  }
}
