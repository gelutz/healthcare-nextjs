"use server";

import {
  APPOINTMENT_COLLECTION_ID,
  DATABASE_ID,
  databases,
} from "@/lib/appwrite.config";

import { ID } from "node-appwrite";
import { CreateAppointmentParams } from "../../../types";
import { parseStringify } from "../../utils";

export const createAppointment = async (data: CreateAppointmentParams) => {
  try {
    const newAppointment = await databases.createDocument(
      DATABASE_ID!,
      APPOINTMENT_COLLECTION_ID!,
      ID.unique(),
      data
    );

    return parseStringify(newAppointment);
  } catch (error) {
    console.error(error);
  }
};
