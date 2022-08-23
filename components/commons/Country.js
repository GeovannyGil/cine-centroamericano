import Link from 'next/link'

const Country = ({ imgUrl }) => {
  return (
    <div className='country-card'>
      <Link href='/'>
        <a>
          <img src={imgUrl} alt='country' />
        </a>
      </Link>
    </div>
  )
}

export default Country
