import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";
import createIssueSchema from '../../validationSchema';



export async function POST(request: NextRequest) {
    const body = await request.json();
    const validation = createIssueSchema.safeParse(body);

    // create fail bad request
    if (!validation.success) {
        return NextResponse.json(validation.error.format(), { status: 400 });
    }

    // create success 201
    // set prisma client for 1 instance
    const newIssue = await prisma.issue.create({
        data: {
            title: body.title,
            description: body.description,
        }
    })
    return NextResponse.json(newIssue, { status: 201 })
}

