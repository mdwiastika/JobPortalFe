import { Select, SelectItem } from "@nextui-org/react";

interface SelectFormProps<T> {
  items: T[];
  label: string;
  placeholder?: string;
  className?: string;
  selectedKeys?: string;
  onSelectionChange: (key: string) => void;
  selectionMode?: "single" | "multiple";
}
type SelectItemType = {
  id: string;
  name: string;
};
export default function MultiSelectForm<T extends SelectItemType>({
  items,
  label,
  placeholder,
  selectedKeys,
  onSelectionChange,
  className,
  selectionMode,
}: SelectFormProps<T>) {
  return (
    <Select
      label={label}
      defaultSelectedKeys={selectedKeys || [""]}
      onChange={(e) => onSelectionChange(e.target.value)}
      selectedKeys={selectedKeys || ""}
      placeholder={placeholder}
      className={className}
      selectionMode={selectionMode}
    >
      {items.map((item) => (
        <SelectItem key={item.id} value={item.id}>
          {item.name}
        </SelectItem>
      ))}
    </Select>
  );
}
