import { Select, SelectItem } from "@nextui-org/react";

interface SelectFormProps<T> {
  items: T[];
  label: string;
  placeholder?: string;
  className?: string;
  selectedKey?: string;
  onSelectionChange: (key: string) => void;
  selectionMode?: "single" | "multiple";
}
type SelectItemType = {
  id: string;
  name: string;
};
export default function SelectForm<T extends SelectItemType>({
  items,
  label,
  placeholder,
  selectedKey,
  onSelectionChange,
  className,
  selectionMode,
}: SelectFormProps<T>) {
  return (
    <Select
      label={label}
      defaultSelectedKeys={[selectedKey || ""]}
      onChange={(e) => onSelectionChange(e.target.value)}
      selectedKeys={[selectedKey || ""]}
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
