import { useState } from 'react'
import { IoIosSearch } from 'react-icons/io'
import Search from './Search/Search'

export default function MainContent ({ children }) {
  const [IsOpenSearch, setIsOpenSearch] = useState(false)
  return (
    <>
      <Search isOpenSearch={IsOpenSearch} setOpenSearch={setIsOpenSearch} />
      <main className='cc__Main'>
        <div className='cc__main-flix'>
          <div className='cc__square-main' />
          {children}
        </div>
        <div className='cc__Search'>
          <button className='cc__btn-search' onClick={() => setIsOpenSearch(true)}><IoIosSearch /></button>
        </div>
      </main>
    </>
  )
}
