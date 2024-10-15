import { Select } from '@radix-ui/themes'
import React from 'react'

const AssigneeSelect = () => {
    return (
        <Select.Root defaultValue='Xiaobao Xue'>
            <Select.Trigger>
                <Select.Content>
                    <Select.Group>
                        <Select.Label>team member</Select.Label>
                        <Select.Item value='1'>Xiaobao Xue</Select.Item>
                    </Select.Group>
                </Select.Content>
            </Select.Trigger>
        </Select.Root>
    )
}

export default AssigneeSelect