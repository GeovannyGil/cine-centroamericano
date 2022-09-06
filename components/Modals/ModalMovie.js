import Modal from './Modal'
import Vimeo from '@u-wave/react-vimeo'
import styled from './modal.module.scss'

export default function ModalTrailer ({ link, title, root }) {
  const vimeoReg = /(videos|video|channels|\.com)\/([\d]+)/
  function vimeoID (url) {
    const match = url.match(vimeoReg)
    return match[2]
  }
  return (
    <Modal title='' root={root}>
      <Vimeo
        video={vimeoID(link)}
        autoplay
        className={styled.cc__movieModalVideo}
        responsive
        showTitle={title}
        // volume={volume}
        // paused={paused}
        // onPause={this.handlePlayerPause}
        // onPlay={this.handlePlayerPlay}
      />
    </Modal>
  )
}
