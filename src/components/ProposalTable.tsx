import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Edit, Trash2 } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

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

export const ProposalTable = ({ proposals, onEdit, onDelete }: ProposalTableProps) => {
  const { toast } = useToast();
  
  const handleDelete = (id: number) => {
    if (window.confirm("Are you sure you want to delete this proposal?")) {
      onDelete(id);
      toast({
        title: "Proposal deleted",
        description: "The proposal has been successfully deleted.",
      });
    }
  };

  return (
    <div className="border rounded-lg">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Project Name</TableHead>
            <TableHead>Priority</TableHead>
            <TableHead>Country</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Customer</TableHead>
            <TableHead>Sales Director</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {proposals.map((row) => (
            <TableRow key={row.id}>
              <TableCell>{row.projectName}</TableCell>
              <TableCell>{row.priority}</TableCell>
              <TableCell>{row.country}</TableCell>
              <TableCell>{row.status}</TableCell>
              <TableCell>{row.customer}</TableCell>
              <TableCell>{row.salesDirector}</TableCell>
              <TableCell>
                <div className="flex space-x-2">
                  <Button variant="ghost" size="icon" onClick={() => onEdit(row)}>
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon" onClick={() => handleDelete(row.id)}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};