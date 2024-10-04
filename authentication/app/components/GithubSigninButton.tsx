import { signIn } from 'next-auth/react'
import React from 'react'

const GithubSigninButton = () => {

    return (
        <>
            <button onClick={() => signIn('github')} className='bg-black text-white p-6 rounded-3xl'>Sign In With Github</button>
        </>
    )
}

export default GithubSigninButton