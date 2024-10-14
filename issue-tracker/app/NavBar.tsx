"use client"
import React from 'react'
import Link from 'next/link'
import { ImBug } from "react-icons/im"
import { usePathname } from 'next/navigation'
import classnames from 'classnames'
import { useSession } from 'next-auth/react'
import { Avatar, Box, DropdownMenu, Flex, Text } from '@radix-ui/themes'

const NavBar = () => {

    return (
        <nav className='space-x-6 border-b mb-5 px-5 py-5'>
            <Flex justify='between'>
                <Flex align='center' gap='5'>
                    {/* Logo */}
                    <Link href='/'>
                        <ImBug />
                    </Link>
                    {/* nav links */}
                    <NavLinks />
                </Flex>
                {/* auth status for login and logout */}
                <AuthStatus />
            </Flex>

        </nav>
    )
}
export default NavBar


const NavLinks = () => {
    const pathname = usePathname();
    const links = [
        { href: "/", label: "Dashboard" },
        { href: "/issues", label: "Issues" }
    ];

    return (
        <ul className='flex space-x-6'>
            {links.map((link) => (
                <li key={link.label}>
                    <Link
                        href={link.href}
                        className={classnames({
                            'nav-link': true,
                            // if link === current path then overwrite color by using '!'
                            '!text-zinc-950': link.href === pathname,
                        })}
                    >
                        {link.label}
                    </Link>
                </li>
            ))}
        </ul>
    )
}


const AuthStatus = () => {
    const { data: session, status } = useSession();

    if (status === 'loading') return <div>Loading...</div>

    if (status === 'unauthenticated') return <Link className='nav-link' href='/api/auth/signin'>Sign In</Link>

    return (
        <Box>
            <DropdownMenu.Root>
                <DropdownMenu.Trigger>
                    <Avatar src={session!.user!.image!} fallback="XXX" size='3' radius='full' className='cursor-pointer' referrerPolicy='no-referrer' />
                </DropdownMenu.Trigger>

                <DropdownMenu.Content>
                    <DropdownMenu.Label className='mb-1'>
                        <Text size='3'>
                            {session!.user!.email}
                        </Text>
                    </DropdownMenu.Label>

                    <DropdownMenu.Item>
                        <Link href='/api/auth/signout'>Sign Out</Link>
                    </DropdownMenu.Item>
                </DropdownMenu.Content>
            </DropdownMenu.Root>
        </Box>
    )
}