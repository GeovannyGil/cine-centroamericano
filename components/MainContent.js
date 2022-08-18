import { IoIosSearch } from 'react-icons/io'

export default function MainContent ({ children }) {
  return (
    <main className='cc__Main'>
      <div className='cc__main-flix'>
        {children}
      </div>
      <div className='cc__Search'>
        <button className='cc__btn-search'><IoIosSearch /></button>
      </div>
    </main>
  )
}
