import prisma from "@/lib/prisma";
import { notFound } from "next/navigation";
import IssueForm from "@/app/issues/_components/issueForm";

interface Props {
    params: Promise<{ id: string }>;
}

async function EditIssuePage({ params }: Props) {
    const { id } = await params;

    const issue = await prisma.issue.findUnique({
        where: { id: parseInt(id) },
    });

    if (!issue) notFound();

    return <IssueForm issue={issue} />;
}

export default EditIssuePage;
