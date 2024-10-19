import { z } from 'zod'


// define validation schema
export const IssueSchema = z.object({
    title: z.string().min(1, 'title is required!').max(255),
    description: z.string().min(1, 'description is required!').max(65535),
})


export const PatchIssueSchema = z.object({
    title: z.string().min(1, 'title is required!').max(255).optional(),
    description: z.string().min(1, 'description is required!').max(65535).optional(),
    assignedToUserId: z.string().min(1, 'assigned to userId is required!').max(255).optional().nullable(),
})
