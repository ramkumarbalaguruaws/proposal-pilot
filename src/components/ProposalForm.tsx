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

export const ProposalForm = ({ onClose }: { onClose: () => void }) => {
  return (
    <form className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <label>Project Name</label>
          <Input placeholder="Enter project name" />
        </div>
        <div className="space-y-2">
          <label>Priority</label>
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Select priority" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="P1">P1</SelectItem>
              <SelectItem value="P2">P2</SelectItem>
              <SelectItem value="P3">P3</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <label>Country</label>
          <Input placeholder="Enter country" />
        </div>
        <div className="space-y-2">
          <label>Bandwidth</label>
          <Input placeholder="Enter bandwidth" />
        </div>
        <div className="space-y-2">
          <label>Gateway</label>
          <Input placeholder="Enter gateway" />
        </div>
        <div className="space-y-2">
          <label>Terminal Count</label>
          <Input type="number" placeholder="Enter terminal count" />
        </div>
        <div className="space-y-2">
          <label>Terminal Type</label>
          <Input placeholder="Enter terminal type" />
        </div>
        <div className="space-y-2">
          <label>Customer</label>
          <Input placeholder="Enter customer name" />
        </div>
        <div className="space-y-2">
          <label>Sales Director</label>
          <Input placeholder="Enter sales director name" />
        </div>
        <div className="space-y-2">
          <label>Submission Date</label>
          <Input type="date" />
        </div>
        <div className="space-y-2">
          <label>Proposal Link</label>
          <Input placeholder="Enter proposal link" />
        </div>
        <div className="space-y-2">
          <label>Commercial Value</label>
          <Input type="number" placeholder="Enter commercial value" />
        </div>
        <div className="space-y-2">
          <label>Status</label>
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Select status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="ongoing">Ongoing</SelectItem>
              <SelectItem value="blocked">Blocked</SelectItem>
              <SelectItem value="closed">Closed</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      <div className="space-y-2">
        <label>Remarks</label>
        <Textarea placeholder="Enter remarks" />
      </div>
      <div className="flex justify-end space-x-2">
        <Button variant="outline" onClick={onClose}>
          Cancel
        </Button>
        <Button type="submit">Save Proposal</Button>
      </div>
    </form>
  );
};