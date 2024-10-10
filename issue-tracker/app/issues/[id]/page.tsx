import { IssueStateBadge } from '@/app/components';
import prisma from '@/prisma/client';
import { Box, Button, Card, Flex, Grid, Heading, Text } from '@radix-ui/themes';
import { ImPencil2 } from 'react-icons/im';
import { notFound } from 'next/navigation';
import ReactMarkdown from 'react-markdown';
import Link from 'next/link';



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
        <Grid columns={{ initial: '1', sm: '2'}}>
            <Box className='max-w-xl mb-5'>
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
            </Box>

            <Box>
                <Button>
                    <ImPencil2/>
                    <Link href={`/issues/${issue.id}/edit`}>
                        Edit Issue 
                    </Link>
                </Button>
            </Box>
            
        </Grid>
    )
}

export default IssueDetailPage