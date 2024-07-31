import Image from "next/image";
import React from "react";
import { Status } from "../types";
import { StatusIcon } from "../constants";
import { cn } from "@/lib/utils";

const StatusBadge = ({ status }: { status: Status }) => {
  return (
    <div
      className={cn("status-badge", {
        "bg-green-600": status === "scheduled",
        "bg-blue-600": status === "pending",
        "bg-red-600": status === "cancelled",
      })}
    >
      <Image
        src={StatusIcon[status]}
        alt="status"
        height={24}
        width={24}
        className="size-4"
      />
      <p
        className={cn("status-12-semibold capitalize", {
          "text-green-500": status === "scheduled",
          "text-blue-500": status === "pending",
          "text-red-500": status === "cancelled",
        })}
      >
        {status}
      </p>
    </div>
  );
};

export default StatusBadge;
