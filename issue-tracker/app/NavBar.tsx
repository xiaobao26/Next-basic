"use client"
import React from 'react'
import Link from 'next/link'
import { ImBug } from "react-icons/im"
import { usePathname } from 'next/navigation'
import classnames from 'classnames'
import { useSession } from 'next-auth/react'
import { Avatar, Box, Button, DropdownMenu, Flex, Text } from '@radix-ui/themes'

const NavBar = () => {
    const { data: session, status } = useSession();
    const pathname = usePathname();
    console.log(pathname);

    const links= [
        { href: "/", label: "Dashboard"},
        { href: "/issues", label: "Issues"}
    ]

    return (
        <nav className='space-x-6 border-b mb-5 px-5 py-5'>
            <Flex justify='between'>
                <Flex align='center' gap='3'>
                    <Link href='/'>
                        <ImBug />
                    </Link>

                    <ul className='flex space-x-6'>
                        { links.map((link) => (
                            <li key={link.label}>
                                <Link 
                                href={link.href} 
                                className= {classnames({
                                    // key: class name 
                                    // value: boolean
                                    'text-zinc-950': link.href === pathname,
                                    'text-zinc-400': link.href !== pathname,
                                    'hover:text-zinc-700 transition-colors': true,
                                })}
                                >
                                    {link.label}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </Flex>

                <Box>
                    { status === 'authenticated' && 
                        (<DropdownMenu.Root>
                            <DropdownMenu.Trigger>
                                <Avatar src={session.user!.image!} fallback="XXX" size='3' radius='full' className='cursor-pointer'/>
                            </DropdownMenu.Trigger>

                            <DropdownMenu.Content>
                                <DropdownMenu.Label className='mb-1'>
                                    <Text size='3'>
                                        {session.user!.email}
                                    </Text>
                                </DropdownMenu.Label>

                                <DropdownMenu.Item>
                                    <Link href='/api/auth/signout'>Sign Out</Link>
                                </DropdownMenu.Item>
                            </DropdownMenu.Content>
                        </DropdownMenu.Root>)
                    }
                    { status === 'unauthenticated' && 
                        <Link href='/api/auth/signin'>Sign In</Link>
                    }
                    { status === 'loading' && 
                        <div>Loading...</div>
                    }
                </Box>
            </Flex>

        </nav>
    )
}

export default NavBar

// text-zinc-500 hover:text-zinc-800 transition-colors
// {`${pathname === link.href ? 'text-zinc-950' : 'text-zinc-500'} hover:text-zinc-800 transition-colors`}