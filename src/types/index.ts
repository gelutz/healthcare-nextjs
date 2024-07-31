/* eslint-disable no-unused-vars */

import { Appointment } from "./appwrite.types";

export type SearchParamProps = {
  params: { [key: string]: string };
  searchParams?: { [key: string]: string | string[] };
};

export type Gender = "male" | "female" | "other";
export type Status = "pending" | "scheduled" | "cancelled";

export interface CreateUserParams {
  name: string;
  email: string;
  phone: string;
}
export interface User extends CreateUserParams {
  $id: string;
}

export interface RegisterUserParams extends CreateUserParams {
  userId: string;
  birthDate: Date;
  gender: Gender;
  address: string;
  occupation: string;
  emergencyContactName: string;
  emergencyContactNumber: string;
  primaryPhysician: string;
  insuranceProvider: string;
  insurancePolicyNumber: string;
  allergies?: string;
  currentMedication?: string;
  familyMedicalHistory?: string;
  pastMedicalHistory?: string;
  identificationType?: string;
  identificationNumber?: string;
  identificationDocument?: FormData;
  privacyConsent: boolean;
}

export type CreateAppointmentParams = {
  userId: string;
  patient: string;
  primaryPhysician: string;
  reason: string;
  schedule: Date;
  status: Status;
  note?: string;
};

export type UpdateAppointmentParams = {
  appointmentId: string;
  userId: string;
  appointment: Partial<Appointment>;
  type: string;
};
