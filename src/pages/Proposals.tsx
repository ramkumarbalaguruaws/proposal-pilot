import { useState } from "react";
import { Layout } from "@/components/Layout";
import { ProposalTable, type Proposal } from "@/components/ProposalTable";
import { Button } from "@/components/ui/button";
import { ProposalForm } from "@/components/ProposalForm";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

const mockData: Proposal[] = [
  {
    id: 1,
    projectName: "Project Alpha",
    priority: "P1",
    country: "USA",
    bandwidth: "100MHz",
    gateway: "GW-1",
    terminalCount: 100,
    terminalType: "Type-A",
    customer: "Customer 1",
    salesDirector: "John Doe",
    submissionDate: "2024-02-20",
    proposalLink: "https://example.com",
    commercialValue: 1000000,
    status: "ongoing",
    remarks: "In progress",
  },
];

const Proposals = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [proposals, setProposals] = useState<Proposal[]>(mockData);
  const [editingProposal, setEditingProposal] = useState<Proposal | undefined>();

  const handleSubmit = (data: Partial<Proposal>) => {
    if (editingProposal) {
      // Update existing proposal
      setProposals(proposals.map(p => 
        p.id === editingProposal.id ? { ...p, ...data } : p
      ));
      setEditingProposal(undefined);
    } else {
      // Create new proposal
      const newProposal = {
        ...data,
        id: Math.max(0, ...proposals.map(p => p.id)) + 1,
      } as Proposal;
      setProposals([...proposals, newProposal]);
    }
    setIsDialogOpen(false);
  };

  const handleEdit = (proposal: Proposal) => {
    setEditingProposal(proposal);
    setIsDialogOpen(true);
  };

  const handleDelete = (id: number) => {
    setProposals(proposals.filter(p => p.id !== id));
  };

  const handleClose = () => {
    setIsDialogOpen(false);
    setEditingProposal(undefined);
  };

  return (
    <Layout>
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Proposals</h1>
          <Button onClick={() => setIsDialogOpen(true)}>Add New Proposal</Button>
        </div>
        <ProposalTable 
          proposals={proposals}
          onEdit={handleEdit}
          onDelete={handleDelete}
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