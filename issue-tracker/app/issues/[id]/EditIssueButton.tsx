import { Button } from '@radix-ui/themes'
import Link from 'next/link'
import React from 'react'
import { ImPencil2 } from 'react-icons/im'

const EditIssueButton = ({ issueId} : { issueId: number }) => {
    return (
        <Button>
            <ImPencil2 />
            <Link href={`/issues/${issueId}/edit`}>
                Edit Issue
            </Link>
        </Button>
    )
}

export default EditIssueButton