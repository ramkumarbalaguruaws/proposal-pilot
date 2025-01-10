import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import type { Proposal } from "@/components/ProposalTable";

interface DashboardFiltersProps {
  proposals: Proposal[];
  onFiltersChange: (filters: FilterState) => void;
}

export interface FilterState {
  startDate: Date | undefined;
  endDate: Date | undefined;
  salesDirector: string;
  country: string;
  user: string;
}

export const DashboardFilters = ({
  proposals,
  onFiltersChange,
}: DashboardFiltersProps) => {
  const [filters, setFilters] = useState<FilterState>({
    startDate: undefined,
    endDate: undefined,
    salesDirector: "all",
    country: "all",
    user: "all",
  });

  // Extract unique values for select options
  const salesDirectors = Array.from(
    new Set(proposals.map((p) => p.salesDirector))
  );
  const countries = Array.from(new Set(proposals.map((p) => p.country)));
  const users = ["all", "admin", "user"]; // Example users, adjust based on your needs

  const handleFilterChange = (key: keyof FilterState, value: any) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    onFiltersChange(newFilters);
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-4">
        {/* Date Range Picker - Start Date */}
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className={cn(
                "w-[200px] justify-start text-left font-normal",
                !filters.startDate && "text-muted-foreground"
              )}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {filters.startDate ? (
                format(filters.startDate, "PPP")
              ) : (
                <span>Start Date</span>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0">
            <Calendar
              mode="single"
              selected={filters.startDate}
              onSelect={(date) => handleFilterChange("startDate", date)}
              initialFocus
            />
          </PopoverContent>
        </Popover>

        {/* Date Range Picker - End Date */}
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className={cn(
                "w-[200px] justify-start text-left font-normal",
                !filters.endDate && "text-muted-foreground"
              )}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {filters.endDate ? (
                format(filters.endDate, "PPP")
              ) : (
                <span>End Date</span>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0">
            <Calendar
              mode="single"
              selected={filters.endDate}
              onSelect={(date) => handleFilterChange("endDate", date)}
              initialFocus
            />
          </PopoverContent>
        </Popover>

        {/* Sales Director Filter */}
        <Select
          value={filters.salesDirector}
          onValueChange={(value) => handleFilterChange("salesDirector", value)}
        >
          <SelectTrigger className="w-[200px]">
            <SelectValue placeholder="Sales Director" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Directors</SelectItem>
            {salesDirectors.map((director) => (
              <SelectItem key={director} value={director}>
                {director}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* Country Filter */}
        <Select
          value={filters.country}
          onValueChange={(value) => handleFilterChange("country", value)}
        >
          <SelectTrigger className="w-[200px]">
            <SelectValue placeholder="Country" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Countries</SelectItem>
            {countries.map((country) => (
              <SelectItem key={country} value={country}>
                {country}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* User Filter */}
        <Select
          value={filters.user}
          onValueChange={(value) => handleFilterChange("user", value)}
        >
          <SelectTrigger className="w-[200px]">
            <SelectValue placeholder="User Type" />
          </SelectTrigger>
          <SelectContent>
            {users.map((user) => (
              <SelectItem key={user} value={user}>
                {user.charAt(0).toUpperCase() + user.slice(1)}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};