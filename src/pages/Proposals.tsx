import { useState } from "react";
import { Layout } from "@/components/Layout";
import { ProposalTable, type Proposal } from "@/components/ProposalTable";
import { Button } from "@/components/ui/button";
import { ProposalForm } from "@/components/ProposalForm";
import { ProposalSummary } from "@/components/proposals/ProposalSummary";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useToast } from "@/components/ui/use-toast";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { executeQuery } from "@/utils/db";

const Proposals = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingProposal, setEditingProposal] = useState<Proposal | undefined>();
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const { data: proposals = [], isLoading } = useQuery({
    queryKey: ['proposals'],
    queryFn: async () => {
      const result = await executeQuery('SELECT * FROM proposals');
      return result as Proposal[];
    },
  });

  const handleSubmit = async (data: Partial<Proposal>) => {
    try {
      if (editingProposal) {
        await executeQuery(
          'UPDATE proposals SET ? WHERE id = ?',
          [data, editingProposal.id]
        );
        toast({
          title: "Success",
          description: "Proposal updated successfully",
        });
      } else {
        await executeQuery('INSERT INTO proposals SET ?', [data]);
        toast({
          title: "Success",
          description: "Proposal created successfully",
        });
      }
      queryClient.invalidateQueries({ queryKey: ['proposals'] });
      setIsDialogOpen(false);
      setEditingProposal(undefined);
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to save proposal",
      });
    }
  };

  const handleEdit = (proposal: Proposal) => {
    setEditingProposal(proposal);
    setIsDialogOpen(true);
  };

  const handleDelete = async (id: number) => {
    try {
      await executeQuery('DELETE FROM proposals WHERE id = ?', [id]);
      queryClient.invalidateQueries({ queryKey: ['proposals'] });
      toast({
        title: "Success",
        description: "Proposal deleted successfully",
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to delete proposal",
      });
    }
  };

  const handleClose = () => {
    setIsDialogOpen(false);
    setEditingProposal(undefined);
  };

  const handleExportCSV = () => {
    const headers = [
      "Project Name",
      "Priority",
      "Country",
      "Bandwidth",
      "Gateway",
      "Terminal Count",
      "Terminal Type",
      "Customer",
      "Sales Director",
      "Submission Date",
      "Commercial Value",
      "Status",
      "Remarks",
    ];

    const csvContent = [
      headers.join(","),
      ...proposals.map((p) =>
        [
          p.projectName,
          p.priority,
          p.country,
          p.bandwidth,
          p.gateway,
          p.terminalCount,
          p.terminalType,
          p.customer,
          p.salesDirector,
          p.submissionDate,
          p.commercialValue,
          p.status,
          p.remarks,
        ]
          .map((value) => `"${value}"`)
          .join(",")
      ),
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "proposals.csv";
    link.click();

    toast({
      title: "Export Successful",
      description: "The proposals have been exported to CSV.",
    });
  };

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

  return (
    <Layout>
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Proposals</h1>
          <Button onClick={() => setIsDialogOpen(true)}>Add New Proposal</Button>
        </div>

        <ProposalSummary proposals={proposals} />
        
        <ProposalTable 
          proposals={proposals}
          onEdit={handleEdit}
          onDelete={handleDelete}
          startDate={startDate}
          endDate={endDate}
          setStartDate={setStartDate}
          setEndDate={setEndDate}
          onExportCSV={handleExportCSV}
        />

        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent className="max-w-3xl">
            <DialogHeader>
              <DialogTitle>
                {editingProposal ? "Edit" : "Add New"} Proposal
              </DialogTitle>
            </DialogHeader>
            <ProposalForm
              onClose={handleClose}
              onSubmit={handleSubmit}
              editingProposal={editingProposal}
            />
          </DialogContent>
        </Dialog>
      </div>
    </Layout>
  );
};

export default Proposals;