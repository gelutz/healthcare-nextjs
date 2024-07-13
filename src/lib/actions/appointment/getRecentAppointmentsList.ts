"use server";

import {
  APPOINTMENT_COLLECTION_ID,
  DATABASE_ID,
  databases,
} from "@/lib/appwrite.config";
import { Query } from "node-appwrite";
import { parseStringify } from "../../../../lib/utils";
import { Appointment } from "../../../../types/appwrite.types";

type RecentAppointmentsList = {
  scheduled: number;
  pending: number;
  cancelled: number;
  totalCount: number;
  documents: Appointment[];
};

export const getRecentAppointmentsList = async (): Promise<
  RecentAppointmentsList | undefined
> => {
  try {
    const appointments = await databases.listDocuments(
      DATABASE_ID!,
      APPOINTMENT_COLLECTION_ID!,
      [Query.orderDesc("$createdAt")]
    );

    const totalByStatus = {
      scheduled: 0,
      pending: 0,
      cancelled: 0,
    };

    (appointments.documents as Appointment[]).forEach((appointment) => {
      totalByStatus[appointment.status] += 1;
    });

    return parseStringify({
      ...totalByStatus,
      totalCount: appointments.total,
      documents: appointments.documents as Appointment[],
    });
  } catch (error) {
    console.error(error);
  }
};
