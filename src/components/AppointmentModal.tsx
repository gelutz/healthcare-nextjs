"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import React, { useState } from "react";

import { Appointment } from "../types/appwrite.types";
import AppointmentForm from "./forms/AppointmentForm";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";

type AppointmentModalProps = {
  type: "schedule" | "cancel";
  patientId: string;
  userId: string;
  appointment: Appointment;
  title: string;
  description: string;
};

const AppointmentModal = ({
  type,
  patientId,
  userId,
  appointment,
  title,
  description,
}: AppointmentModalProps) => {
  const [open, setOpen] = useState(false);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          className={cn("capitalize", {
            "text-green-500": type === "schedule",
            "text-red-500": type === "cancel",
          })}
        >
          {type}
        </Button>
      </DialogTrigger>
      <DialogContent className="shad-dialog sm:max-w-md">
        <DialogHeader className="mb-4 space-y-3">
          <DialogTitle className="capitalize">{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>

        <AppointmentForm
          appointment={appointment}
          setOpen={setOpen}
          type={type}
          patientId={patientId}
          userId={userId}
        />
      </DialogContent>
    </Dialog>
  );
};

export default AppointmentModal;
