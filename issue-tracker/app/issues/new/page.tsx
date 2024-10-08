
"use client"
import { TextField, Button } from '@radix-ui/themes'
import { useEffect, useState } from 'react'
import dynamic from 'next/dynamic'
import "easymde/dist/easymde.min.css"
import { useForm, Controller } from 'react-hook-form'
import axios from 'axios'
import { useRouter } from 'next/navigation'

// Dynamically load SimpleMdeReact on the client side only
// With no SSR
// To dynamically load a component on the client side, you can use the ssr option to disable server-rendering. This is useful if an external dependency or component relies on browser APIs like window.
const SimpleMDE = dynamic(() => import('react-simplemde-editor'), { ssr: false });

interface IssueForm {
    title: string;
    description: string;
}

const Page = () => {
    const [mounted, setMounted] = useState(false);
    const { register, control, handleSubmit } = useForm<IssueForm>();
    const router = useRouter();
    const href = "/issues"

    useEffect(() => {
        setMounted(true); // Ensures this is run only on the client-side
    }, []);

    return (
        <>
            <form className='max-w-xl space-y-3' onSubmit={handleSubmit(async (data) => {
                // console.log(data)
                await axios.post('/api/issue', data);
                router.push(href);
            })}>
                <TextField.Root placeholder='Title' {...register('title')}>
                    <TextField.Slot />
                </TextField.Root>

                {mounted && <Controller
                    name="description"
                    control={control}
                    render={({ field }) => {
                        const { ...rest } = field; 
                        return <SimpleMDE placeholder="Enter the description" {...rest} />;
                    }}
                />
                }


                <Button>Submit New Issue</Button>
            </form>
        </>
    );
};

export default Page;
