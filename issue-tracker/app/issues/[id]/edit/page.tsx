import React from 'react'
import IssueForm from '../../_components/IssueForm'
import prisma from '@/prisma/client'
import { notFound } from 'next/navigation'

interface Props {
    params: { id: string }
}

const EditIssuePage = async ({ params }: Props ) => {
    const issue = await prisma.issue.findUnique({
        where : {
            id: parseInt(params.id)
        }
    });

    // if issue not exit 
    if (!issue) notFound();

    // if issue exit 
    return (
        <IssueForm issue={issue}/>
    )
}

export default EditIssuePage