import Link from 'next/link'
// import PropTypes from 'prop-types'

export const Movie = ({ title }) => {
  return (
    // <Link href='/'>
    <div className='cc__movie'>
      <div className='cc__movie-contain-image'>
        <img src='./portada_pelicula.png' className='cc__img-movie' />
      </div>
      <div className='cc__contain-title-movie'>
        <p>{title}</p>
        <Link href='/'><a className='cc__btn cc__btn-primary-color'>▶</a></Link>
      </div>
    </div>
    // </Link>
  )
}

// Movie.propTypes = {
//   title: PropTypes.string
// }
