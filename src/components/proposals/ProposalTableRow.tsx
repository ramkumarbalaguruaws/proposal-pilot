import { Edit, Trash2 } from "lucide-react";
import { TableCell, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import type { Proposal } from "../ProposalTable";

interface ProposalTableRowProps {
  row: Proposal;
  columnVisibility: Record<string, boolean>;
  onEdit: (proposal: Proposal) => void;
  onDelete: (id: number) => void;
}

export const ProposalTableRow = ({
  row,
  columnVisibility,
  onEdit,
  onDelete,
}: ProposalTableRowProps) => {
  return (
    <TableRow key={row.id}>
      {columnVisibility.projectName && <TableCell>{row.projectName}</TableCell>}
      {columnVisibility.priority && <TableCell>{row.priority}</TableCell>}
      {columnVisibility.country && <TableCell>{row.country}</TableCell>}
      {columnVisibility.status && <TableCell>{row.status}</TableCell>}
      {columnVisibility.customer && <TableCell>{row.customer}</TableCell>}
      {columnVisibility.salesDirector && (
        <TableCell>{row.salesDirector}</TableCell>
      )}
      <TableCell>
        <div className="flex space-x-2">
          <Button variant="ghost" size="icon" onClick={() => onEdit(row)}>
            <Edit className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" onClick={() => onDelete(row.id)}>
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </TableCell>
    </TableRow>
  );
};