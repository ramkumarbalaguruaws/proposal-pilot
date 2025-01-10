import { useState } from "react";
import { Layout } from "@/components/Layout";
import { ProposalTable } from "@/components/ProposalTable";
import { Button } from "@/components/ui/button";
import { ProposalForm } from "@/components/ProposalForm";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

const Proposals = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  return (
    <Layout>
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Proposals</h1>
          <Button onClick={() => setIsDialogOpen(true)}>Add New Proposal</Button>
        </div>
        <ProposalTable />
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent className="max-w-3xl">
            <DialogHeader>
              <DialogTitle>Add New Proposal</DialogTitle>
            </DialogHeader>
            <ProposalForm onClose={() => setIsDialogOpen(false)} />
          </DialogContent>
        </Dialog>
      </div>
    </Layout>
  );
};

export default Proposals;