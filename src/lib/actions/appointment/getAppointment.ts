"use server";

import {
    APPOINTMENT_COLLECTION_ID,
    DATABASE_ID,
    databases,
} from "@/lib/appwrite.config";
import { parseStringify } from "../../utils";

export const getAppointment = async (appointmentId: string) => {
  try {
    const appointment = await databases.getDocument(
      DATABASE_ID!,
      APPOINTMENT_COLLECTION_ID!,
      appointmentId
    );

    return parseStringify(appointment);
  } catch (error) {
    console.error(error);
  }
};
