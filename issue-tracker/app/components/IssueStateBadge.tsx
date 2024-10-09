import React from 'react'
import { Badge } from "@radix-ui/themes"
import { Status } from '@prisma/client'


// interface Props {
//     status: Status
// }

// const statusMap: Record<Key, Value>
const statusMap: Record<Status, { label: string, color: 'red' | 'orange' | 'green'}> = {
    OPEN: { label: 'Open', color: 'red'},
    IN_PROGRESS: { label: 'In progress', color: 'orange'},
    CLOSED: { label:'Closed' , color: 'green'}
}


const IssueStateBadge = ({ status }: { status: Status }) => {
    return (
        <div>
            <Badge color={statusMap[status].color}>
                {statusMap[status].label}
            </Badge>
        </div>
    )
}

export default IssueStateBadge