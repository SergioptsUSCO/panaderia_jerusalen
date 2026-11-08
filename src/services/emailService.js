import emailjs from '@emailjs/browser'
import { createTranslator, formatMoney, locales } from '../i18n/translations'
import { business } from '../data/business'

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
  language = 'es',
}) => {
  const t = createTranslator(language)
  const formatPrice = (amount) => formatMoney(amount, language)
  if (
    !serviceId ||
    !templateId ||
    !publicKey
  ) {
    throw new Error(
      t('EmailJS no está configurado correctamente.')
    )
  }

  const orderDetails = cart
    .map(
      (item) =>
        `${item.quantity} x ${t(item.name)} - ` +
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
      customer.email || t('No proporcionado'),

    order_type:
      customer.orderType === 'delivery'
        ? t('Domicilio')
        : t('Recoger en la panadería'),

    customer_address:
      customer.orderType === 'delivery'
        ? customer.address
        : t('No aplica'),

    order_notes:
      customer.notes ||
      t('Sin observaciones'),

    order_details:
      orderDetails,

    subtotal:
      formatPrice(subtotal),

    order_date:
      new Intl.DateTimeFormat(
        locales[language] || locales.es,
        {
          dateStyle: 'long',
          timeStyle: 'short',
          timeZone: business.timeZone,
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
