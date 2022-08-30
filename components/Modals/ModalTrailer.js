import Modal from './Modal'

export default function ModalTrailer ({ link, title, root }) {
  console.log(link, title)
  return (
    <Modal title={title} root={root}>
      <iframe
        src={`https://www.youtube.com/embed/${link}`}
        title={`Trailes de la película ${title}`}
        frameBorder='0'
        allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
        allowFullScreen
      />
    </Modal>
  )
}
