import React, { useState, useEffect } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import Cookies from "js-cookie";
import supabase from "../../config/createClient";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "../ui/input-otp";
import { Lock, LockKeyholeOpen } from "lucide-react";
import toast from "react-hot-toast";

export default function PasswordVerifyDialog() {
  const [heading, setHeading] = useState("");
  const [password, setPassword] = useState(""); // ✅ DB se aane wala password
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchData() {
      const { data, error } = await supabase
        .from("site_settings")
        .select("*")
        .maybeSingle();

      if (!error && data) {
        setHeading(data.heading || "");
        setPassword(data.password || "");
      }
    }
    fetchData();
  }, []);

  const verifyOtp = async (otp: string) => {
    setLoading(true);
    setError("");

    setTimeout(() => {
      if (otp === password) {
        Cookies.set("passwordVerified", "true", { expires: 1 / 24 }); // 1 hour
        toast.success("Password verified successfully!");
        setOpen(false);
        // realod window
        window.location.reload();
        console.log("✅ Password verified");
      } else {
        setError("Incorrect password. Please try again.");
      }
      setLoading(false);
    }, 500);
  };

  return (
    <>
      <button
        className=" text-white p-2 rounded-lg bg-red-500 hover:bg-white/20 transition"
        onClick={() => setOpen(true)}
      >
        <LockKeyholeOpen size={21} />
      </button>

      {/* ✅ Password Dialog */}
      <Dialog.Root open={open} onOpenChange={setOpen}>
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 bg-black/50 backdrop-blur-sm z-20 data-[state=open]:animate-fadeIn" />
          <Dialog.Content className="fixed top-1/2 left-1/2 z-50 -translate-x-1/2 -translate-y-1/2 w-[90%] max-w-md bg-gray-900 text-white rounded-2xl shadow-xl border border-gray-700 p-6 data-[state=open]:animate-scaleIn">
            <Dialog.Title className="text-xl font-bold text-center mb-4">
              Enter Password
            </Dialog.Title>

            <div className="flex justify-center">
              <InputOTP
                maxLength={6}
                value={value}
                onChange={setValue}
                disabled={loading}
                onComplete={verifyOtp}
              >
                <InputOTPGroup>
                  <InputOTPSlot index={0} />
                </InputOTPGroup>
                <InputOTPGroup>
                  <InputOTPSlot index={1} />
                </InputOTPGroup>
                <InputOTPGroup>
                  <InputOTPSlot index={2} />
                </InputOTPGroup>
                <InputOTPSeparator />
                <InputOTPGroup>
                  <InputOTPSlot index={3} />
                </InputOTPGroup>
                <InputOTPGroup>
                  <InputOTPSlot index={4} />
                </InputOTPGroup>
                <InputOTPGroup>
                  <InputOTPSlot index={5} />
                </InputOTPGroup>
              </InputOTP>
            </div>

            {error && (
              <p className="text-red-400 text-center text-sm mt-3">{error}</p>
            )}

            <div className="flex justify-end gap-3 mt-6">
              <Dialog.Close asChild>
                <button
                  className="px-4 py-2 rounded-lg bg-gray-700 hover:bg-gray-600 transition"
                  disabled={loading}
                >
                  Cancel
                </button>
              </Dialog.Close>
            </div>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </>
  );
}
