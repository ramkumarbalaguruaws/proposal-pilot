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
  user_id: number;
};

export type ColumnVisibility = {
  projectName: boolean;
  priority: boolean;
  country: boolean;
  bandwidth: boolean;
  gateway: boolean;
  terminalCount: boolean;
  terminalType: boolean;
  customer: boolean;
  salesDirector: boolean;
  submissionDate: boolean;
  proposalLink: boolean;
  commercialValue: boolean;
  status: boolean;
  remarks: boolean;
};

interface ProposalTableProps {
  proposals: Proposal[];
  onEdit: (proposal: Proposal) => void;
  onDelete: (id: number) => void;
  startDate: string;
  endDate: string;
  setStartDate: (date: string) => void;
  setEndDate: (date: string) => void;
  onExportCSV: () => void;
}

export const ProposalTable = ({
  proposals,
  onEdit,
  onDelete,
  startDate,
  endDate,
  setStartDate,
  setEndDate,
  onExportCSV,
}: ProposalTableProps) => {
  const { toast } = useToast();
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [priorityFilter, setPriorityFilter] = useState<string>("all");
  const [sortField, setSortField] = useState<keyof Proposal>("projectName");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");
  const [currentPage, setCurrentPage] = useState(1);
  const [columnVisibility, setColumnVisibility] = useState<ColumnVisibility>({
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

  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const isAdmin = user.role === "admin";

  // Filter proposals based on user role and user_id
  const userProposals = isAdmin 
    ? proposals 
    : proposals.filter(proposal => proposal.user_id === user.id);

  const itemsPerPage = 10;

  const handleDelete = (id: number) => {
    if (!isAdmin) {
      toast({
        variant: "destructive",
        title: "Access Denied",
        description: "Only administrators can delete proposals.",
      });
      return;
    }

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

  const filteredProposals = userProposals
    .filter((proposal) => {
      const matchesSearch =
        proposal.projectName.toLowerCase().includes(search.toLowerCase()) ||
        proposal.customer.toLowerCase().includes(search.toLowerCase()) ||
        proposal.salesDirector.toLowerCase().includes(search.toLowerCase());
      const matchesStatus =
        statusFilter === "all" || proposal.status === statusFilter;
      const matchesPriority =
        priorityFilter === "all" || proposal.priority === priorityFilter;
      const matchesDateRange =
        (!startDate ||
          new Date(proposal.submissionDate) >= new Date(startDate)) &&
        (!endDate || new Date(proposal.submissionDate) <= new Date(endDate));
      return (
        matchesSearch && matchesStatus && matchesPriority && matchesDateRange
      );
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
        startDate={startDate}
        setStartDate={setStartDate}
        endDate={endDate}
        setEndDate={setEndDate}
        onExportCSV={onExportCSV}
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
                onEdit={isAdmin ? onEdit : () => {
                  toast({
                    variant: "destructive",
                    title: "Access Denied",
                    description: "Only administrators can edit proposals.",
                  });
                }}
                onDelete={handleDelete}
                isAdmin={isAdmin}
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
