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

// Dummy data with realistic proposal examples
const initialProposals: Proposal[] = [
  {
    id: 1,
    projectName: "Global Satellite Network Expansion",
    priority: "P1",
    country: "United States",
    bandwidth: "500 MHz",
    gateway: "GW-NAM-01",
    terminalCount: 1500,
    terminalType: "VSATs",
    customer: "TechCorp International",
    salesDirector: "Sarah Johnson",
    submissionDate: "2024-01-15",
    proposalLink: "https://proposals.example.com/gne-2024",
    commercialValue: 2500000,
    status: "ongoing",
    remarks: "Awaiting final technical review",
  },
  {
    id: 2,
    projectName: "Maritime Connectivity Solution",
    priority: "P2",
    country: "Singapore",
    bandwidth: "200 MHz",
    gateway: "GW-APAC-03",
    terminalCount: 750,
    terminalType: "Maritime Terminals",
    customer: "Ocean Shipping Co",
    salesDirector: "Michael Chen",
    submissionDate: "2024-01-20",
    proposalLink: "https://proposals.example.com/mcs-2024",
    commercialValue: 1200000,
    status: "ongoing",
    remarks: "Client requested additional coverage details",
  },
  {
    id: 3,
    projectName: "Rural Broadband Initiative",
    priority: "P1",
    country: "Brazil",
    bandwidth: "300 MHz",
    gateway: "GW-SAM-02",
    terminalCount: 2000,
    terminalType: "Consumer Terminals",
    customer: "ConnectBR",
    salesDirector: "Ana Silva",
    submissionDate: "2024-01-10",
    proposalLink: "https://proposals.example.com/rbi-2024",
    commercialValue: 3000000,
    status: "blocked",
    remarks: "Pending regulatory approval",
  }
];

const Proposals = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [proposals, setProposals] = useState<Proposal[]>(initialProposals);
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