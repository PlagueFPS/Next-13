import { Database } from '@/interfaces/supabase'
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  const url = new URL(request.url)
  const code = url.searchParams.get('code')
  const next = url.searchParams.get('next')
  const supabase = createRouteHandlerClient<Database>({ cookies })

  if (next && code) {
    await supabase.auth.exchangeCodeForSession(code)

    return NextResponse.redirect(next)
  }
  else {
    throw new Error('Request Failed')
  }
}