import {
  useEffect,
} from 'react'

import './Toast.css'

function Toast({
  message,
  onClose,
}) {
  useEffect(() => {
    if (!message) {
      return
    }

    const timer = setTimeout(() => {
      onClose()
    }, 2800)

    return () => {
      clearTimeout(timer)
    }
  }, [message, onClose])

  if (!message) {
    return null
  }

  return (
    <div
      className="toast"
      role="status"
      aria-live="polite"
    >

      <div className="toast__icon">
        ✓
      </div>

      <div className="toast__content">

        <span>
          AGREGADO AL PEDIDO
        </span>

        <strong>
          {message}
        </strong>

      </div>

      <button
        type="button"
        className="toast__close"
        onClick={onClose}
        aria-label="Cerrar notificación"
      >
        ×
      </button>

    </div>
  )
}

export default Toast