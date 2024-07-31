"use client";

import { Dispatch, SetStateAction, useState } from "react";
import { Status, UpdateAppointmentParams } from "../../types";

import { Appointment } from "../../types/appwrite.types";
import CustomFormField from "../CustomFormField";
import { Doctors } from "../../constants";
import { Form } from "../ui/form";
import { FormFieldType } from "./PatientForm";
import Image from "next/image";
import { SelectItem } from "../ui/select";
import SubmitButton from "../SubmitButton";
import { createAppointment } from "@/lib/actions/appointment/createAppointment";
import { getAppointmentSchema } from "@/lib/valiation";
import { updateAppointment } from "@/lib/actions/appointment/updateAppointment";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

type AppointmentFormProps = {
  userId: string;
  patientId: string;
  type: "create" | "cancel" | "schedule";
  appointment?: Appointment;
  setOpen?: Dispatch<SetStateAction<boolean>>;
};

export const AppointmentForm = ({
  userId,
  patientId,
  type,
  appointment,
  setOpen,
}: AppointmentFormProps) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const formSchema = getAppointmentSchema(type);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      primaryPhysician: appointment ? appointment?.primaryPhysician : "",
      schedule: appointment
        ? new Date(appointment?.schedule!)
        : new Date(Date.now()),
      reason: appointment ? appointment.reason : "",
      note: appointment?.note || "",
      cancellationReason: appointment?.cancellationReason || "",
    },
  });

  const pageDetails = {
    status: "",
    buttonText: "",
  };

  switch (type) {
    case "schedule":
      pageDetails.status = "scheduled";
      pageDetails.buttonText = "Schedule Appointment";
      break;
    case "cancel":
      pageDetails.status = "cancelled";
      pageDetails.buttonText = "Cancel Appointment";
      break;
    default:
      pageDetails.status = "pending";
      pageDetails.buttonText = "Submit Appointment";
      break;
  }

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);

    try {
      if (type === "create" && patientId) {
        const appointmentData = {
          userId,
          patient: patientId,
          primaryPhysician: values.primaryPhysician,
          schedule: new Date(values.schedule),
          reason: values.reason!,
          note: values.note,
          status: pageDetails.status as Status,
        };
        const appointment = await createAppointment(appointmentData);
        if (appointment) {
          form.reset();
          router.push(
            `/patients/${userId}/new-appointment/success?appointmentId=${appointment.$id}`
          );
        }
      } else {
        const appointmentToUpdate = {
          userId,
          appointmentId: appointment?.$id!,
          type: type,
          appointment: {
            primaryPhysician: values.primaryPhysician,
            schedule: new Date(values.schedule),
            status: pageDetails.status as Status,
            cancellationReason: values.cancellationReason!,
          },
        };

        const updatedAppointment = await updateAppointment(appointmentToUpdate);
        if (updatedAppointment) {
          setOpen && setOpen(false);
          form.reset();
        }
      }
    } catch (error) {
      console.error(error);
    }

    setIsLoading(false);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 flex-1">
        {type === "create" && (
          <section className="mb-12 space-y-4">
            <h1 className="header">New Appointment</h1>
            <p className="text-dark-700">
              Request a new appointment in 10 seconds.
            </p>
          </section>
        )}

        {type !== "cancel" && (
          <>
            <CustomFormField
              fieldType={FormFieldType.SELECT}
              control={form.control}
              name="primaryPhysician"
              label="Doctor"
              placeholder="Select a doctor"
            >
              {Doctors.map(({ name, image }) => (
                <SelectItem key={name} value={name}>
                  <div className="flex cursor-pointer items-center gap-2">
                    <Image
                      src={image}
                      alt={name}
                      height={32}
                      width={32}
                      className="rounded-full border border-dark-500"
                    />
                    <p>{name}</p>
                  </div>
                </SelectItem>
              ))}
            </CustomFormField>

            <CustomFormField
              fieldType={FormFieldType.DATEPICKER}
              control={form.control}
              name="schedule"
              label="Expected Date of Appointment"
              showTimeSelect
              dateFormat="dd/MM/yyyy - h:mm aa"
            />

            <div className="flex flex-col gap-6 xl:flex-row">
              <CustomFormField
                fieldType={FormFieldType.TEXTAREA}
                control={form.control}
                name="reason"
                label="Reason for Appointment"
                placeholder="I need to see Dr. X"
              />

              <CustomFormField
                fieldType={FormFieldType.TEXTAREA}
                control={form.control}
                name="note"
                label="Notes (Optional)"
              />
            </div>
          </>
        )}

        {type === "cancel" && (
          <CustomFormField
            fieldType={FormFieldType.TEXTAREA}
            control={form.control}
            name="cancellationReason"
            label="Reason for Cancellation"
          />
        )}

        <SubmitButton
          className={`w-full ${type === "cancel" ? "shad-danger-btn" : "shad-primary-btn"}`}
          isLoading={isLoading}
        >
          {pageDetails.buttonText}
        </SubmitButton>
      </form>
    </Form>
  );
};

export default AppointmentForm;
