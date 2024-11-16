import { Textarea } from "@nextui-org/react";

export default function TextAreaForm(props: { label: string }) {
  return <Textarea {...props} variant="bordered" />;
}
