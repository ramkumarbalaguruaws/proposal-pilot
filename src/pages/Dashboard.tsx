import { Layout } from "@/components/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ProposalSummary } from "@/components/proposals/ProposalSummary";
import { ProposalFilters } from "@/components/proposals/ProposalFilters";
import { useState } from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useQuery } from "@tanstack/react-query";
import { executeQuery } from "@/utils/db";
import type { Proposal } from "@/components/ProposalTable";

const Dashboard = () => {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [priorityFilter, setPriorityFilter] = useState("all");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [columnVisibility, setColumnVisibility] = useState({
    projectName: true,
    priority: true,
    country: true,
    bandwidth: true,
    gateway: true,
    terminalCount: true,
    terminalType: true,
    customer: true,
    salesDirector: true,
    submissionDate: true,
    proposalLink: true,
    commercialValue: true,
    status: true,
    remarks: true,
  });

  const { data: proposals = [] } = useQuery({
    queryKey: ['proposals'],
    queryFn: async () => {
      const result = await executeQuery('SELECT * FROM proposals');
      return result as Proposal[];
    },
  });

  const onExportCSV = () => {
    // CSV export functionality will be implemented later
    console.log("Export to CSV");
  };

  return (
    <Layout>
      <div className="container mx-auto p-6 space-y-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Dashboard</h1>
        </div>

        {/* Summary Section */}
        <section className="mb-8">
          <ProposalSummary proposals={proposals} />
        </section>

        {/* Filters Section */}
        <section className="mb-8">
          <Card>
            <CardHeader>
              <CardTitle>Filters</CardTitle>
            </CardHeader>
            <CardContent>
              <ProposalFilters
                search={search}
                setSearch={setSearch}
                statusFilter={statusFilter}
                setStatusFilter={setStatusFilter}
                priorityFilter={priorityFilter}
                setPriorityFilter={setPriorityFilter}
                columnVisibility={columnVisibility}
                setColumnVisibility={setColumnVisibility}
                startDate={startDate}
                setStartDate={setStartDate}
                endDate={endDate}
                setEndDate={setEndDate}
                onExportCSV={onExportCSV}
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