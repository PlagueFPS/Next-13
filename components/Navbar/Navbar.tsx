import Link from 'next/link'
import Image from 'next/image'
import Logo from './dojo-logo.png'
import LogoutButton from '../LogoutButton/LogoutButton'

interface NavbarProps {
  user: any
}

export default function Navbar({ user }: NavbarProps) {
  return (
    <nav>
      <Image
        src={Logo}
        alt='Dojo Helpdesk logo'
        width={70}
        placeholder='blur'
        quality={100}
      />
      <h1>Next 13</h1>
      <Link href="/">Dashboard</Link>
      <Link href="/tickets" className='mr-auto'>Tickets</Link>

      { user && <span>Hello, {user.email}</span>}
      <LogoutButton />
    </nav>
  )
}