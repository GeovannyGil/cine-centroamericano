import Modal from './Modal'

export default function ModalTrailer ({ title, root }) {
  return (
    <Modal title={title} root={root}>
      <iframe
        src='https://www.youtube.com/embed/4V7rfombLkc'
        title='YouTube video player'
        frameBorder='0'
        allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
        allowFullScreen
      />
    </Modal>
  )
}
