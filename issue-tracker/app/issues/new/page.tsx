
"use client"
import { TextField, Button, Callout, Text } from '@radix-ui/themes'
import { useEffect, useState } from 'react'
import dynamic from 'next/dynamic'
import "easymde/dist/easymde.min.css"
import { useForm, Controller } from 'react-hook-form'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import { InfoCircledIcon } from '@radix-ui/react-icons'
import { zodResolver } from '@hookform/resolvers/zod'
import createIssueSchema from '@/app/validationSchema'
import { z } from 'zod'


// Dynamically load SimpleMdeReact on the client side only
// With no SSR
// To dynamically load a component on the client side, you can use the ssr option to disable server-rendering. This is useful if an external dependency or component relies on browser APIs like window.
const SimpleMDE = dynamic(() => import('react-simplemde-editor'), { ssr: false });

// in schema already has type required, so change to simple one 
// interface IssueForm {
//     title: string;
//     description: string;
// }
type IssueForm = z.infer<typeof createIssueSchema>



const Page = () => {
    const [mounted, setMounted] = useState(false);
    const { register, control, handleSubmit, formState: { errors } } = useForm<IssueForm>({
        resolver: zodResolver(createIssueSchema)
    });
    const router = useRouter();
    const href = "/issues";
    const [error, setError] = useState('');

    useEffect(() => {
        setMounted(true); // Ensures this is run only on the client-side
    }, []);

    return (
        <div className='max-w-xl'>
            {/* { error && 
                    <div className='mb-4'>  
                        <Callout.Root color='red' role='alert'>
                            <Callout.Icon>
                                <InfoCircledIcon />
                            </Callout.Icon>
                            <Callout.Text>
                                {error}
                            </Callout.Text>
                        </Callout.Root>
                    </div>
            } */}
            <form className='space-y-3' onSubmit={handleSubmit(async (data) => {
                try {
                    await axios.post('/api/issue', data);
                    router.push(href);
                } catch (e) {
                    setError('An unexpected error occurred.')
                }
            })}>
                <TextField.Root placeholder='Title' {...register('title')}>
                    <TextField.Slot />
                </TextField.Root>
                {errors.title && <Text color='red' as='p'>{errors.title.message}</Text>}

                {mounted && <Controller
                    name="description"
                    control={control}
                    render={({ field }) => {
                        const { ...rest } = field; 
                        return <SimpleMDE placeholder="Enter the description" {...rest} />;
                    }}
                />
                }
                {errors.description && <Text color='red' as='p'>{errors.description.message}</Text>}
                <div className='w-full flex flex-row-reverse'>
                    <Button>Submit New Issue</Button>
                </div>
                
            </form>
        </div>
    );
};

export default Page;
