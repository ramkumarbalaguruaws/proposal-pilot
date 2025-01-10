import { ChevronUp, ChevronDown } from "lucide-react";
import { TableHead, TableHeader, TableRow } from "@/components/ui/table";
import type { Proposal } from "../ProposalTable";

interface ProposalTableHeaderProps {
  columnVisibility: Record<string, boolean>;
  sortField: keyof Proposal;
  sortDirection: "asc" | "desc";
  onSort: (field: keyof Proposal) => void;
}

export const ProposalTableHeader = ({
  columnVisibility,
  sortField,
  sortDirection,
  onSort,
}: ProposalTableHeaderProps) => {
  const SortIcon = ({ field }: { field: keyof Proposal }) => {
    if (sortField !== field) return null;
    return sortDirection === "asc" ? (
      <ChevronUp className="h-4 w-4 inline" />
    ) : (
      <ChevronDown className="h-4 w-4 inline" />
    );
  };

  return (
    <TableHeader>
      <TableRow>
        {columnVisibility.projectName && (
          <TableHead
            onClick={() => onSort("projectName")}
            className="cursor-pointer"
          >
            Project Name <SortIcon field="projectName" />
          </TableHead>
        )}
        {columnVisibility.priority && (
          <TableHead onClick={() => onSort("priority")} className="cursor-pointer">
            Priority <SortIcon field="priority" />
          </TableHead>
        )}
        {columnVisibility.country && (
          <TableHead onClick={() => onSort("country")} className="cursor-pointer">
            Country <SortIcon field="country" />
          </TableHead>
        )}
        {columnVisibility.status && (
          <TableHead onClick={() => onSort("status")} className="cursor-pointer">
            Status <SortIcon field="status" />
          </TableHead>
        )}
        {columnVisibility.customer && (
          <TableHead onClick={() => onSort("customer")} className="cursor-pointer">
            Customer <SortIcon field="customer" />
          </TableHead>
        )}
        {columnVisibility.salesDirector && (
          <TableHead
            onClick={() => onSort("salesDirector")}
            className="cursor-pointer"
          >
            Sales Director <SortIcon field="salesDirector" />
          </TableHead>
        )}
        <TableHead>Actions</TableHead>
      </TableRow>
    </TableHeader>
  );
};