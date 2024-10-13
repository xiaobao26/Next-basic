"use client"
import { AlertDialog, Button, Flex } from '@radix-ui/themes'
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { FaTrash } from "react-icons/fa";
import delay from 'delay';

import { Spinner } from '@/app/components';


const DeleteIssueButton = async ({ issueId }: { issueId: number }) => {
    const router = useRouter();
    const [error, setError] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);

    // TEST HERE

    const DeleteIssue = async () => {
        try {
            setIsDeleting(true);
            await delay(9000);
            await axios.delete('/api/issue/' + issueId);
            router.push('/issues');
            router.refresh();
        } catch (error) {
            setIsDeleting(false);
            setError(true);
        }
    };

    const CloseErrorWindow = () => {
        setError(false);
    };

    return (
        <>
            <AlertDialog.Root>
                <AlertDialog.Trigger>
                    <Button color='red' disabled={isDeleting}>
                        <FaTrash />
                        { isDeleting &&  <Spinner /> }
                        Delete
                    </Button>
                </AlertDialog.Trigger>

                <AlertDialog.Content maxWidth="450px">
                    <AlertDialog.Title>Confirm delete Issue</AlertDialog.Title>
                    <AlertDialog.Description size="2">
                        Are you sure? This application will no longer be accessible and any
                        existing sessions will be expired.
                    </AlertDialog.Description>

                    <Flex gap="3" mt="4" justify="end">
                        <AlertDialog.Cancel>
                            <Button variant="soft" color="gray">
                                Cancel
                            </Button>
                        </AlertDialog.Cancel>
                        <AlertDialog.Action>
                            <Button 
                                variant="solid"
                                color="red"
                                onClick={DeleteIssue}
                            >
                                Delete 
                            </Button>
                        </AlertDialog.Action>
                    </Flex>
                </AlertDialog.Content>
            </AlertDialog.Root>
            

            <AlertDialog.Root open={error}>
                <AlertDialog.Content>
                    <AlertDialog.Title color='red'>
                        Delete Error
                    </AlertDialog.Title>
                    <AlertDialog.Description className='mb-3'>
                        Cannot delete this issue!
                    </AlertDialog.Description>
                    <Button variant="soft" color="gray" onClick={CloseErrorWindow}>
                        Ok
                    </Button>
                </AlertDialog.Content>
            </AlertDialog.Root>
        </>
        
    )
}

export default DeleteIssueButton
