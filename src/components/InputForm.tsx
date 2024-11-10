import { Input } from "@nextui-org/react";

export default function InputForm(props: { label: string; type: string }) {
  return <Input {...props} variant="bordered" />;
}
