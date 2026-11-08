import { useI18n } from '../i18n/useI18n'
import { useEffect, useState } from 'react'
import {
  sendOrderEmail,
} from '../services/emailService'

import { business } from '../data/business'

import './CheckoutPanel.css'

function CheckoutPanel({
  isOpen,
  cart,
  onClose,
  onBackToCart,
  onOrderSuccess,
}) {
  const { t, formatPrice, language } = useI18n()

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    orderType: 'pickup',
    address: '',
    notes: '',
  })

  const [errors, setErrors] = useState({})

  useEffect(() => {
    if (!isOpen) {
      return
    }

    document.body.style.overflow = 'hidden'

    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  const [isSending, setIsSending] =
    useState(false)

  const [submitStatus, setSubmitStatus] =
    useState({
      type: '',
      message: '',
    })



  const subtotal = cart.reduce(
    (total, item) =>
      total + item.price * item.quantity,
    0
  )

  const handleChange = (event) => {
    const {
      name,
      value,
    } = event.target

    setFormData((currentData) => ({
      ...currentData,
      [name]: value,
    }))

    setErrors((currentErrors) => ({
      ...currentErrors,
      [name]: '',
    }))
  }

  const validateForm = () => {
    const newErrors = {}

    if (formData.name.trim().length < 3) {
      newErrors.name =
        'Ingresa un nombre válido.'
    }

    const phoneDigits =
      formData.phone.replace(/\D/g, '')

    if (phoneDigits.length !== 10) {
      newErrors.phone =
        'Ingresa un número de 10 dígitos.'
    }

    if (
      formData.email &&
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
        formData.email
      )
    ) {
      newErrors.email =
        'Ingresa un correo válido.'
    }

    if (
      formData.orderType === 'delivery' &&
      formData.address.trim().length < 5
    ) {
      newErrors.address =
        'Ingresa la dirección de entrega.'
    }

    setErrors(newErrors)

    return Object.keys(newErrors).length === 0
  }

  const createWhatsAppMessage = () => {
    const productsText = cart
      .map(
        (item) =>
          `${item.quantity} x ${t(item.name)} - ` +
          `${formatPrice(
            item.price * item.quantity
          )}`
      )
      .join('\n')

    const deliveryText =
      formData.orderType === 'delivery'
        ? `${t('Domicilio')}\n${t('Dirección')}: ${formData.address}`
        : t('Recoger en la panadería')

    return `
${t('Hola, Panadería Jerusalén 👋')}

${t('Quiero realizar el siguiente pedido:')}

${productsText}

${t('Subtotal')}: ${formatPrice(subtotal)}

${t('DATOS DEL CLIENTE')}

${t('Nombre')}: ${formData.name}
${t('Teléfono')}: ${formData.phone}
${t('Tipo de pedido')}: ${deliveryText}

${t('Observaciones')}:
${formData.notes || t('Sin observaciones')}
    `.trim()
  }

  const handleSubmit = async (event) => {
    event.preventDefault()

    if (!validateForm()) {
      return
    }

    if (cart.length === 0) {
      return
    }

    setIsSending(true)

    setSubmitStatus({
      type: '',
      message: '',
    })

    try {
      await sendOrderEmail({
        customer: formData,
        cart,
        subtotal,
        language,
      })

      setSubmitStatus({
        type: 'success',
        message:
          'Pedido registrado correctamente.',
      })

      const message =
        createWhatsAppMessage()

      const whatsappUrl =
        `https://wa.me/${business.whatsapp}` +
        `?text=${encodeURIComponent(message)}`

      setTimeout(() => {
        window.open(
          whatsappUrl,
          '_blank',
          'noopener,noreferrer'
        )
        onOrderSuccess()
      }, 500)


    } catch (error) {

      console.error(
        'Error enviando pedido:',
        error
      )

      setSubmitStatus({
        type: 'error',
        message:
          'No pudimos registrar el pedido. Intenta nuevamente.',
      })

    } finally {

      setIsSending(false)

    }
  }

  return (
    <>
      <div
        className={
          isOpen
            ? 'checkout-overlay checkout-overlay--visible'
            : 'checkout-overlay'
        }
        onClick={onClose}
      />

      <aside
        className={
          isOpen
            ? 'checkout-panel checkout-panel--open'
            : 'checkout-panel'
        }
      >

        <div className="checkout-panel__header">

          <button
            type="button"
            className="checkout-panel__back"
            onClick={onBackToCart}
          >{t("← Volver")}</button>

          <button
            type="button"
            className="checkout-panel__close"
            onClick={onClose}
            aria-label={t("Cerrar checkout")}
          >{t("×")}</button>

        </div>

        <div className="checkout-panel__content">

          <div className="checkout-panel__intro">

            <span>{t("FINALIZAR PEDIDO")}</span>

            <h2>{t("Ya casi está")}<strong>{t(" listo.")}</strong>
            </h2>

            <p>{t("Completa tus datos para preparar correctamente tu pedido.")}</p>

          </div>

          <form
            className="checkout-form"
            onSubmit={handleSubmit}
          >

            <div className="checkout-form__group">

              <label htmlFor="name">{t("Nombre completo")}</label>

              <input
                id="name"
                name="name"
                type="text"
                placeholder={t("Ej. Juan Pérez")}
                value={formData.name}
                onChange={handleChange}
              />

              {errors.name && (
                <span className="checkout-form__error">
                  {t(errors.name)}
                </span>
              )}

            </div>

            <div className="checkout-form__row">

              <div className="checkout-form__group">

                <label htmlFor="phone">{t("Teléfono")}</label>

                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  placeholder={t("3001234567")}
                  value={formData.phone}
                  onChange={handleChange}
                />

                {errors.phone && (
                  <span className="checkout-form__error">
                    {t(errors.phone)}
                  </span>
                )}

              </div>

              <div className="checkout-form__group">

                <label htmlFor="email">{t("Correo")}<span>{t(" opcional")}</span>
                </label>

                <input
                  id="email"
                  name="email"
                  type="email"
                  placeholder={t("correo@email.com")}
                  value={formData.email}
                  onChange={handleChange}
                />

                {errors.email && (
                  <span className="checkout-form__error">
                    {t(errors.email)}
                  </span>
                )}

              </div>

            </div>

            <fieldset className="checkout-form__delivery">

              <legend>{t("¿Cómo quieres recibir tu pedido?")}</legend>

              <label
                className={
                  formData.orderType === 'pickup'
                    ? 'delivery-option delivery-option--active'
                    : 'delivery-option'
                }
              >

                <input
                  type="radio"
                  name="orderType"
                  value="pickup"
                  checked={
                    formData.orderType === 'pickup'
                  }
                  onChange={handleChange}
                />

                <div>
                  <strong>{t("Recoger")}</strong>

                  <span>{t("Recógelo directamente en la panadería.")}</span>
                </div>

              </label>

              <label
                className={
                  formData.orderType === 'delivery'
                    ? 'delivery-option delivery-option--active'
                    : 'delivery-option'
                }
              >

                <input
                  type="radio"
                  name="orderType"
                  value="delivery"
                  checked={
                    formData.orderType === 'delivery'
                  }
                  onChange={handleChange}
                />

                <div>
                  <strong>{t("Domicilio")}</strong>

                  <span>{t("Enviamos tu pedido hasta tu ubicación.")}</span>
                </div>

              </label>

            </fieldset>

            {formData.orderType === 'delivery' && (

              <div className="checkout-form__group">

                <label htmlFor="address">{t("Dirección")}</label>

                <input
                  id="address"
                  name="address"
                  type="text"
                  placeholder={t("Calle, carrera, barrio...")}
                  value={formData.address}
                  onChange={handleChange}
                />

                {errors.address && (
                  <span className="checkout-form__error">
                    {t(errors.address)}
                  </span>
                )}

              </div>

            )}

            <div className="checkout-form__group">

              <label htmlFor="notes">{t("Observaciones")}<span>{t(" opcional")}</span>
              </label>

              <textarea
                id="notes"
                name="notes"
                rows="4"
                placeholder={t("Ej. Sin azúcar, llamar al llegar...")}
                value={formData.notes}
                onChange={handleChange}
              />

            </div>

            <div className="checkout-summary">

              <span className="checkout-summary__label">{t("TU PEDIDO")}</span>

              <div className="checkout-summary__products">

                {cart.map((item) => (

                  <div
                    className="checkout-summary__product"
                    key={item.id}
                  >

                    <span>
                      {item.quantity}{t(" × ")}{t(item.name)}
                    </span>

                    <strong>
                      {formatPrice(
                        item.price *
                        item.quantity
                      )}
                    </strong>

                  </div>

                ))}

              </div>

              <div className="checkout-summary__total">

                <span>{t("Subtotal")}</span>

                <strong>
                  {formatPrice(subtotal)}
                </strong>

              </div>

              {formData.orderType === 'delivery' && (

                <p className="checkout-summary__delivery-note">{t("El valor del domicilio será confirmado por la panadería.")}</p>

              )}

            </div>
            {submitStatus.message && (

              <div
                className={
                  submitStatus.type === 'success'
                    ? 'checkout-status checkout-status--success'
                    : 'checkout-status checkout-status--error'
                }
              >
                {t(submitStatus.message)}
              </div>

            )}

            <button
              type="submit"
              className="checkout-form__submit"
              disabled={isSending}
            >
              {isSending
                ? t('Registrando pedido...')
                : t('Confirmar pedido')}

              {!isSending && (
                <span>→</span>
              )}
            </button>

          </form>

        </div>

      </aside>
    </>
  )
}

export default CheckoutPanel
