import Image from "next/image";
import Link from "next/link";
import React from "react";
import { SearchParamProps } from "../../../../../../types";
import { getAppointment } from "@/lib/actions/appointment/getAppointment";
import { Doctors } from "../../../../../../constants";
import { formatDateTime } from "../../../../../../lib/utils";
import { Button } from "@/components/ui/button";

const Success = async ({
  params: { userId },
  searchParams,
}: SearchParamProps) => {
  const appointmentId = (searchParams?.appointmentId as string) ?? "";
  const appointment = await getAppointment(appointmentId);

  const doctor = Doctors.find(
    (doctor) => doctor.name === appointment.primaryPhysician
  );

  return (
    <>
      <div className="flex h-screen max-h-screen px-[5%]">
        <div className="success-img">
          <Link href="/">
            <Image
              src="/assets/icons/logo-full.svg"
              alt="logo"
              height={1000}
              width={1000}
              className="h-10 w-full"
            />
          </Link>
          <section className="flex flex-col items-center">
            <Image
              src="/assets/gifs/success.gif"
              alt="success"
              height={300}
              width={280}
            />
            <h2 className="header mb-6 max-w-[600px] text-center">
              Your <span className="text-green-500">appointment request</span>
              has been scheduled
            </h2>
            <p>We will contact you shortly to confirm.</p>
          </section>

          <section className="request-details">
            <p>Requested appointment details</p>
            <div className="flex items-center gap-3">
              {doctor && doctor.image && (
                <Image
                  src={doctor?.image}
                  alt="doctor"
                  height={100}
                  width={100}
                  className="size-6"
                />
              )}

              <p className="whitespace-nowrap">DR. {doctor?.name}</p>
            </div>
            <div className="flex gap-2">
              <Image
                src="/assets/icons/calendar.svg"
                alt="calendar"
                height={24}
                width={24}
              />
              <p>{formatDateTime(appointment.schedule).dateTime}</p>
            </div>
          </section>

          <Button variant="outline" className="shad-primary-btn" asChild>
            <Link href={`/patients/${userId}/new-appointment/`}>
              New Appointment
            </Link>
          </Button>

          <p className="copyright">
            © 2024 Healthcare App. All rights reserved.
          </p>
        </div>
      </div>
    </>
  );
};

export default Success;
