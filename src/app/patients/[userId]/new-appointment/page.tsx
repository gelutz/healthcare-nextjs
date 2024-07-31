import AppointmentForm from "@/components/forms/AppointmentForm";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import RegisterForm from "@/components/forms/RegisterForm";
import { SearchParamProps } from "../../../../types";
import { getPatient } from "@/lib/actions/patient/getPatient";
import { getUser } from "@/lib/actions/user/getUser";

const NewAppointment = async ({ params: { userId } }: SearchParamProps) => {
  const patient = await getPatient(userId);

  return (
    <div className="flex h-screen max-h-screen">
      <section className="remove-scrollbar container my-auto">
        <div className="sub-container max-w-[860px] flex-1 justify-between">
          <div className="flex items-start">
            <Image
              src="/assets/icons/logo-full.svg"
              height={100}
              width={200}
              alt="patient"
              className="mb-12 w-auto"
            />
          </div>

          <AppointmentForm
            type="create"
            userId={userId}
            patientId={patient.$id}
          />

          <p className="copyright py-12">
            © 2024 Healthcare App. All rights reserved.
          </p>
        </div>
      </section>
      <Image
        src="/assets/images/appointment-img.png"
        alt="appointment"
        height={1000}
        width={1000}
        className="side-img max-w-[390px] bg-bottom"
      />
    </div>
  );
};

export default NewAppointment;
