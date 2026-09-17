import { NextRequest, NextResponse } from "next/server";
import { patchIssueSchema } from "@/app/validationSchemas";
import prisma from "@/lib/prisma";
import { auth } from "@/lib/auth";

interface Params {
    params: Promise<{ id: string }>;
}

export async function GET(request: NextRequest, { params }: Params) {
    const { id } = await params;

    const issue = await prisma.issue.findUnique({
        where: { id: parseInt(id) },
    });

    if (!issue) return NextResponse.json({ error: "Issue not found." }, { status: 404 });

    return NextResponse.json(issue);
}

export async function PATCH(request: NextRequest, { params }: Params) {
    const session = await auth();
    if (!session) return NextResponse.json({}, { status: 401 });

    const body = await request.json();
    const validation = patchIssueSchema.safeParse(body);

    if (!validation.success) {
        return NextResponse.json(validation.error.message, { status: 400 });
    }

    const { assignedToUserId, title, description } = body;

    if (assignedToUserId) {
        const user = await prisma.user.findUnique({
            where: { id: assignedToUserId },
        });
        if (!user)
            return NextResponse.json({ error: "Invalid user." }, { status: 400 });
    }

    const { id } = await params;

    const issue = await prisma.issue.findUnique({
        where: { id: parseInt(id) },
    });

    if (!issue) return NextResponse.json({ error: "Issue not found." }, { status: 404 });

    const updatedIssue = await prisma.issue.update({
        where: { id: issue.id },
        data: {
            title,
            description,
            assignedToUserId,
        },
    });

    return NextResponse.json(updatedIssue);
}

export async function DELETE(request: NextRequest, { params }: Params) {
    const session = await auth();
    if (!session) return NextResponse.json({}, { status: 401 });

    const { id } = await params;

    const issue = await prisma.issue.findUnique({
        where: { id: parseInt(id) },
    });

    if (!issue) return NextResponse.json({ error: "Issue not found." }, { status: 404 });

    await prisma.issue.delete({
        where: { id: issue.id },
    });

    return NextResponse.json({});
}
