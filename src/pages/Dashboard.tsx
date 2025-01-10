import { Layout } from "@/components/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ProposalSummary } from "@/components/proposals/ProposalSummary";
import { DashboardFilters, type FilterState } from "@/components/dashboard/DashboardFilters";
import { useState } from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
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
    // User filter can be implemented based on your user management system
    
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
          <Card>
            <CardHeader>
              <CardTitle>Filters</CardTitle>
            </CardHeader>
            <CardContent>
              <DashboardFilters
                proposals={proposals}
                onFiltersChange={setFilters}
              />
            </CardContent>
          </Card>
        </section>

        {/* Charts Section */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Proposals by Priority</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={proposals}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="priority" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="commercialValue" fill="#3b82f6" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Proposals by Status</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={proposals}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="status" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="commercialValue" fill="#4f46e5" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </section>
      </div>
    </Layout>
  );
};

export default Dashboard;
