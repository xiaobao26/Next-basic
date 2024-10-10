import { IssueStateBadge } from '@/app/components'
import { Issue } from '@prisma/client'
import { Flex, Heading, Text, Card } from '@radix-ui/themes'
import React from 'react'
import ReactMarkdown from 'react-markdown'

const IssueDetails = ({ issue}: { issue: Issue}) => {
    return (
        <>
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
        </>
    )
}

export default IssueDetails