
"use client"
import { TextField, Button } from '@radix-ui/themes'
import { useEffect, useState } from 'react'
import dynamic from 'next/dynamic'
import "easymde/dist/easymde.min.css"

// Dynamically load SimpleMdeReact on the client side only
// With no SSR
// To dynamically load a component on the client side, you can use the ssr option to disable server-rendering. This is useful if an external dependency or component relies on browser APIs like window.
const SimpleMDE = dynamic(() => import('react-simplemde-editor'), { ssr: false });

const Page = () => {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true); // Ensures this is run only on the client-side
    }, []);

    return (
        <>
            <div className='max-w-xl space-y-3'>
                <TextField.Root placeholder='title'>
                    <TextField.Slot />
                </TextField.Root>

                {mounted && <SimpleMDE placeholder="description..." />} {/* Render only after mounting */}

                <Button>Submit New Issue</Button>
            </div>
        </>
    );
};

export default Page;
