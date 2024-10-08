import { z } from 'zod'


// define validation schema
const IssueSchema = z.object({
    title: z.string().min(1, 'title is required!').max(255),
    description: z.string().min(1, 'description is required!'),
})

export default IssueSchema;