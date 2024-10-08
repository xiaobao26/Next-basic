import prisma from "@/prisma/client"
import { Table } from "@radix-ui/themes"
import { IssueStateBadge, Link } from '@/app/components'

import IssueActionsButton from "./IssueActionsButton";


export default async function Home() {
  const issues = await prisma.issue.findMany();

  
  return (
    <>
      <IssueActionsButton />
      <Table.Root variant="surface">
          <Table.Header>
            <Table.Row>
              <Table.ColumnHeaderCell>Title</Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell className="hidden md:table-cell">Status</Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell className="hidden md:table-cell">Created</Table.ColumnHeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            {issues.map((issue) => (
              <Table.Row key={issue.id}>
                <Table.Cell>
                  <Link href={`/issues/${issue.id}`}>
                    {issue.title}
                  </Link>
                  <div className="block md:hidden mt-1">
                    <IssueStateBadge status={issue.status} />
                  </div>
                </Table.Cell>
                <Table.Cell  className="hidden md:table-cell">
                  <IssueStateBadge status={issue.status} />
                </Table.Cell>
                <Table.Cell  className="hidden md:table-cell">{issue.createAt.toDateString()}</Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
      </Table.Root>

    </>
  )
}
