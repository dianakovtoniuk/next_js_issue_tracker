'use client'
import Link from 'next/link'
import { AiFillBug } from 'react-icons/ai'
import { usePathname } from 'next/navigation'
import classNames from 'classnames'

function NavBar() {

    const currentPath = usePathname();

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
                <Link key={el.label} href={el.href} 
                className={classNames({
                'text-zinc-900': el.href === currentPath,
                'text-zinc-500': el.href !== currentPath,
                'hover:text-zinc-800 transition-colors': true
                })}>
                    {el.label}
                </Link>
            ))}
        </ul>
    </nav>
  )
}

export default NavBar