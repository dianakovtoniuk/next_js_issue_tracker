import {Button, Table} from "@radix-ui/themes";
import Link from "next/link";
import prisma from "@/lib/prisma";
import IssueStatusBadge from "../components/issueStatusBadge";


async function IssuesPage() {

    const issues = await prisma.issue.findMany();

  return (
    <div>

        <div className="mb-4">
           <Button>
                <Link href='issues/new'>New Issue</Link>
            </Button> 
        </div>
        

        <Table.Root variant="surface">
            <Table.Header>
                <Table.Row>
                    <Table.ColumnHeaderCell className="hidden md:table-cell">Issue</Table.ColumnHeaderCell>
                    <Table.ColumnHeaderCell className="hidden md:table-cell">Status</Table.ColumnHeaderCell>
                    <Table.ColumnHeaderCell className="hidden md:table-cell">Created at</Table.ColumnHeaderCell>
                </Table.Row>
            </Table.Header>

            <Table.Body>
                {
                    issues.map((el: any) => (
                        <Table.Row key={el.id}>
                            <Table.Cell className="hidden md:table-cell">
                                <Link href={`/issues/${el.id}`}>
                                    {el.title}
                                </Link>
                                <div className="block md:hidden">
                                    <IssueStatusBadge status={el.status} />
                                </div>
                            </Table.Cell>
                            <Table.Cell className="hidden md:table-cell">
                                <IssueStatusBadge status={el.status} />
                            </Table.Cell>
                            <Table.Cell className="hidden md:table-cell">{el.createdAt.toDateString()}</Table.Cell>
                        </Table.Row>
                    ))
                }
            </Table.Body>
        </Table.Root>
    </div>
  )
}

export default IssuesPage;