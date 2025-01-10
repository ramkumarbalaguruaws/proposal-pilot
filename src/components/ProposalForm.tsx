import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormField, FormItem, FormLabel, FormControl } from "@/components/ui/form";
import { useToast } from "@/components/ui/use-toast";
import type { Proposal } from "./ProposalTable";

interface ProposalFormProps {
  onClose: () => void;
  onSubmit: (data: Partial<Proposal>) => void;
  editingProposal?: Proposal;
}

export const ProposalForm = ({ onClose, onSubmit, editingProposal }: ProposalFormProps) => {
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
          <FormField
            control={form.control}
            name="projectName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Project Name</FormLabel>
                <FormControl>
                  <Input placeholder="Enter project name" {...field} />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="priority"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Priority</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select priority" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="P1">P1</SelectItem>
                    <SelectItem value="P2">P2</SelectItem>
                    <SelectItem value="P3">P3</SelectItem>
                  </SelectContent>
                </Select>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="country"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Country</FormLabel>
                <FormControl>
                  <Input placeholder="Enter country" {...field} />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="bandwidth"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Bandwidth</FormLabel>
                <FormControl>
                  <Input placeholder="Enter bandwidth" {...field} />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="gateway"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Gateway</FormLabel>
                <FormControl>
                  <Input placeholder="Enter gateway" {...field} />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="terminalCount"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Terminal Count</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="Enter terminal count"
                    {...field}
                    onChange={(e) => field.onChange(Number(e.target.value))}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="terminalType"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Terminal Type</FormLabel>
                <FormControl>
                  <Input placeholder="Enter terminal type" {...field} />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="customer"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Customer</FormLabel>
                <FormControl>
                  <Input placeholder="Enter customer name" {...field} />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="salesDirector"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Sales Director</FormLabel>
                <FormControl>
                  <Input placeholder="Enter sales director name" {...field} />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="submissionDate"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Submission Date</FormLabel>
                <FormControl>
                  <Input type="date" {...field} />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="proposalLink"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Proposal Link</FormLabel>
                <FormControl>
                  <Input placeholder="Enter proposal link" {...field} />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="commercialValue"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Commercial Value</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="Enter commercial value"
                    {...field}
                    onChange={(e) => field.onChange(Number(e.target.value))}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="status"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Status</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="ongoing">Ongoing</SelectItem>
                    <SelectItem value="blocked">Blocked</SelectItem>
                    <SelectItem value="closed">Closed</SelectItem>
                  </SelectContent>
                </Select>
              </FormItem>
            )}
          />
        </div>
        <FormField
          control={form.control}
          name="remarks"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Remarks</FormLabel>
              <FormControl>
                <Textarea placeholder="Enter remarks" {...field} />
              </FormControl>
            </FormItem>
          )}
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