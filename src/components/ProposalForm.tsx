import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { useToast } from "@/components/ui/use-toast";
import { ProposalFormField } from "./proposals/ProposalFormField";
import type { Proposal } from "./ProposalTable";

interface ProposalFormProps {
  onClose: () => void;
  onSubmit: (data: Partial<Proposal>) => void;
  editingProposal?: Proposal;
}

export const ProposalForm = ({
  onClose,
  onSubmit,
  editingProposal,
}: ProposalFormProps) => {
  const { toast } = useToast();
  const form = useForm<Partial<Proposal>>({
    defaultValues: editingProposal || {
      projectName: "",
      priority: "",
      country: "",
      bandwidth: "",
      gateway: "",
      terminalCount: 0,
      terminalType: "",
      customer: "",
      salesDirector: "",
      submissionDate: "",
      proposalLink: "",
      commercialValue: 0,
      status: "",
      remarks: "",
    },
  });

  useEffect(() => {
    if (editingProposal) {
      Object.entries(editingProposal).forEach(([key, value]) => {
        form.setValue(key as keyof Proposal, value);
      });
    }
  }, [editingProposal, form]);

  const handleSubmit = (data: Partial<Proposal>) => {
    onSubmit(data);
    toast({
      title: editingProposal ? "Proposal updated" : "Proposal created",
      description: editingProposal
        ? "The proposal has been successfully updated."
        : "The proposal has been successfully created.",
    });
    onClose();
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <ProposalFormField
            form={form}
            name="projectName"
            label="Project Name"
            placeholder="Enter project name"
          />
          <ProposalFormField
            form={form}
            name="priority"
            label="Priority"
            type="select"
            placeholder="Select priority"
            options={[
              { value: "P1", label: "P1" },
              { value: "P2", label: "P2" },
              { value: "P3", label: "P3" },
            ]}
          />
          <ProposalFormField
            form={form}
            name="country"
            label="Country"
            placeholder="Enter country"
          />
          <ProposalFormField
            form={form}
            name="bandwidth"
            label="Bandwidth"
            placeholder="Enter bandwidth"
          />
          <ProposalFormField
            form={form}
            name="gateway"
            label="Gateway"
            placeholder="Enter gateway"
          />
          <ProposalFormField
            form={form}
            name="terminalCount"
            label="Terminal Count"
            type="number"
            placeholder="Enter terminal count"
          />
          <ProposalFormField
            form={form}
            name="terminalType"
            label="Terminal Type"
            placeholder="Enter terminal type"
          />
          <ProposalFormField
            form={form}
            name="customer"
            label="Customer"
            placeholder="Enter customer name"
          />
          <ProposalFormField
            form={form}
            name="salesDirector"
            label="Sales Director"
            placeholder="Enter sales director name"
          />
          <ProposalFormField
            form={form}
            name="submissionDate"
            label="Submission Date"
            type="date"
          />
          <ProposalFormField
            form={form}
            name="proposalLink"
            label="Proposal Link"
            placeholder="Enter proposal link"
          />
          <ProposalFormField
            form={form}
            name="commercialValue"
            label="Commercial Value"
            type="number"
            placeholder="Enter commercial value"
          />
          <ProposalFormField
            form={form}
            name="status"
            label="Status"
            type="select"
            placeholder="Select status"
            options={[
              { value: "ongoing", label: "Ongoing" },
              { value: "blocked", label: "Blocked" },
              { value: "closed", label: "Closed" },
            ]}
          />
        </div>
        <ProposalFormField
          form={form}
          name="remarks"
          label="Remarks"
          type="textarea"
          placeholder="Enter remarks"
        />
        <div className="flex justify-end space-x-2">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit">
            {editingProposal ? "Update" : "Save"} Proposal
          </Button>
        </div>
      </form>
    </Form>
  );
};