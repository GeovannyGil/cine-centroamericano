import Modal from './Modal'
import Vimeo from '@u-wave/react-vimeo'
import styled from './modal.module.scss'

export default function ModalTrailer ({ title, titleMovie = 'Test de Movie', root }) {
  return (
    <Modal title={title} root={root}>
      <Vimeo
        video='386411745'
        autoplay
        className={styled.cc__movieModalVideo}
        responsive
        // volume={volume}
        // paused={paused}
        // onPause={this.handlePlayerPause}
        // onPlay={this.handlePlayerPlay}
      />
      {/* <iframe
        src='https://player.vimeo.com/video/597590009?h=a4f317475c&amp;badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479'
        frameBorder='0'
        allow='
        autoplay;
        fullscreen;
        picture-in-picture'
        allowFullScreen
        title='titleMovie'
      /> */}
      {/* <script src='https://player.vimeo.com/api/player.js' /> */}
    </Modal>
  )
}
