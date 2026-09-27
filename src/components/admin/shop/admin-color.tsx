import React from "react";
import { cn } from "@/lib/utils";
import { Color } from "@prisma/client";

interface Props {
  className?: string;
  data: Color[];
}

export const AdminColor: React.FC<Props> = (props) => {
  const { className } = props;
  return <div className={cn("", className)}>color</div>;
};
