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

const mockData = [
  {
    id: 1,
    projectName: "Project Alpha",
    priority: "P1",
    country: "USA",
    bandwidth: "100MHz",
    gateway: "GW-1",
    terminalCount: 100,
    terminalType: "Type-A",
    customer: "Customer 1",
    salesDirector: "John Doe",
    submissionDate: "2024-02-20",
    proposalLink: "https://example.com",
    commercialValue: 1000000,
    status: "ongoing",
    remarks: "In progress",
  },
];

export const ProposalTable = () => {
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
          {mockData.map((row) => (
            <TableRow key={row.id}>
              <TableCell>{row.projectName}</TableCell>
              <TableCell>{row.priority}</TableCell>
              <TableCell>{row.country}</TableCell>
              <TableCell>{row.status}</TableCell>
              <TableCell>{row.customer}</TableCell>
              <TableCell>{row.salesDirector}</TableCell>
              <TableCell>
                <div className="flex space-x-2">
                  <Button variant="ghost" size="icon">
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon">
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