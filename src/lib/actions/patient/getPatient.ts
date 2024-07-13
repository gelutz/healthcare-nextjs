"use server";

import {
  DATABASE_ID,
  databases,
  PATIENT_COLLECTION_ID,
} from "@/lib/appwrite.config";
import { Query } from "node-appwrite";
import { parseStringify } from "../../../../lib/utils";

export const getPatient = async (userId: string) => {
  try {
    const patients = await databases.listDocuments(
      DATABASE_ID!,
      PATIENT_COLLECTION_ID!,
      [Query.equal("userId", userId)]
    );

    return parseStringify(patients.documents[0]);
  } catch (error) {
    console.error(error);
  }
};
