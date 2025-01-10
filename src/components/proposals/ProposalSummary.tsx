import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts";
import type { Proposal } from "../ProposalTable";

interface ProposalSummaryProps {
  proposals: Proposal[];
}

export const ProposalSummary = ({ proposals }: ProposalSummaryProps) => {
  const totalValue = proposals.reduce(
    (sum, proposal) => sum + proposal.commercialValue,
    0
  );

  const statusCount = proposals.reduce((acc, proposal) => {
    acc[proposal.status] = (acc[proposal.status] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const statusData = Object.entries(statusCount).map(([name, value]) => ({
    name,
    value,
  }));

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-6">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Proposals</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{proposals.length}</div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Value</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            ${totalValue.toLocaleString()}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Status Breakdown</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-1">
            <div className="text-sm">
              Ongoing: {statusCount['ongoing'] || 0}
            </div>
            <div className="text-sm">
              Blocked: {statusCount['blocked'] || 0}
            </div>
            <div className="text-sm">
              Closed: {statusCount['closed'] || 0}
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Status Distribution</CardTitle>
        </CardHeader>
        <CardContent>
          <BarChart width={200} height={100} data={statusData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" tick={{ fontSize: 10 }} />
            <YAxis tick={{ fontSize: 10 }} />
            <Tooltip />
            <Bar dataKey="value" fill="#4f46e5" />
          </BarChart>
        </CardContent>
      </Card>
    </div>
  );
};