import { previewSecretId } from '@/sanity/env'
import { client } from '@/sanity/lib/client'
import { token } from '@/sanity/lib/fetch'
console.log("🚀 ~ file: route.ts:4 ~ token:", token)
import { resolveHref } from '@/sanity/lib/links'
import { draftMode } from 'next/headers'
import { redirect } from 'next/navigation'
import { isValidSecret } from 'sanity-plugin-iframe-pane/is-valid-secret'

export const runtime = 'edge'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const secret = searchParams.get('secret')
  const slug = searchParams.get('slug')
  console.log("🚀 ~ file: route.ts:16 ~ GET ~ slug:", slug)
  const documentType = searchParams.get('type')
  console.log("🚀 ~ file: route.ts:18 ~ GET ~ documentType:", documentType)

  if (!token) {
    throw new Error(
      'The `SANITY_API_READ_TOKEN` environment variable is required.',
    )
  }
  /*  if (!secret) {
     return new Response('Invalid secret', { status: 401 })
   }
 
   const authenticatedClient = client.withConfig({ token })
   const validSecret = await isValidSecret(
     authenticatedClient,
     previewSecretId,
     secret,
   )
   if (!validSecret) {
     return new Response('Invalid secret', { status: 401 })
   } */

  const href = resolveHref(documentType!, slug!)
  if (!href) {
    return new Response(
      'Unable to resolve preview URL based on the current document type and slug',
      { status: 400 },
    )
  }

  draftMode().enable()

  redirect(href)
}