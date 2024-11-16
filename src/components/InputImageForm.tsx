import { Input } from "@nextui-org/react";
import React from "react";

export default function InputImageForm(props: {
  label: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) {
  return <Input {...props} type="text" variant="bordered" />;
}
