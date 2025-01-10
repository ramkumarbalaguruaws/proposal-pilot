import { Layout } from "@/components/Layout";
import { ProposalSummary } from "@/components/proposals/ProposalSummary";
import { DashboardFilters, type FilterState } from "@/components/dashboard/DashboardFilters";
import { DashboardCharts } from "@/components/dashboard/DashboardCharts";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { executeQuery } from "@/utils/db";
import type { Proposal } from "@/components/ProposalTable";

const Dashboard = () => {
  const [filters, setFilters] = useState<FilterState>({
    startDate: undefined,
    endDate: undefined,
    salesDirector: "all",
    country: "all",
    user: "all",
  });

  const { data: proposals = [] } = useQuery({
    queryKey: ['proposals'],
    queryFn: async () => {
      const result = await executeQuery('SELECT * FROM proposals');
      return result as Proposal[];
    },
  });

  const filteredProposals = proposals.filter((proposal) => {
    const matchesDate =
      (!filters.startDate || new Date(proposal.submissionDate) >= filters.startDate) &&
      (!filters.endDate || new Date(proposal.submissionDate) <= filters.endDate);
    const matchesSalesDirector =
      filters.salesDirector === "all" || proposal.salesDirector === filters.salesDirector;
    const matchesCountry =
      filters.country === "all" || proposal.country === filters.country;
    
    return matchesDate && matchesSalesDirector && matchesCountry;
  });

  return (
    <Layout>
      <div className="container mx-auto p-6 space-y-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Dashboard</h1>
        </div>

        {/* Summary Section */}
        <section className="mb-8">
          <ProposalSummary proposals={filteredProposals} />
        </section>

        {/* Filters Section */}
        <section className="mb-8">
          <DashboardFilters
            proposals={proposals}
            onFiltersChange={setFilters}
          />
        </section>

        {/* Charts Section */}
        <section className="mb-8">
          <DashboardCharts proposals={filteredProposals} />
        </section>
      </div>
    </Layout>
  );
};

export default Dashboard;