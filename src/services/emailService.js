import emailjs from '@emailjs/browser'

const serviceId =
  import.meta.env.VITE_EMAILJS_SERVICE_ID

const templateId =
  import.meta.env.VITE_EMAILJS_TEMPLATE_ID

const publicKey =
  import.meta.env.VITE_EMAILJS_PUBLIC_KEY

export const sendOrderEmail = async ({
  customer,
  cart,
  subtotal,
}) => {
  if (
    !serviceId ||
    !templateId ||
    !publicKey
  ) {
    throw new Error(
      'EmailJS no está configurado correctamente.'
    )
  }

  const orderDetails = cart
    .map(
      (item) =>
        `${item.quantity} x ${item.name} - ` +
        formatPrice(
          item.price * item.quantity
        )
    )
    .join('\n')

  const templateParams = {
    customer_name:
      customer.name,

    customer_phone:
      customer.phone,

    customer_email:
      customer.email || 'No proporcionado',

    order_type:
      customer.orderType === 'delivery'
        ? 'Domicilio'
        : 'Recoger en la panadería',

    customer_address:
      customer.orderType === 'delivery'
        ? customer.address
        : 'No aplica',

    order_notes:
      customer.notes ||
      'Sin observaciones',

    order_details:
      orderDetails,

    subtotal:
      formatPrice(subtotal),

    order_date:
      new Intl.DateTimeFormat(
        'es-CO',
        {
          dateStyle: 'long',
          timeStyle: 'short',
        }
      ).format(new Date()),
  }

  return emailjs.send(
    serviceId,
    templateId,
    templateParams,
    {
      publicKey,
    }
  )
}

const formatPrice = (price) => {
  return new Intl.NumberFormat(
    'es-CO',
    {
      style: 'currency',
      currency: 'COP',
      maximumFractionDigits: 0,
    }
  ).format(price)
}