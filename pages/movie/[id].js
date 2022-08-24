import Layout from '../../components/Layout'
import MainContent from '../../components/MainContent'
import { CardMain } from '../../components/commons/CardMain'
import { openModalMovie, openModalTrailer } from '../../components/Modals/openModal'

const Pelicula = () => {
  function handleOpenModalMovie () {
    openModalMovie()
  }

  function handleOpenModalTrailer () {
    openModalTrailer()
  }

  return (
    <Layout>
      <MainContent>
        <div className='cc__movie-container'>
          <div className='cc__movie-portada'>
            <img src='../../portada_pelicula.png' />
          </div>
          <div className='cc__movie-sinopsis'>
            <CardMain title='sinópsis'>
              <p>
                Alma y sus hijos fueron asesinados en el conflicto armado de Guatemala. Treinta años después, se abre una causa penal contra Enrique Monteverde, un general retirado que estuvo al frente del genocidio.  Entonces, el espíritu de "La Llorona" se libera para vagar por el mundo como un alma perdida entre los vivos. Por las noches, el ex-militar comienza a escucharla llorar.
              </p>
            </CardMain>
            <div className='cc__movie-btn-actions'>
              <button onClick={handleOpenModalMovie} className='cc__btn cc__btn-third-color'>▶</button>
              <button onClick={handleOpenModalTrailer} className='cc__btn cc__btn-secondary-color'>ver trailer</button>
            </div>
          </div>
        </div>
        <CardMain title='información general' className='cc__movie-info'>
          <div className='cc__movie-description'>
            <div className='cc__movie-info'>
              <label>Año:</label>
              <span>2019</span>
            </div>
            <div className='cc__movie-info'>
              <label>Duración:</label>
              <span>1 hora</span>
            </div>
            <div className='cc__movie-info'>
              <label>Director:</label>
              <span>Jayro Bustamante</span>
            </div>
            <div className='cc__movie-info'>
              <label>Generó:</label>
              <span>Terror</span>
            </div>
            <div className='cc__movie-info'>
              <label>País:</label>
              <span>Guatemala</span>
            </div>
            <div className='cc__movie-info'>
              <label>Idioma:</label>
              <span>Español</span>
            </div>
          </div>
        </CardMain>
      </MainContent>
    </Layout>
  )
}

export default Pelicula
