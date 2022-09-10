import Link from 'next/link'
import { useEffect, useState } from 'react'
import styles from './Menu.module.scss'
import { fetcher } from '../../libs'
const Menu = ({ isOpen, onChange }) => {
  const [countries, setCountries] = useState([])
  const fetchCountries = async (options) => {
    const { data: countriesResponse } = await fetcher(`${process.env.NEXT_PUBLIC_URL_API}/countries`, options)
    return countriesResponse
  }
  useEffect(() => {
    // Fetch countries
    const optionsCountriMovies = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_TOKEN_API}`
      },
      params: {
        'fields[0]': 'name',
        'fields[1]': 'title',
        'fields[2]': 'event_uid'
      }
    }
    fetchCountries(optionsCountriMovies).then((countries) => {
      setCountries(countries.data)
    })
  }, [])
  return (
    <nav className={`${styles.menu} ${isOpen && styles.openMenu}`}>
      <span className={styles.btn_closeMenu} onClick={() => onChange(false)}>X</span>
      <ul className={styles.menuList}>
        <li><Link href='/'><a onClick={() => onChange(false)}>Inicio</a></Link></li>
        {
          countries.length > 0 &&
            (
              <li className={styles.desplegable}>
                <input type='checkbox' name='list' id='nivel1-1' />
                <label htmlFor='nivel1-1'>Eventos</label>
                <ul className={styles.interior}>
                  {
                    countries.map((country) =>
                      <li key={country.attributes.event_uid}><Link href={`/country/${country.attributes.event_uid}`}><a onClick={() => onChange(false)}>{country.attributes.title || country.attributes.name}</a></Link></li>
                    )
                  }
                </ul>
              </li>
            )
          }
      </ul>

    </nav>
  )
}

export default Menu
