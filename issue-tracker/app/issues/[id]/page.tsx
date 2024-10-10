import prisma from '@/prisma/client';
import { Box, Grid } from '@radix-ui/themes';
import { notFound } from 'next/navigation';

import EditIssueButton from './EditIssueButton';
import IssueDetails from './IssueDetails';



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

            <Box>
                <EditIssueButton issueId={issue.id}/>
            </Box>
        </Grid>
    )
}

export default IssueDetailPage