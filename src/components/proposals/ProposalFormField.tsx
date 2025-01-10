import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { UseFormReturn } from "react-hook-form";
import type { Proposal } from "../ProposalTable";

interface ProposalFormFieldProps {
  form: UseFormReturn<Partial<Proposal>>;
  name: keyof Proposal;
  label: string;
  type?: "text" | "number" | "date" | "textarea" | "select";
  placeholder?: string;
  options?: { value: string; label: string }[];
}

export const ProposalFormField = ({
  form,
  name,
  label,
  type = "text",
  placeholder,
  options,
}: ProposalFormFieldProps) => {
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            {type === "select" && options ? (
              <Select onValueChange={field.onChange} defaultValue={field.value?.toString()}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder={placeholder} />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {options.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            ) : type === "textarea" ? (
              <Textarea placeholder={placeholder} {...field} />
            ) : (
              <Input
                type={type}
                placeholder={placeholder}
                {...field}
                value={field.value?.toString() || ""}
                onChange={
                  type === "number"
                    ? (e) => field.onChange(Number(e.target.value))
                    : field.onChange
                }
              />
            )}
          </FormControl>
        </FormItem>
      )}
    />
  );
};