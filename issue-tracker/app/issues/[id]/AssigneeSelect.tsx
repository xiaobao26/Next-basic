"use client"
import { Issue, User } from '@prisma/client'
import { Select } from '@radix-ui/themes'
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';

import Skeleton from '@/app/components/Skeleton';

const AssigneeSelect = ({ issue }: { issue: Issue }) => {

    const { data: users, error, isLoading } = useUsers();

    if (isLoading) return <Skeleton height='2rem' />

    if (error) return null;

    const assignIssue = (userId: string) => {
        axios.patch('/api/issue/' + issue.id, { assignedToUserId: userId === 'null' ? null : userId })
            .catch(() => {
                toast.error('Change could not be saved!')
            })
    };

    return (
        <>
            <Select.Root
                defaultValue={issue.assignedToUserId || 'null'}
                onValueChange={assignIssue}
            >
                <Select.Trigger placeholder='assignee...' />
                <Select.Content>
                    <Select.Group>
                        <Select.Label>team members</Select.Label>
                        <Select.Item value='null'>Unassigned</Select.Item>
                        {users?.map((user) => (
                            <Select.Item key={user.id} value={user.id}>{user.name}
                            </Select.Item>
                        ))}
                    </Select.Group>
                </Select.Content>
            </Select.Root>
            <Toaster />
        </>

    )
}
export default AssigneeSelect

const useUsers = () =>  useQuery<User[]>({
    queryKey: ['user'],
    queryFn: () => axios.get('/api/user').then(res => res.data),
    // 60s
    staleTime: 60 * 1000,
    retry: 3
});
