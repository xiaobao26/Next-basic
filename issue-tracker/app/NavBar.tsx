"use client"
import React from 'react'
import Link from 'next/link'
import { ImBug } from "react-icons/im"
import { usePathname } from 'next/navigation'
import classnames from 'classnames'

const NavBar = () => {
    const pathname = usePathname();
    console.log(pathname);

    const links= [
        { href: "/", label: "Dashboard"},
        { href: "/issues", label: "Issues"}
    ]

    return (
        <nav className='flex space-x-6 border-b mb-5 px-5 h-14 items-center'>
            <Link href='/'>
                <ImBug />
            </Link>
            <ul className='flex space-x-6'>
                { links.map((link) => (
                    <Link 
                        key={link.label}
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
                ))}
            </ul>
        </nav>
    )
}

export default NavBar

// text-zinc-500 hover:text-zinc-800 transition-colors
// {`${pathname === link.href ? 'text-zinc-950' : 'text-zinc-500'} hover:text-zinc-800 transition-colors`}