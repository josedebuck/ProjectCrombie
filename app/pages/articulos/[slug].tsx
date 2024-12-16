'use client'

import { useRouter } from 'next/router'
 
export default function Page() {
  const router = useRouter()
  return <p>Articulos: {router.query.slug}</p>
}