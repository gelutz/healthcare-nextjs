import { Appointment } from "../../types/appwrite.types";
import { DataTable } from "@/components/table/DataTable";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import StatCard from "@/components/StatCard";
import { columns } from "@/components/table/Columns";
import { getRecentAppointmentsList } from "@/lib/actions/appointment/getRecentAppointmentsList";

const AdminPage = async () => {
  const appointments = await getRecentAppointmentsList();
  return (
    <>
      <div className="mx-auto flex max-w-7xl flex-col space-y-14">
        <header className="admin-header">
          <Link href="/" className="cursor-pointer">
            <Image
              src="/assets/icons/logo-full.svg"
              alt="logo"
              height={32}
              width={162}
              className="h-8 w-full"
            />
          </Link>

          <p className="text-16-semibold">Admin Dashboard</p>
        </header>

        <main className="admin-main">
          <section className="w-full space-y-4">
            <h1 className="header">Welcome !</h1>
            <p className="text-dark-700">
              Start the day managing new appointments
            </p>
          </section>
          {appointments && (
            <section className="admin-stat">
              <StatCard
                type="appointments"
                count={appointments.scheduled}
                label="Schelued Appointments"
                icon="/assets/icons/appointments.svg"
              />
              <StatCard
                type="pending"
                count={appointments.pending}
                label="Pending Appointments"
                icon="/assets/icons/pending.svg"
              />
              <StatCard
                type="cancelled"
                count={appointments.cancelled}
                label="Canceled Appointments"
                icon="/assets/icons/cancelled.svg"
              />
            </section>
          )}

          <DataTable
            columns={columns}
            data={appointments?.documents as Appointment[]}
          />
        </main>
      </div>
    </>
  );
};

export default AdminPage;
