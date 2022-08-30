import Link from 'next/link'

const Country = ({ imgUrl, link, linkAs, country }) => {
  // Esto es temporal ya que se va alojar las imagenes en Cloudinary
  return (
    <div className='country-card'>
      <Link href='/country/[id]' as={`/country/${linkAs}`}>
        <a>
          <img src={imgUrl} alt={`Imagen del país de ${country}`} />
        </a>
      </Link>
    </div>
  )
}

export default Country
