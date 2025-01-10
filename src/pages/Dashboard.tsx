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

  const { data: proposals = [], isLoading, error } = useQuery({
    queryKey: ['proposals'],
    queryFn: async () => {
      const result = await executeQuery('SELECT * FROM proposals');
      return result as Proposal[];
    },
  });

  if (isLoading) {
    return (
      <Layout>
        <div className="container mx-auto p-6">
          <div className="flex justify-center items-center h-[60vh]">
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>
          </div>
        </div>
      </Layout>
    );
  }

  if (error) {
    return (
      <Layout>
        <div className="container mx-auto p-6">
          <div className="text-red-500">Error loading proposals: {(error as Error).message}</div>
        </div>
      </Layout>
    );
  }

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

        <section className="mb-8">
          <ProposalSummary proposals={filteredProposals} />
        </section>

        <section className="mb-8">
          <DashboardFilters
            proposals={proposals}
            onFiltersChange={setFilters}
          />
        </section>

        <section className="mb-8">
          <DashboardCharts proposals={filteredProposals} />
        </section>
      </div>
    </Layout>
  );
};

export default Dashboard;