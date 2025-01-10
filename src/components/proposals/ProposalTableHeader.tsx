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
          <TableHead onClick={() => onSort("projectName")} className="cursor-pointer">
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
        {columnVisibility.bandwidth && (
          <TableHead onClick={() => onSort("bandwidth")} className="cursor-pointer">
            Bandwidth <SortIcon field="bandwidth" />
          </TableHead>
        )}
        {columnVisibility.gateway && (
          <TableHead onClick={() => onSort("gateway")} className="cursor-pointer">
            Gateway <SortIcon field="gateway" />
          </TableHead>
        )}
        {columnVisibility.terminalCount && (
          <TableHead onClick={() => onSort("terminalCount")} className="cursor-pointer">
            Terminal Count <SortIcon field="terminalCount" />
          </TableHead>
        )}
        {columnVisibility.terminalType && (
          <TableHead onClick={() => onSort("terminalType")} className="cursor-pointer">
            Terminal Type <SortIcon field="terminalType" />
          </TableHead>
        )}
        {columnVisibility.customer && (
          <TableHead onClick={() => onSort("customer")} className="cursor-pointer">
            Customer <SortIcon field="customer" />
          </TableHead>
        )}
        {columnVisibility.salesDirector && (
          <TableHead onClick={() => onSort("salesDirector")} className="cursor-pointer">
            Sales Director <SortIcon field="salesDirector" />
          </TableHead>
        )}
        {columnVisibility.submissionDate && (
          <TableHead onClick={() => onSort("submissionDate")} className="cursor-pointer">
            Submission Date <SortIcon field="submissionDate" />
          </TableHead>
        )}
        {columnVisibility.proposalLink && (
          <TableHead onClick={() => onSort("proposalLink")} className="cursor-pointer">
            Proposal Link <SortIcon field="proposalLink" />
          </TableHead>
        )}
        {columnVisibility.commercialValue && (
          <TableHead onClick={() => onSort("commercialValue")} className="cursor-pointer">
            Commercial Value <SortIcon field="commercialValue" />
          </TableHead>
        )}
        {columnVisibility.status && (
          <TableHead onClick={() => onSort("status")} className="cursor-pointer">
            Status <SortIcon field="status" />
          </TableHead>
        )}
        {columnVisibility.remarks && (
          <TableHead onClick={() => onSort("remarks")} className="cursor-pointer">
            Remarks <SortIcon field="remarks" />
          </TableHead>
        )}
        <TableHead>Actions</TableHead>
      </TableRow>
    </TableHeader>
  );
};