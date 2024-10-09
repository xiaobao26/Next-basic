import IssueStateBadge from '@/app/components/IssueStateBadge';
import prisma from '@/prisma/client'
import { Heading, Text, Flex, Card } from '@radix-ui/themes';
import delay from 'delay';
import { notFound } from 'next/navigation';
import React from 'react'
import ReactMarkdown from 'react-markdown'



interface Props {
    params: { id: string }
}

const IssueDetailPage = async ({ params } : Props) => {

    const issue = await prisma.issue.findUnique({
        where: {
            id: parseInt(params.id)
        }
    });

    if (!issue) {
        notFound();
    }
    await delay(3000);

    return (
        <div className='max-w-xl'>
            <Heading>{issue.title}</Heading>
            <Flex gap='3' className='mb-5 mt-3'>
                <IssueStateBadge status={issue.status} />
                <Text>{issue.createAt.toDateString()}</Text>
            </Flex>
            
            <Card>
                <ReactMarkdown className='prose'>
                    {issue.description}
                </ReactMarkdown>
            </Card>
        </div>
    )
}

export default IssueDetailPage