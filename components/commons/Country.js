import Link from 'next/link'

const Country = ({ imgUrl, link = '/' }) => {
  return (
    <div className='country-card'>
      <Link href={link}>
        <a>
          <img src={imgUrl} alt='country' />
        </a>
      </Link>
    </div>
  )
}

export default Country
