import { Card, Flex, Box } from '@radix-ui/themes'
import React from 'react'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import ReactMarkdown from 'react-markdown'

const IssueDetailLoading = () => {
  return (
    <Box className='max-w-xl'>
            <Skeleton />
            <Flex gap='3' className='mb-5 mt-3'>
                <Skeleton width='5rem'/>
                <Skeleton width='8rem'/>
            </Flex>
            
            <Card>
              <Skeleton count={3}/>
            </Card>
        </Box>
  )
}

export default IssueDetailLoading