import PropTypes from 'prop-types'

export const CardMain = ({ children, title, className = '' }) => {
  return (
    <div className={`cc__container-movies ${className}`}>
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
