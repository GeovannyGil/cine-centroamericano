export const Spinner = ({ container = false, text = 'Cargando', textActive = false }) => {
  if (container) {
    return (
      <div className='cc__container-spinner'>
        <div className='cc__spinner'><div /><div /><div /></div>
        {
          textActive &&
            <span className='cc__spinner-text'>{text}</span>
        }
      </div>
    )
  }
  return (
    <>
      <div className='cc__spinner'><div /><div /><div /></div>
    </>
  )
}
