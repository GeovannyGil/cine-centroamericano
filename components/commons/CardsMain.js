import PropTypes from 'prop-types'

export const CardMain = ({ children, title }) => {
  return (
    <div className='cc__container-movies'>
      <div className='cc__container-movies-head'>
        <h2>{title}</h2>
      </div>
      <div className='cc__container-movies-main'>
        {children}
      </div>
    </div>
  )
}

CardMain.propTypes = {
  title: PropTypes.string
}
