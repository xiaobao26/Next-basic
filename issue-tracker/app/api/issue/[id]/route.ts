import authOptions from "@/app/auth/authOptions";
import { PatchIssueSchema } from "@/app/validationSchema";
import prisma from "@/prisma/client";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";


export async function PATCH (request: NextRequest, { params}: { params: { id: string }} ) {
    // const session = await getServerSession(authOptions);
    // if (!session) return NextResponse.json({}, { status: 401 });


    // check the body validation
    const body = await request.json();
    const validation = PatchIssueSchema.safeParse(body);
    if (!validation.success) return NextResponse.json(validation.error.format(), { status: 400 })

    // if issue is assigned, check the user validation
    const { assignedToUserId, title, description } = body;
    if (assignedToUserId) {
        const user = await prisma.user.findUnique({
            where: {
                id: assignedToUserId
            }
        });
        if (!user) return NextResponse.json({ error: 'Invalid user id'}, { status: 400 })
    }

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
            title,
            description,
            assignedToUserId,
        }
    });
    return NextResponse.json(updateIssue);
}

export async function DELETE(request: NextRequest, { params}: { params: { id: string }}) {
    const session = await getServerSession(authOptions);
    if (!session) return NextResponse.json({}, { status: 401 });

    // find issue
    const issue = await prisma.issue.findUnique({
        where: {
            id: parseInt(params.id),
        }
    })
    // if not found -> 404
    if (!issue) return NextResponse.json({error: 'Invalid issue id'}, { status: 404 })
    // else delete issue -> 200
    const deleteIssue = await prisma.issue.delete({
        where: {
            id: issue.id
        }
    })
    return NextResponse.json(deleteIssue, { status: 200 })
}
