'use client'
import Link from 'next/link'
import { AiFillBug } from 'react-icons/ai'
import { usePathname } from 'next/navigation'
import classNames from 'classnames'
import { useSession, signIn, signOut } from 'next-auth/react'
import { Avatar, Box, DropdownMenu, Flex, Text } from '@radix-ui/themes'
import Skeleton from './skeleton'

function NavBar() {

    const currentPath = usePathname();

    const links = [
        {label: "Dashboard", href: '/'},
        {label: "Issues", href: '/issues'}
    ]

  return (
    <nav className='flex justify-between border-b mb-5 px-5 h-14 items-center'>
        <Flex align="center" gap="6">
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
        </Flex>

        <AuthStatus />
    </nav>
  )
}

const AuthStatus = () => {
    const { status, data: session } = useSession();

    if (status === 'loading') return <Skeleton width="3rem" />;

    if (status === 'unauthenticated')
        return (
            <button
                className="text-zinc-500 hover:text-zinc-800 transition-colors"
                onClick={() => signIn('google')}
            >
                Login
            </button>
        );

    return (
        <Box>
            <DropdownMenu.Root>
                <DropdownMenu.Trigger>
                    <Avatar
                        src={session?.user?.image ?? undefined}
                        fallback="?"
                        size="2"
                        radius="full"
                        className="cursor-pointer"
                        referrerPolicy="no-referrer"
                    />
                </DropdownMenu.Trigger>
                <DropdownMenu.Content>
                    <DropdownMenu.Label>
                        <Text size="2">{session?.user?.email}</Text>
                    </DropdownMenu.Label>
                    <DropdownMenu.Item onSelect={() => signOut()}>
                        Log out
                    </DropdownMenu.Item>
                </DropdownMenu.Content>
            </DropdownMenu.Root>
        </Box>
    );
};

export default NavBar
