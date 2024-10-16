"use client"
import { User } from '@prisma/client'
import { Select } from '@radix-ui/themes'
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import Skeleton from '@/app/components/Skeleton';

const AssigneeSelect = () => {

    const { data: users, error, isLoading } = useQuery<User[]>({
        queryKey: ['user'], 
        queryFn: () => axios.get('/api/user').then(res => res.data),
        staleTime: 60*1000,
        retry: 3
    });

    if (isLoading) return <Skeleton height='2rem'/>

    if (error) return null;

    return (
        <Select.Root>
            <Select.Trigger placeholder='assignee...'/>
                <Select.Content>
                    <Select.Group>
                        <Select.Label>team member</Select.Label>
                        { users?.map((user) => (
                            <Select.Item key={user.id} value={user.id}>{user.name}</Select.Item>
                        ))}
                    </Select.Group>
                </Select.Content>
        </Select.Root>

    )
}
export default AssigneeSelect
/**

 */