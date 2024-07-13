"use client";

import React, { useEffect, useState } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";

import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { decryptKey, encryptKey } from "../../lib/utils";

const getPasskey = () => {
  if (typeof window !== "undefined") {
    return localStorage.getItem("healthcare-admin-passkey");
  }
  return "";
};

const PasskeyModal = () => {
  const router = useRouter();
  const path = usePathname();

  const [open, setOpen] = useState(true);
  const [error, setError] = useState("");
  const [passkey, setPasskey] = useState("");

  const encryptedKey = getPasskey();
  useEffect(() => {
    const decryptedKey = encryptedKey && decryptKey(encryptedKey);

    if (path) {
      if (decryptedKey === process.env.NEXT_PUBLIC_PASSKEY) {
        setOpen(false);
        router.push("/admin");
      }
    }
  }, [encryptedKey]);

  const closeModal = () => {
    setOpen(false);
    router.push("/");
  };

  const validatePasskey = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    console.log(passkey);
    if (passkey === process.env.NEXT_PUBLIC_PASSKEY) {
      const encryptedPasskey = encryptKey(passkey);
      localStorage.setItem("healthcare-admin-passkey", encryptedPasskey);
      setOpen(false);
      router.push("/admin");
    } else {
      setError("GTFO, wrong passkey");
    }
  };

  return (
    <>
      <AlertDialog open={open} onOpenChange={setOpen}>
        <AlertDialogContent className="shad-alert-dialog">
          <AlertDialogHeader>
            <AlertDialogTitle className="flex items-start justify-between">
              Admin access verification
              <Image
                className="cursor-pointer"
                src="/assets/icons/close.svg"
                alt="close"
                height={20}
                width={20}
                onClick={closeModal}
              />
            </AlertDialogTitle>
            <AlertDialogDescription>
              To access the admin page, please enter the passkey below.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <div className="">
            <InputOTP value={passkey} onChange={setPasskey} maxLength={6}>
              <InputOTPGroup className="shad-otp">
                <InputOTPSlot className="shad-otp-slot" index={0} />
                <InputOTPSlot className="shad-otp-slot" index={1} />
                <InputOTPSlot className="shad-otp-slot" index={2} />
                <InputOTPSlot className="shad-otp-slot" index={3} />
                <InputOTPSlot className="shad-otp-slot" index={4} />
                <InputOTPSlot className="shad-otp-slot" index={5} />
              </InputOTPGroup>
            </InputOTP>

            {error && (
              <p className="shad-error text-14-regular mt-4 flex justify-center">
                {error}
              </p>
            )}
          </div>
          <AlertDialogFooter>
            <AlertDialogAction
              className="shad-primary-btn w-full"
              onClick={(e) => validatePasskey(e)}
            >
              Enter
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default PasskeyModal;
