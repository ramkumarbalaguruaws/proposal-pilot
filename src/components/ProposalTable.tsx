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
import { Edit, Trash2, ChevronUp, ChevronDown, Filter, Settings2 } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

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
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [priorityFilter, setPriorityFilter] = useState<string>("all");
  const [sortField, setSortField] = useState<keyof Proposal>("projectName");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Column visibility state
  const [columnVisibility, setColumnVisibility] = useState({
    projectName: true,
    priority: true,
    country: true,
    status: true,
    customer: true,
    salesDirector: true,
  });

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

  const SortIcon = ({ field }: { field: keyof Proposal }) => {
    if (sortField !== field) return null;
    return sortDirection === "asc" ? (
      <ChevronUp className="h-4 w-4 inline" />
    ) : (
      <ChevronDown className="h-4 w-4 inline" />
    );
  };

  // Filter and sort proposals
  const filteredProposals = proposals
    .filter((proposal) => {
      const matchesSearch = proposal.projectName.toLowerCase().includes(search.toLowerCase()) ||
        proposal.customer.toLowerCase().includes(search.toLowerCase()) ||
        proposal.salesDirector.toLowerCase().includes(search.toLowerCase());
      const matchesStatus = statusFilter === "all" || proposal.status === statusFilter;
      const matchesPriority = priorityFilter === "all" || proposal.priority === priorityFilter;
      return matchesSearch && matchesStatus && matchesPriority;
    })
    .sort((a, b) => {
      const aValue = a[sortField];
      const bValue = b[sortField];
      const direction = sortDirection === "asc" ? 1 : -1;
      return aValue < bValue ? -1 * direction : aValue > bValue ? 1 * direction : 0;
    });

  // Pagination
  const totalPages = Math.ceil(filteredProposals.length / itemsPerPage);
  const paginatedProposals = filteredProposals.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="space-y-4">
      <Card className="p-4">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <Filter className="h-4 w-4 text-muted-foreground" />
            <h3 className="font-medium">Filters</h3>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="ml-auto">
                <Settings2 className="h-4 w-4 mr-2" />
                View
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {Object.entries(columnVisibility).map(([key, value]) => (
                <DropdownMenuCheckboxItem
                  key={key}
                  className="capitalize"
                  checked={value}
                  onCheckedChange={(checked) =>
                    setColumnVisibility((prev) => ({ ...prev, [key]: checked }))
                  }
                >
                  {key.replace(/([A-Z])/g, ' $1').trim()}
                </DropdownMenuCheckboxItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <Input
              placeholder="Search projects, customers, or sales directors..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full"
            />
          </div>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Statuses</SelectItem>
              <SelectItem value="ongoing">Ongoing</SelectItem>
              <SelectItem value="blocked">Blocked</SelectItem>
              <SelectItem value="closed">Closed</SelectItem>
            </SelectContent>
          </Select>
          <Select value={priorityFilter} onValueChange={setPriorityFilter}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by priority" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Priorities</SelectItem>
              <SelectItem value="P1">P1</SelectItem>
              <SelectItem value="P2">P2</SelectItem>
              <SelectItem value="P3">P3</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </Card>

      <div className="border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              {columnVisibility.projectName && (
                <TableHead onClick={() => handleSort("projectName")} className="cursor-pointer">
                  Project Name <SortIcon field="projectName" />
                </TableHead>
              )}
              {columnVisibility.priority && (
                <TableHead onClick={() => handleSort("priority")} className="cursor-pointer">
                  Priority <SortIcon field="priority" />
                </TableHead>
              )}
              {columnVisibility.country && (
                <TableHead onClick={() => handleSort("country")} className="cursor-pointer">
                  Country <SortIcon field="country" />
                </TableHead>
              )}
              {columnVisibility.status && (
                <TableHead onClick={() => handleSort("status")} className="cursor-pointer">
                  Status <SortIcon field="status" />
                </TableHead>
              )}
              {columnVisibility.customer && (
                <TableHead onClick={() => handleSort("customer")} className="cursor-pointer">
                  Customer <SortIcon field="customer" />
                </TableHead>
              )}
              {columnVisibility.salesDirector && (
                <TableHead onClick={() => handleSort("salesDirector")} className="cursor-pointer">
                  Sales Director <SortIcon field="salesDirector" />
                </TableHead>
              )}
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedProposals.map((row) => (
              <TableRow key={row.id}>
                {columnVisibility.projectName && <TableCell>{row.projectName}</TableCell>}
                {columnVisibility.priority && <TableCell>{row.priority}</TableCell>}
                {columnVisibility.country && <TableCell>{row.country}</TableCell>}
                {columnVisibility.status && <TableCell>{row.status}</TableCell>}
                {columnVisibility.customer && <TableCell>{row.customer}</TableCell>}
                {columnVisibility.salesDirector && <TableCell>{row.salesDirector}</TableCell>}
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

      {totalPages > 1 && (
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                className={currentPage === 1 ? "pointer-events-none opacity-50" : "cursor-pointer"}
              />
            </PaginationItem>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <PaginationItem key={page}>
                <PaginationLink
                  onClick={() => setCurrentPage(page)}
                  isActive={currentPage === page}
                >
                  {page}
                </PaginationLink>
              </PaginationItem>
            ))}
            <PaginationItem>
              <PaginationNext
                onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                className={currentPage === totalPages ? "pointer-events-none opacity-50" : "cursor-pointer"}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      )}
    </div>
  );
};
