import prisma from "@/lib/prisma";
import { notFound } from "next/navigation";
import { Box, Card, Flex, Grid, Heading, Text } from "@radix-ui/themes";
import IssueStatusBadge from "@/app/components/issueStatusBadge";
import ReactMarkdown from "react-markdown";
import EditIssueButton from "./editIssueButton";
import DeleteIssueButton from "./deleteIssueButton";

interface Props {
    params: Promise<{ id: string }>;
}

async function IssueDetailPage({ params }: Props) {
    const { id } = await params;

    const issue = await prisma.issue.findUnique({
        where: { id: parseInt(id) },
    });

    if (!issue) notFound();

    return (
        <Grid columns={{ initial: '1', sm: '5' }} gap="5">
            <Box className="md:col-span-4">
                <Heading>{issue.title}</Heading>
                <Flex className="space-x-3" my="2">
                    <IssueStatusBadge status={issue.status} />
                    <Text>{issue.createdAt.toDateString()}</Text>
                </Flex>
                <Card className="prose max-w-full" mt="4">
                    <ReactMarkdown>{issue.description}</ReactMarkdown>
                </Card>
            </Box>

            <Box>
                <Flex direction="column" gap="4">
                    <EditIssueButton issueId={issue.id} />
                    <DeleteIssueButton issueId={issue.id} />
                </Flex>
            </Box>
        </Grid>
    );
}

export async function generateMetadata({ params }: Props) {
    const { id } = await params;
    const issue = await prisma.issue.findUnique({ where: { id: parseInt(id) } });

    return {
        title: issue?.title,
        description: 'Details of issue ' + issue?.id,
    };
}

export default IssueDetailPage;
