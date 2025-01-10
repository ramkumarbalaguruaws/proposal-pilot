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
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 mb-6">
      <Card>
        <CardHeader>
          <CardTitle>Total Proposals</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-2xl font-bold">{proposals.length}</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Total Commercial Value</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-2xl font-bold">
            ${totalValue.toLocaleString()}
          </p>
        </CardContent>
      </Card>
      <Card className="md:col-span-2 lg:col-span-1">
        <CardHeader>
          <CardTitle>Proposals by Status</CardTitle>
        </CardHeader>
        <CardContent>
          <BarChart width={300} height={200} data={statusData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="value" fill="#4f46e5" />
          </BarChart>
        </CardContent>
      </Card>
    </div>
  );
};