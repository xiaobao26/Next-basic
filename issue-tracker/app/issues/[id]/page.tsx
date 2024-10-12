import prisma from '@/prisma/client';
import { Box, Flex, Grid } from '@radix-ui/themes';
import { notFound } from 'next/navigation';

import EditIssueButton from './EditIssueButton';
import IssueDetails from './IssueDetails';
import DeleteIssueButton from './DeleteIssueButton';

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
                <IssueDetails issue={issue}/>
            </Box>

            <Box className='max-w-xl'>
                <Flex gap="3" className='flex-col w-1/2'>
                    <EditIssueButton issueId={issue.id} />
                    <DeleteIssueButton  issueId={issue.id}/>
                </Flex>
                
            </Box>
        </Grid>
    )
}

export const dynamic = 'force-dynamic'

export default IssueDetailPage