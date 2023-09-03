import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { notFound } from "next/navigation"
import DeleteTicket from '@/components/DeleteTicket/DeleteTicket'
import { Database } from '@/interfaces/supabase'

export const dynamicParams = true // default val = true

interface TicketDetailsProps {
  params: {
    id: string
  }
}

export async function generateMetadata({ params }: TicketDetailsProps) {
  const supabase = createServerComponentClient<Database>({ cookies })
  const { data: ticket } = await supabase.from('tickets').select().eq('id', params.id).single()
 
  return {
    title: `Next 13 | ${ticket?.title ?? 'Ticket not found' }`
  }
}

async function getTicket(id: string) {
  const supabase = createServerComponentClient<Database>({ cookies })
  const { data } = await supabase.from('tickets').select().eq('id', id).single()

  if (!data) {
    notFound()
  }

  return data
}


export default async function TicketDetails({ params }: TicketDetailsProps) {
  const ticket = await getTicket(params.id)
  const supabase = createServerComponentClient<Database>({ cookies })
  const { data } = await supabase.auth.getSession()

  return (
    <main>
      <nav>
        <h2>Ticket Details</h2>
        <div className="ml-auto">
          { data.session?.user.email === ticket.user_email && (
            <DeleteTicket id={ ticket.id } />
          )}
        </div>
      </nav>
      <div className="card">
        <h3>{ticket.title}</h3>
        <small>Created by {ticket.user_email}</small>
        <p>{ticket.body}</p>
        <div className={`pill ${ticket.priority}`}>
          {ticket.priority} priority
        </div>
      </div>
    </main>
  )
}