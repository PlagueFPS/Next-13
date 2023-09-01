import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { NextResponse } from "next/server"

export const dynamic = 'force-dynamic'

export async function POST(request: Request) {
  const ticket: Ticket = await request.json()
  const supabase = createRouteHandlerClient({ cookies })
  const { data: { session } } = await supabase.auth.getSession()
  const { data, error } = await supabase.from('tickets')
    .insert({
      ...ticket,
      user_email: session?.user.email
    }).select().single()

    return NextResponse.json({ data, error })
}