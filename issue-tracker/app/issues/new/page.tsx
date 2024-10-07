import { TextField, TextArea, Button } from '@radix-ui/themes'
import React from 'react'

const page = () => {
    return (
        <>  
            <div className='max-w-xl px-4 space-y-3'>
                <TextField.Root placeholder='title'>
                    <TextField.Slot />
                </TextField.Root>
                <TextArea placeholder="description..." />
                <Button>Submit New Issue</Button>
            </div>
        </>
    )
}

export default page