import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Layout } from "@/components/Layout";
import { DbCredentialsManager } from "@/components/DbCredentialsManager";
import { executeQuery } from "@/utils/db";
import { useToast } from "@/hooks/use-toast";

interface DashboardStats {
  totalProposals: number;
  activeProjects: number;
  closedProjects: number;
  priorityData: Array<{ name: string; value: number; }>;
}

const Dashboard = () => {
  const [stats, setStats] = useState<DashboardStats>({
    totalProposals: 0,
    activeProjects: 0,
    closedProjects: 0,
    priorityData: []
  });
  const { toast } = useToast();

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        // Fetch total proposals
        const [totalResult] = await executeQuery('SELECT COUNT(*) as total FROM proposals');
        const total = totalResult[0]?.total || 0;

        // Fetch active projects (status = 'approved')
        const [activeResult] = await executeQuery(
          "SELECT COUNT(*) as active FROM proposals WHERE status = 'approved'"
        );
        const active = activeResult[0]?.active || 0;

        // Fetch closed projects (status = 'rejected')
        const [closedResult] = await executeQuery(
          "SELECT COUNT(*) as closed FROM proposals WHERE status = 'rejected'"
        );
        const closed = closedResult[0]?.closed || 0;

        // Fetch priority distribution
        const [priorityResult] = await executeQuery(
          'SELECT priority, COUNT(*) as count FROM proposals GROUP BY priority'
        );
        const priorityData = (priorityResult as any[]).map(row => ({
          name: row.priority.toUpperCase(),
          value: row.count
        }));

        setStats({
          totalProposals: total,
          activeProjects: active,
          closedProjects: closed,
          priorityData
        });
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
        toast({
          title: "Error",
          description: "Failed to fetch dashboard data. Please try again later.",
          variant: "destructive",
        });
      }
    };

    fetchDashboardData();
  }, [toast]);

  return (
    <Layout>
      <div className="p-6">
        <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
        
        {/* Database Credentials Section */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Database Configuration</CardTitle>
          </CardHeader>
          <CardContent>
            <DbCredentialsManager />
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <Card>
            <CardHeader>
              <CardTitle>Total Proposals</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">{stats.totalProposals}</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Active Projects</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">{stats.activeProjects}</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Closed Projects</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">{stats.closedProjects}</p>
            </CardContent>
          </Card>
        </div>
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Proposals by Priority</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={stats.priorityData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="value" fill="#3b82f6" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default Dashboard;