"use client"
import { AlertDialog, Button, Flex } from '@radix-ui/themes'
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { FaTrash } from "react-icons/fa";



const DeleteIssueButton = async ({ issueId }: { issueId: number }) => {
    const router = useRouter();

    const handleDelete = async () => {
        try {
            

        } catch (error) {
            console.log("error when deleting!")
        }
    }

    return (
        <AlertDialog.Root>
            <AlertDialog.Trigger>
                <Button color='red'>
                    <FaTrash />
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
                            onClick={async () => {
                                await axios.delete('/api/issue/' + issueId)
                                router.push('/issues');
                                router.refresh();
                            }}
                        >
                            Delete 
                        </Button>
                    </AlertDialog.Action>
                </Flex>
            </AlertDialog.Content>
        </AlertDialog.Root>
        
    )
}

export default DeleteIssueButton
