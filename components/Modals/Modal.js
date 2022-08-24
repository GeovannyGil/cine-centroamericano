import { useRef } from 'react'
import styles from './modal.module.scss'

export default function Modal ({ children, title, root }) {
  const ref = useRef(null)

  function callback (e) {
    console.log(e.target)
    ref.current.removeEventListener('animationend', callback)
    root.unmount()
    document.querySelector('#modal').remove()
  }

  function handleClick () {
    ref.current.classList.add(styles.fadeOut)
    ref.current.addEventListener('animationend', callback, { once: true })
  }

  return (
    <div ref={ref} className={styles.cc__modalContainer}>
      <div className={styles.cc__modalView}>
        <div className={styles.cc__modalHeader}>
          <div>{title}</div>
          <div>
            <button onClick={handleClick} className={styles.cc__closeButton}>X</button>
          </div>
        </div>
        <div className={styles.cc__modalContent}>
          {children}
        </div>
      </div>
    </div>
  )
}
