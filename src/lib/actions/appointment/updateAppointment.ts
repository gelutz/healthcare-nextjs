"use server";

import {
  APPOINTMENT_COLLECTION_ID,
  DATABASE_ID,
  databases,
} from "@/lib/appwrite.config";

import { revalidatePath } from "next/cache";
import { UpdateAppointmentParams } from "../../../types";
import { parseStringify } from "../../utils";

export const updateAppointment = async ({
  userId,
  appointmentId,
  type,
  appointment,
}: UpdateAppointmentParams) => {
  try {
    const updatedAppointment = await databases.updateDocument(
      DATABASE_ID!,
      APPOINTMENT_COLLECTION_ID!,
      appointmentId,
      appointment
    );
    if (!updatedAppointment) {
      throw new Error("Appointment not found");
    }

    // SMS notification TODO
    revalidatePath("/admin");

    return parseStringify(updatedAppointment);
  } catch (error) {
    console.error(error);
  }
};
