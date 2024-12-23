import { Input } from "@nextui-org/react";
import React from "react";

export default function InputForm(props: {
  label: string;
  type: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) {
  return <Input {...props} variant="bordered" />;
}
