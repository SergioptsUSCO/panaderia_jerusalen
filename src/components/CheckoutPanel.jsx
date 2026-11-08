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

  const formatPrice = (price) => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      maximumFractionDigits: 0,
    }).format(price)
  }

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
          `${item.quantity} x ${item.name} - ` +
          `${formatPrice(
            item.price * item.quantity
          )}`
      )
      .join('\n')

    const deliveryText =
      formData.orderType === 'delivery'
        ? `Domicilio\nDirección: ${formData.address}`
        : 'Recoger en la panadería'

    return `
Hola, Panadería Jerusalén 👋

Quiero realizar el siguiente pedido:

${productsText}

Subtotal: ${formatPrice(subtotal)}

DATOS DEL CLIENTE

Nombre: ${formData.name}
Teléfono: ${formData.phone}
Tipo de pedido: ${deliveryText}

Observaciones:
${formData.notes || 'Sin observaciones'}
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
          >
            ← Volver
          </button>

          <button
            type="button"
            className="checkout-panel__close"
            onClick={onClose}
            aria-label="Cerrar checkout"
          >
            ×
          </button>

        </div>

        <div className="checkout-panel__content">

          <div className="checkout-panel__intro">

            <span>
              FINALIZAR PEDIDO
            </span>

            <h2>
              Ya casi está
              <strong> listo.</strong>
            </h2>

            <p>
              Completa tus datos para preparar
              correctamente tu pedido.
            </p>

          </div>

          <form
            className="checkout-form"
            onSubmit={handleSubmit}
          >

            <div className="checkout-form__group">

              <label htmlFor="name">
                Nombre completo
              </label>

              <input
                id="name"
                name="name"
                type="text"
                placeholder="Ej. Juan Pérez"
                value={formData.name}
                onChange={handleChange}
              />

              {errors.name && (
                <span className="checkout-form__error">
                  {errors.name}
                </span>
              )}

            </div>

            <div className="checkout-form__row">

              <div className="checkout-form__group">

                <label htmlFor="phone">
                  Teléfono
                </label>

                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  placeholder="3001234567"
                  value={formData.phone}
                  onChange={handleChange}
                />

                {errors.phone && (
                  <span className="checkout-form__error">
                    {errors.phone}
                  </span>
                )}

              </div>

              <div className="checkout-form__group">

                <label htmlFor="email">
                  Correo
                  <span> opcional</span>
                </label>

                <input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="correo@email.com"
                  value={formData.email}
                  onChange={handleChange}
                />

                {errors.email && (
                  <span className="checkout-form__error">
                    {errors.email}
                  </span>
                )}

              </div>

            </div>

            <fieldset className="checkout-form__delivery">

              <legend>
                ¿Cómo quieres recibir tu pedido?
              </legend>

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
                  <strong>
                    Recoger
                  </strong>

                  <span>
                    Recógelo directamente
                    en la panadería.
                  </span>
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
                  <strong>
                    Domicilio
                  </strong>

                  <span>
                    Enviamos tu pedido
                    hasta tu ubicación.
                  </span>
                </div>

              </label>

            </fieldset>

            {formData.orderType === 'delivery' && (

              <div className="checkout-form__group">

                <label htmlFor="address">
                  Dirección
                </label>

                <input
                  id="address"
                  name="address"
                  type="text"
                  placeholder="Calle, carrera, barrio..."
                  value={formData.address}
                  onChange={handleChange}
                />

                {errors.address && (
                  <span className="checkout-form__error">
                    {errors.address}
                  </span>
                )}

              </div>

            )}

            <div className="checkout-form__group">

              <label htmlFor="notes">
                Observaciones
                <span> opcional</span>
              </label>

              <textarea
                id="notes"
                name="notes"
                rows="4"
                placeholder="Ej. Sin azúcar, llamar al llegar..."
                value={formData.notes}
                onChange={handleChange}
              />

            </div>

            <div className="checkout-summary">

              <span className="checkout-summary__label">
                TU PEDIDO
              </span>

              <div className="checkout-summary__products">

                {cart.map((item) => (

                  <div
                    className="checkout-summary__product"
                    key={item.id}
                  >

                    <span>
                      {item.quantity} × {item.name}
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

                <span>
                  Subtotal
                </span>

                <strong>
                  {formatPrice(subtotal)}
                </strong>

              </div>

              {formData.orderType === 'delivery' && (

                <p className="checkout-summary__delivery-note">
                  El valor del domicilio será
                  confirmado por la panadería.
                </p>

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
                {submitStatus.message}
              </div>

            )}

            <button
              type="submit"
              className="checkout-form__submit"
              disabled={isSending}
            >
              {isSending
                ? 'Registrando pedido...'
                : 'Confirmar pedido'}

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