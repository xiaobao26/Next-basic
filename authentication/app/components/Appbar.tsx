"use client"
import React from 'react'
import { useSession, signOut } from 'next-auth/react';
import GoogleSigninButton from './GoogleSigninButton'
import GithubSigninButton from './GithubSigninButton'

const Appbar = () => {
    const { data: session } = useSession();
    return (
        <header className='flex gap-4 p-4 bg-gradient-to-b from-white to-gray-200 shadow justify-end'>
            {
                session ? (
                    // Show the session only once, regardless of the provider
                    session.user && session.user.name ? (
                        <div className='flex gap-4'>
                            <p className='text-black'>{session.user.name}</p>
                            <button onClick={() => signOut()} className='text-red-400'>
                                Sign Out
                            </button>
                        </div>
                    ) : null
                ) : (
                    // If no session, show both sign-in options
                    <>
                        <GithubSigninButton />
                        <GoogleSigninButton />
                    </>
                )
            }
        </header>

    )
}

export default Appbar