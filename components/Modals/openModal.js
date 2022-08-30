import React, { Suspense, lazy } from 'react'
import { createRoot } from 'react-dom/client'
// import { v4 as uuidv4 } from 'uuid'

export function openModalTrailer ({ link, title }) {
  const idModal = 'modal'
  const Modal = lazy(() => import('./ModalTrailer'))
  const modalDiv = document.createElement('div')
  modalDiv.id = idModal
  document.body.appendChild(modalDiv)

  const root = createRoot(modalDiv)
  root.render(
    <Suspense fallback={<div>Loading...</div>}>
      <Modal root={root} title={title} link={link} />
    </Suspense>
  )
}

export function openModalMovie ({ link, title }) {
  const idModal = 'modal'
  const Modal = lazy(() => import('./ModalMovie'))
  const modalDiv = document.createElement('div')
  modalDiv.id = idModal
  document.body.appendChild(modalDiv)

  const root = createRoot(modalDiv)
  root.render(
    <Suspense fallback={<div>Loading...</div>}>
      <Modal root={root} title={title} link={link} />
    </Suspense>
  )
}
