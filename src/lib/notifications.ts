import type { Platform } from './$types';
import { fromContactForm } from '$lib/emails/from_contact_form';
import { fromTransferRequest } from '$lib/emails/from_transfer_request';
import { fromSignup } from '$lib/emails/from_signup';

export const adminNotification = async ({ topic, title, tags, message, fetch, platform }: { topic: string, title: string, tags: string, message: string, fetch: any, platform: Platform }) => await fetch(`${platform.env.NTFY_URL}/${topic}`, {
  method: 'POST', // PUT works too
  headers: {
    'Title': title,
    'Tags': tags,
  },
  body: message
})


export enum EndUserEmailNotification {
  ContactForm,
  TransferRequest,
  Signup,
}

export const endUserNotification = async ({apiKey, type, name, email, options, fetch}: {apiKey: string, type: EndUserEmailNotification, name: string, email: string, fetch: any, options: any}) => {
  const { subject, content } = endUserEmailContent(type, options);
  const emailMessageData = {
    Recipients: [
      {
        Email: email,
        Fields: {
          name: name
        }
      }
    ],
    Content: {
      Body: [
        {
          ContentType: "HTML",
          Charset: "utf-8",
          Content: content
        },
      ],
      From: "admin@sweif.com",
      Subject: subject,
    }
  }; // interface EmailMessageData from '@elasticemail/elasticemail-client-ts-axios'

  try {
    let response = await fetch("https://api.elasticemail.com/v4/emails", {
      method: 'POST', // PUT works too
      headers: {
        'X-ElasticEmail-ApiKey': apiKey,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(emailMessageData)
    })
    return response
  } catch(e) {
    console.log(e)
  }
}

const endUserEmailContent = (type: EndUserEmailNotification, options: any) : {subject: string, content: string } => {
  switch (type) {
    case EndUserEmailNotification.ContactForm:
      return fromContactForm(options.name)
    case EndUserEmailNotification.TransferRequest:
      return fromTransferRequest(options)
    case EndUserEmailNotification.Signup:
      return fromSignup()
    default:
      console.log(type, "email type not found");
      throw new Error(`email type not found ${type}`)
  }
}
