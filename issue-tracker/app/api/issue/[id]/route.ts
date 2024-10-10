import IssueSchema from "@/app/validationSchema";
import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";


export async function PATCH (request: NextRequest, { params}: { params: { id: string }} ) {
    // check the body validation
    const body = await request.json();
    const validation = IssueSchema.safeParse(body);
    if (!validation.success) return NextResponse.json(validation.error.format(), { status: 400 })

    // using prisma to find issue
    const issue = await prisma.issue.findUnique({
        where :{
            id: parseInt(params.id)
        }
    });
    if (!issue) return NextResponse.json({ error: 'Invalid issue id'}, { status: 404 })

    // then update title or description
    const updateIssue = await prisma.issue.update({
        where: {
            id: issue.id
        }, 
        data: {
            title: body.title,
            description: body.description,
        }
    });
    return NextResponse.json(updateIssue);
}
