"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Appointment } from "../../types/appwrite.types";
import AppointmentModal from "../AppointmentModal";
import { Button } from "../ui/button";
import { ColumnDef } from "@tanstack/react-table";
import { Doctors } from "../../constants";
import Image from "next/image";
import { MoreHorizontal } from "lucide-react";
import StatusBadge from "../StatusBadge";
import { formatDateTime } from "../../lib/utils";

export const columns: ColumnDef<Appointment>[] = [
  {
    header: "ID",
    cell: ({ row }) => <p className="text-14-medium">{row.index + 1}</p>,
  },
  {
    accessorKey: "patient",
    header: "Patient",
    cell: ({ row }) => {
      const patient = row.original.patient;

      return <p className="text-14-medium">{patient.name}</p>;
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => (
      <div className="min-w-[115px]">
        <StatusBadge status={row.original.status} />
      </div>
    ),
  },
  {
    accessorKey: "schedule",
    header: () => "When?",
    cell: ({ row }) => (
      <p className="text-14-medium min-w-[100px]">
        {formatDateTime(row.original.schedule).dateTime}
      </p>
    ),
  },
  {
    accessorKey: "primaryPhysician",
    header: "Doctor",
    cell: ({ row }) => {
      const doctor = Doctors.find(
        (doctor) => doctor.name === row.original.primaryPhysician
      );

      return !doctor ? (
        <p className="text-14-medium">N/A</p>
      ) : (
        <div className="flex items-center gap-3">
          <Image
            src={doctor?.image}
            alt="doctor"
            height={32}
            width={32}
            className="size-8 w-fit"
          />
          <p className="whitespace-nowrap">{doctor?.name}</p>
        </div>
      );
    },
  },
  {
    id: "actions",
    header: () => <div className="pl-4">Actions</div>,
    cell: ({ row }) => {
      const { patient, userId } = row.original as Appointment;
      return (
        <div className="flex gap-1">
          <AppointmentModal
            type="schedule"
            patientId={patient.$id}
            userId={userId}
            appointment={row.original}
            title="Schedule Appointment"
            description="Fill in the details below to schedule your appointment."
          />
          <AppointmentModal
            type="cancel"
            patientId={patient.$id}
            userId={userId}
            appointment={row.original}
            title="Cancel Appointment"
            description="Whyyyyyyyyyyyyyyyyyyyy"
          />
        </div>
      );
    },
  },
];
