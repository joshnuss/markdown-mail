import { SENDER_ADDRESS, MAILGUN_KEY, MAILGUN_USERNAME, MAILGUN_DOMAIN } from '$env/static/private'
import Mailgun from 'mailgun.js'

export function deliver({to, subject, html}) {
  const mailgun = new Mailgun(FormData)
  const client = mailgun.client({
    username: MAILGUN_USERNAME,
    key: MAILGUN_KEY,
  })

  return client.messages.create(MAILGUN_DOMAIN, {
    from: SENDER_ADDRESS,
    to,
    subject,
    html
  })
}
