import { useRef, useState } from 'react'
import { IoIosSearch } from 'react-icons/io'
// import InfiniteScroll from 'react-infinite-scroller'
import { formatMovies, searchMovie } from '../../libs'
import { Movie } from '../commons/Movie'
import { Spinner } from '../commons/Spinners'
import styles from './Search.module.scss'

const Search = ({ isOpenSearch, setOpenSearch }) => {
  const inputSearchRef = useRef(null)
  const [moviesData, setMoviesData] = useState([])
  const [fetching, setFetching] = useState(false)
  const [nullData, setNullData] = useState(false)
  async function searchMovieUser (value) {
    if (fetching) {
      return
    }
    setFetching(true)
    setMoviesData([])
    try {
      const { movies } = await searchMovie({
        query: value,
        pageSize: 25
      })
      setNullData(false)
      if (movies.length === 0) {
        setNullData(true)
        return
      }
      const formatData = formatMovies(movies)
      setMoviesData(formatData)
    } finally {
      setFetching(false)
    }
  }

  function handleCloseSearch () {
    setOpenSearch(false)
    setNullData(false)
    setMoviesData([])
    inputSearchRef.current.value = ''
  }
  function handleSearch (e) {
    e.preventDefault()
    if (inputSearchRef.current.value === '') {
      console.log('No hay nada')
    } else {
      console.log(inputSearchRef.current.value)
      searchMovieUser(inputSearchRef.current.value)
    }
  }

  return (
    <div className={`${styles.search_container} ${isOpenSearch && styles.openSearch}`}>
      <span className={styles.btn_closeSearch} onClick={handleCloseSearch}>X</span>
      <form onSubmit={handleSearch}>
        <div className={`${styles.cc__search_container_modal}`}>
          <input placeholder='buscar película' ref={inputSearchRef} />
          <button type='submit' className={styles.btn_search}><IoIosSearch /></button>
        </div>
      </form>
      <div className={styles.movies_result_container}>
        {
          fetching && <Spinner textActive container />
        }
        {
          (nullData && !fetching) && <div className='cc__null-movies'>NO SE ENCONTRO NINGUNA PELÍCULA</div>
        }
        {
          moviesData.length !== 0 && (
            <>
              <h2>Resultados</h2>
              <div className={styles.cc__movies_grid_category}>
                {
                  moviesData?.map(movie =>
                    <Movie
                      key={movie.movie_uid}
                      title={movie.title}
                      imageUrl={movie.cover}
                      id={movie.id}
                      movieUid={movie.movie_uid}
                      gradient={false}
                    />
                  )
                }
              </div>
            </>
          )
        }
      </div>
    </div>
  )
}

export default Search
