import { useI18n } from '../i18n/useI18n'
import {
  useEffect,
} from 'react'

import './Toast.css'

function Toast({
  message,
  onClose,
}) {
  const { t } = useI18n()

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

        <span>{t("AGREGADO AL PEDIDO")}</span>

        <strong>
          {t(message)}
        </strong>

      </div>

      <button
        type="button"
        className="toast__close"
        onClick={onClose}
        aria-label={t("Cerrar notificación")}
      >{t("×")}</button>

    </div>
  )
}

export default Toast
