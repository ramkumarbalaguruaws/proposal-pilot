import { Filter, Settings2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface ProposalFiltersProps {
  search: string;
  setSearch: (value: string) => void;
  statusFilter: string;
  setStatusFilter: (value: string) => void;
  priorityFilter: string;
  setPriorityFilter: (value: string) => void;
  columnVisibility: Record<string, boolean>;
  setColumnVisibility: (value: Record<string, boolean>) => void;
}

export const ProposalFilters = ({
  search,
  setSearch,
  statusFilter,
  setStatusFilter,
  priorityFilter,
  setPriorityFilter,
  columnVisibility,
  setColumnVisibility,
}: ProposalFiltersProps) => {
  return (
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
                {key.replace(/([A-Z])/g, " $1").trim()}
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
  );
};