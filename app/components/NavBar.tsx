import Link from 'next/link'
import { AiFillBug } from 'react-icons/ai'

function NavBar() {

    const links = [
        {label: "Dashboard", href: '/'},
        {label: "Issues", href: '/issues'}
    ]

  return (
    <nav className='flex space-x-6 border-b mb-5 px-5 h-14 items-center'>
        <Link href='/' >
            <AiFillBug />
        </Link>

        <ul className='flex space-x-6'>
            {links.map((el) => (
                <li key={el.label} className='text-zink-500 hover:text-zink-800'><Link href={el.href} >{el.label}</Link></li>
            ))}
        </ul>
    </nav>
  )
}

export default NavBar