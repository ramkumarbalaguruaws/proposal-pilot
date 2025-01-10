import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import type { Proposal } from "@/components/ProposalTable";

interface DashboardChartsProps {
  proposals: Proposal[];
}

const COLORS = ["#4f46e5", "#ef4444", "#22c55e"];

export const DashboardCharts = ({ proposals }: DashboardChartsProps) => {
  // Prepare data for status distribution pie chart
  const statusData = Object.entries(
    proposals.reduce((acc, proposal) => {
      acc[proposal.status] = (acc[proposal.status] || 0) + 1;
      return acc;
    }, {} as Record<string, number>)
  ).map(([name, value]) => ({ name, value }));

  // Prepare data for status by country
  const countryData = Array.from(
    proposals.reduce((acc, proposal) => {
      if (!acc.has(proposal.country)) {
        acc.set(proposal.country, {
          country: proposal.country,
          ongoing: 0,
          blocked: 0,
          closed: 0,
        });
      }
      const countryStats = acc.get(proposal.country)!;
      countryStats[proposal.status as keyof typeof countryStats]++;
      return acc;
    }, new Map())
  ).map(([_, value]) => value);

  // Prepare data for status by sales director
  const directorData = Array.from(
    proposals.reduce((acc, proposal) => {
      if (!acc.has(proposal.salesDirector)) {
        acc.set(proposal.salesDirector, {
          director: proposal.salesDirector,
          ongoing: 0,
          blocked: 0,
          closed: 0,
        });
      }
      const directorStats = acc.get(proposal.salesDirector)!;
      directorStats[proposal.status as keyof typeof directorStats]++;
      return acc;
    }, new Map())
  ).map(([_, value]) => value);

  return (
    <div className="grid gap-4 md:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle>Status Distribution</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={statusData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) =>
                    `${name} ${(percent * 100).toFixed(0)}%`
                  }
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {statusData.map((_, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Status by Country</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={countryData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="country" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="ongoing" stackId="a" fill={COLORS[0]} />
                <Bar dataKey="blocked" stackId="a" fill={COLORS[1]} />
                <Bar dataKey="closed" stackId="a" fill={COLORS[2]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Status by Sales Director</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={directorData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="director" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="ongoing" stackId="a" fill={COLORS[0]} />
                <Bar dataKey="blocked" stackId="a" fill={COLORS[1]} />
                <Bar dataKey="closed" stackId="a" fill={COLORS[2]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};