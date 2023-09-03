"use client"
import { useTransition } from "react"
import { TiDelete } from 'react-icons/ti'
import { deleteTicket } from "@/utils/ServerActions"

interface DeleteTicketProps {
  id: number
}

const DeleteTicket = ({ id }: DeleteTicketProps) => {
  const [isPending, startTransition] = useTransition()

  return (
    <button 
      className="btn-primary" 
      disabled={ isPending } 
      onClick={ () => startTransition(() => deleteTicket(id)) }
    >
      { isPending ? (
        <>
          <TiDelete />
          Deleting...
        </>
      ) : (
        <>
          <TiDelete />
          Delete Ticket
        </>
      )}
    </button>
  )
}

export default DeleteTicket