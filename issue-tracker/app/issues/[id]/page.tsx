import prisma from '@/prisma/client';
import { Box, Flex, Grid } from '@radix-ui/themes';
import { notFound } from 'next/navigation';
import { getServerSession } from 'next-auth';

import EditIssueButton from './EditIssueButton';
import IssueDetails from './IssueDetails';
import DeleteIssueButton from './DeleteIssueButton';
import authOptions from '@/app/auth/authOptions';


interface Props {
    params: { id: string }
}

const IssueDetailPage = async ({ params } : Props) => {
    const session = await getServerSession(authOptions);

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

            { session && 
                <Box className='max-w-xl'>
                    <Flex gap="3" className='flex-col w-1/2'>
                        <EditIssueButton issueId={issue.id} />
                        <DeleteIssueButton  issueId={issue.id}/>
                    </Flex>
                </Box> 
            }
        </Grid>
    )
}

export const dynamic = 'force-dynamic'

export default IssueDetailPage