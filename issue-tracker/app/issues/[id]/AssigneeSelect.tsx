"use client"
import { Issue, User } from '@prisma/client'
import { Select } from '@radix-ui/themes'
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import Skeleton from '@/app/components/Skeleton';

const AssigneeSelect = ({ issue }: { issue: Issue }) => {

    const { data: users, error, isLoading } = useQuery<User[]>({
        queryKey: ['user'], 
        queryFn: () => axios.get('/api/user').then(res => res.data),
        // 60s
        staleTime: 60*1000,
        retry: 3
    });

    if (isLoading) return <Skeleton height='2rem'/>

    if (error) return null;

    return (
        <Select.Root 
            defaultValue={ issue.assignedToUserId || 'null' }
            onValueChange={(userId) => {
            axios.patch('/api/issue/' + issue.id, { assignedToUserId: userId === 'null' ? null : userId })
        }}>
            <Select.Trigger placeholder='assignee...'/>
                <Select.Content>
                    <Select.Group>
                        <Select.Label>team members</Select.Label>
                        <Select.Item value='null'>Unassigned</Select.Item>
                        { users?.map((user) => (
                            <Select.Item key={user.id} value={user.id}>{user.name}</Select.Item>
                        ))}
                    </Select.Group>
                </Select.Content>
        </Select.Root>
    )
}
export default AssigneeSelect
