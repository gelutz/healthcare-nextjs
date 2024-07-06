import RegisterForm from "@/components/forms/RegisterForm";
import { getUser } from "@/lib/actions/patient/getUser";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { SearchParamProps } from "../../../../../types";

const Register = async ({ params: { userId } }: SearchParamProps) => {
  const user = await getUser(userId);

  return (
    <div className="flex h-screen max-h-screen">
      <section className="remove-scrollbar container">
        <div className="sub-container max-w-[860px] flex-1 flex-col py-10">
          <Image
            src="/assets/icons/logo-full.svg"
            height={1000}
            width={1000}
            alt="patient"
            className="mb-12 h-10 w-full"
          />

          <RegisterForm user={user} />

          <p className="copyright py-12">
            © 2024 Healthcare App. All rights reserved.
          </p>
        </div>
      </section>
      <Image
        src="/assets/images/register-img.png"
        alt="register"
        height={1000}
        width={1000}
        className="side-img max-w-[390px]"
      />
    </div>
  );
};

export default Register;
