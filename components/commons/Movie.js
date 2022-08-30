import Image from 'next/image'
import Link from 'next/link'
// import PropTypes from 'prop-types'

export const Movie = ({ id, movieUid, title, imageUrl }) => {
  return (
    // <Link href='/'>
    <div className='cc__movie'>
      <div className='cc__movie-contain-image'>
        <Image
          src={imageUrl}
          // className='cc__img-movie'
          layout='fill'
          objectPosition='center'
          objectFit='cover'
          loading='lazy'
          alt={`Poster de la película ${title}`}
        />
      </div>
      <div className='cc__contain-title-movie'>
        <p>{title}</p>
        <Link href='/movie/[id]' as={`/movie/${movieUid}`}><a className='cc__btn cc__btn-primary-color'>▶</a></Link>
      </div>
    </div>
    // </Link>
  )
}

// Movie.propTypes = {
//   title: PropTypes.string
// }
