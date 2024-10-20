
"use client"
import { ErrorMessage, Spinner } from '@/app/components'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button, TextField } from '@radix-ui/themes'
import axios from 'axios'
import "easymde/dist/easymde.min.css"
import SimpleMDE from 'react-simplemde-editor'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { z } from 'zod'

import createIssueSchema from '@/app/validationSchema'
import { Issue } from '@prisma/client'



type IssueFormData = z.infer<typeof createIssueSchema>


const IssueForm = async ({ issue }: {issue?: Issue}) => {
    const [mounted, setMounted] = useState(false);
    const { register, control, handleSubmit, formState: { errors } } = useForm<IssueFormData>({
        resolver: zodResolver(createIssueSchema)
    });
    const router = useRouter();
    const href = "/issues";
    const [error, setError] = useState('');
    const [isSubmit, setIsSubmit] = useState(false);

    const onSubmit = handleSubmit(async (data) => {
        try {
            setIsSubmit(true)
            if (issue) await axios.patch('/api/issue/' + issue.id, data);
            else await axios.post('/api/issue', data);
            router.push(href);
            router.refresh();
        } catch (e) {
            setError('An unexpected error occurred.')
        }
    })

    useEffect(() => {
        setMounted(true); // Ensures this is run only on the client-side
    }, []);

    return (
        <div className='max-w-xl'>
            <form className='space-y-3' onSubmit={onSubmit}>
                <TextField.Root defaultValue={issue?.title} placeholder='Title' {...register('title')}>
                    <TextField.Slot />
                </TextField.Root>

                <ErrorMessage>
                    {errors.title?.message}
                </ErrorMessage>

                {mounted && <Controller
                    name="description"
                    control={control}
                    defaultValue={issue?.description}
                    render={({ field }) => {
                        const { ...rest } = field; 
                        return <SimpleMDE placeholder="Enter the description" {...rest} />;
                    }}
                />
                }
                <ErrorMessage>
                    {errors.description?.message}
                </ErrorMessage>
                <div className='w-full flex flex-row-reverse'>
                    <Button disabled={isSubmit}>
                        {issue ? 'Update Issue' : 'Submit New Issue'}
                        {isSubmit && <Spinner />}{' '}
                    </Button>
                </div>
            </form>
        </div>
    );
};

export default IssueForm;
