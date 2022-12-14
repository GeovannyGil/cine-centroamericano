import Modal from './Modal'

export default function ModalTrailer ({ link, title, root }) {
  function youtubeParser (url) {
    const regExp = /^.*(youtu.be\/|v\/|embed\/|watch\?|youtube.com\/user\/[^#]*#([^/]*?\/)*)\??v?=?([^#&?]*).*/
    const match = url.match(regExp)
    // if (match && match[7].length === 11) {
    return match[3]
    // } else {
    // return 'AXPASVeX74o'
    // }
  }

  return (
    <Modal title='' root={root}>
      <iframe
        src={`https://www.youtube.com/embed/${youtubeParser(link)}`}
        title={`Trailes de la película ${title}`}
        frameBorder='0'
        allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
        allowFullScreen
      />
    </Modal>
  )
}
