import React from 'react'
import { signIn } from 'next-auth/react'

const GoogleSigninButton = () => {
    return (
        <>
            <button onClick={() => signIn('google')} className='bg-slate-300 text-black rounded-3xl p-4'>Sign In With Google</button>
        </>
    )
}

export default GoogleSigninButton