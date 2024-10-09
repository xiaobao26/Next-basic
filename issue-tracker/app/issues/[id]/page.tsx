import { IssueStateBadge } from '@/app/components';
import prisma from '@/prisma/client';
import { Card, Flex, Heading, Text } from '@radix-ui/themes';
import { notFound } from 'next/navigation';
import ReactMarkdown from 'react-markdown';



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