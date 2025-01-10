import { useState } from "react";
import { Table, TableBody } from "@/components/ui/table";
import { useToast } from "@/components/ui/use-toast";
import { ProposalFilters } from "./proposals/ProposalFilters";
import { ProposalTableHeader } from "./proposals/ProposalTableHeader";
import { ProposalTableRow } from "./proposals/ProposalTableRow";
import { ProposalTablePagination } from "./proposals/ProposalTablePagination";

export type Proposal = {
  id: number;
  projectName: string;
  priority: string;
  country: string;
  bandwidth: string;
  gateway: string;
  terminalCount: number;
  terminalType: string;
  customer: string;
  salesDirector: string;
  submissionDate: string;
  proposalLink: string;
  commercialValue: number;
  status: string;
  remarks: string;
};

interface ProposalTableProps {
  proposals: Proposal[];
  onEdit: (proposal: Proposal) => void;
  onDelete: (id: number) => void;
}

export const ProposalTable = ({
  proposals,
  onEdit,
  onDelete,
}: ProposalTableProps) => {
  const { toast } = useToast();
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [priorityFilter, setPriorityFilter] = useState<string>("all");
  const [sortField, setSortField] = useState<keyof Proposal>("projectName");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");
  const [currentPage, setCurrentPage] = useState(1);
  const [columnVisibility, setColumnVisibility] = useState({
    projectName: true,
    priority: true,
    country: true,
    bandwidth: true,
    gateway: true,
    terminalCount: true,
    terminalType: true,
    customer: true,
    salesDirector: true,
    submissionDate: true,
    proposalLink: true,
    commercialValue: true,
    status: true,
    remarks: true,
  });

  const itemsPerPage = 10;

  const handleDelete = (id: number) => {
    if (window.confirm("Are you sure you want to delete this proposal?")) {
      onDelete(id);
      toast({
        title: "Proposal deleted",
        description: "The proposal has been successfully deleted.",
      });
    }
  };

  const handleSort = (field: keyof Proposal) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  const filteredProposals = proposals
    .filter((proposal) => {
      const matchesSearch =
        proposal.projectName.toLowerCase().includes(search.toLowerCase()) ||
        proposal.customer.toLowerCase().includes(search.toLowerCase()) ||
        proposal.salesDirector.toLowerCase().includes(search.toLowerCase());
      const matchesStatus =
        statusFilter === "all" || proposal.status === statusFilter;
      const matchesPriority =
        priorityFilter === "all" || proposal.priority === priorityFilter;
      return matchesSearch && matchesStatus && matchesPriority;
    })
    .sort((a, b) => {
      const aValue = a[sortField];
      const bValue = b[sortField];
      const direction = sortDirection === "asc" ? 1 : -1;
      return aValue < bValue ? -1 * direction : aValue > bValue ? 1 * direction : 0;
    });

  const totalPages = Math.ceil(filteredProposals.length / itemsPerPage);
  const paginatedProposals = filteredProposals.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="space-y-4">
      <ProposalFilters
        search={search}
        setSearch={setSearch}
        statusFilter={statusFilter}
        setStatusFilter={setStatusFilter}
        priorityFilter={priorityFilter}
        setPriorityFilter={setPriorityFilter}
        columnVisibility={columnVisibility}
        setColumnVisibility={setColumnVisibility}
      />

      <div className="border rounded-lg">
        <Table>
          <ProposalTableHeader
            columnVisibility={columnVisibility}
            sortField={sortField}
            sortDirection={sortDirection}
            onSort={handleSort}
          />
          <TableBody>
            {paginatedProposals.map((row) => (
              <ProposalTableRow
                key={row.id}
                row={row}
                columnVisibility={columnVisibility}
                onEdit={onEdit}
                onDelete={handleDelete}
              />
            ))}
          </TableBody>
        </Table>
      </div>

      <ProposalTablePagination
        currentPage={currentPage}
        totalPages={totalPages}
        setCurrentPage={setCurrentPage}
      />
    </div>
  );
};