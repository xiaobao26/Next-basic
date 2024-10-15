"use client"
import { User } from '@prisma/client'
import { Select } from '@radix-ui/themes'
import axios from 'axios';
import React, { useState, useEffect } from 'react'

const AssigneeSelect = () => {
    const [users, setUsers] = useState<User[]>([]);

    useEffect(() => {
        const fetchUsers = async () => {
            const {data} = await axios.get<User[]>('/api/user');
            setUsers(data);
        };
        fetchUsers();
    },[]);

    return (
        <Select.Root>
            <Select.Trigger placeholder='assignee...'/>
                <Select.Content>
                    <Select.Group>
                        <Select.Label>team member</Select.Label>
                        { users.map((user) => (
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