import Image from 'next/image'
import Link from 'next/link'
import Marquee from 'react-fast-marquee'
import { BiPlay } from 'react-icons/bi'
// import PropTypes from 'prop-types'

export const Movie = ({ id, movieUid, title, imageUrl, priority = false, gradient = true }) => {
  return (
    // <Link href='/'>
    <div className='cc__movie'>
      <div className='cc__movie-contain-image'>
        <Image
          src={imageUrl}
          // className='cc__img-movie'
          height={810}
          width={546}
          layout='responsive'
          objectPosition='center'
          // objectFit='cover'
          // loading='lazy'
          alt={`Poster de la película ${title}`}
          priority={priority}
        />
      </div>
      <div className='cc__contain-title-movie'>
        <Marquee
          className='marquee-text'
          gradient={gradient}
          gradientWidth={10}
          speed={30}
          delay={2}
        >
          {title}
        </Marquee>
        <Link href='/movie/[id]' as={`/movie/${movieUid}`}><a className='cc__btn-primary-color'><BiPlay /></a></Link>
      </div>
    </div>
    // </Link>
  )
}

// Movie.propTypes = {
//   title: PropTypes.string
// }
