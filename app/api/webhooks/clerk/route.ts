import { Webhook } from 'svix'
import { headers } from 'next/headers'
import { WebhookEvent } from '@clerk/nextjs/server'
import prisma from '@/lib/client'

export async function POST(req: Request) {
  const SIGNING_SECRET = process.env.SIGNING_SECRET

  if (!SIGNING_SECRET) {
    throw new Error('Error: Please add SIGNING_SECRET from Clerk Dashboard to .env or .env.local')
  }
  
  const wh = new Webhook(SIGNING_SECRET)

  const headerPayload = await headers()
  const svix_id = headerPayload.get('svix-id')
  const svix_timestamp = headerPayload.get('svix-timestamp')
  const svix_signature = headerPayload.get('svix-signature')

  if (!svix_id || !svix_timestamp || !svix_signature) {
    return new Response('Error: Missing Svix headers', {
      status: 400,
    })
  }

  const payload = await req.json()

  if (!payload || Object.keys(payload).length === 0) {
    return new Response('Error: Empty or invalid payload', { status: 400 })
  }

  let evt: WebhookEvent

  try {
    evt = wh.verify(JSON.stringify(payload), {
      'svix-id': svix_id,
      'svix-timestamp': svix_timestamp,
      'svix-signature': svix_signature,
    }) as WebhookEvent
  } catch (err) {
    console.error('Error: Could not verify webhook:', err)
    return new Response('Error: Verification error', {
      status: 400,
    })
  }


  const eventType = evt.type

  if (eventType === "user.created") {
    try {
      await prisma.user.create({
        data: {
          id: evt.data.id,
          username: payload.data.username, // Usar directamente el payload
          avatar: payload.data.image_url || "/noAvatar.png", // Usar directamente el payload
          cover: "/noCover.png"
        }
      })
      return new Response("User has been created!", { status: 200 })
    } catch (err) {
      console.log(err)
      return new Response("Failed to create the user", { status: 500 })
    }
  }

  if (eventType === "user.updated") {
    try {
      await prisma.user.update({
        where: {
          id: evt.data.id,
        },
        data: {
          username: payload.data.username,
          avatar: payload.data.image_url || "/noAvatar.png", 
        }
      })
      return new Response("User has been updated!", { status: 200 })
    } catch (err) {
      console.log(err)
      return new Response("Failed to update the user", { status: 500 })
    }
  }

  return new Response('Webhook received', { status: 200 })
}
