"use client";

import { useStore } from "@/lib/store";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Phone, ArrowLeft, CheckCircle2, Loader2 } from "lucide-react";
import { useState, useRef, useEffect } from "react";

export function PhoneOTPLogin() {
  const { ui, setLoginOpen, login } = useStore();
  const [step, setStep] = useState<"phone" | "otp" | "success">("phone");
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const formatPhone = (val: string) => {
    const clean = val.replace(/\D/g, "");
    if (clean.startsWith("0")) return "+44 " + clean.slice(1);
    if (clean.startsWith("44")) return "+44 " + clean.slice(2);
    if (clean.startsWith("7")) return "+44 " + clean;
    return val;
  };

  const handlePhoneChange = (val: string) => {
    setPhone(formatPhone(val));
    setError("");
  };

  const handleSendOTP = () => {
    const cleanPhone = phone.replace(/\D/g, "");
    if (cleanPhone.length < 10) {
      setError("Please enter a valid UK phone number");
      return;
    }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setStep("otp");
      setError("");
    }, 1500);
  };

  const handleOtpChange = (index: number, val: string) => {
    if (val.length > 1) {
      const digits = val.replace(/\D/g, "").split("");
      const newOtp = [...otp];
      digits.forEach((d, i) => {
        if (index + i < 6) newOtp[index + i] = d;
      });
      setOtp(newOtp);
      const nextIndex = Math.min(index + digits.length, 5);
      inputRefs.current[nextIndex]?.focus();
    } else {
      const newOtp = [...otp];
      newOtp[index] = val.replace(/\D/g, "");
      setOtp(newOtp);
      if (val && index < 5) {
        inputRefs.current[index + 1]?.focus();
      }
    }
    setError("");
  };

  const handleOtpKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleVerifyOTP = () => {
    const otpCode = otp.join("");
    if (otpCode.length !== 6) {
      setError("Please enter the complete 6-digit code");
      return;
    }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setStep("success");
      setTimeout(() => {
        login(phone);
        setLoginOpen(false);
        setStep("phone");
        setPhone("");
        setOtp(["", "", "", "", "", ""]);
      }, 1200);
    }, 1500);
  };

  useEffect(() => {
    if (!ui.loginOpen) {
      setTimeout(() => {
        setStep("phone");
        setPhone("");
        setOtp(["", "", "", "", "", ""]);
        setError("");
      }, 200);
    }
  }, [ui.loginOpen]);

  return (
    <Dialog open={ui.loginOpen} onOpenChange={setLoginOpen}>
      <DialogContent className="sm:max-w-md rounded-2xl p-0 overflow-hidden">
        {/* Header gradient */}
        <div className="bg-gradient-to-r from-primary to-primary/80 px-6 py-8 text-center text-white">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-white/20 backdrop-blur-sm">
            <Phone className="h-7 w-7" />
          </div>
          <DialogHeader className="mt-4">
            <DialogTitle className="text-xl text-white">
              {step === "phone" && "Welcome Back!"}
              {step === "otp" && "Verify Your Phone"}
              {step === "success" && "Welcome!"}
            </DialogTitle>
          </DialogHeader>
          {step === "phone" && (
            <p className="mt-1 text-sm text-white/70">
              Sign in or create an account using your phone number
            </p>
          )}
          {step === "otp" && (
            <p className="mt-1 text-sm text-white/70">
              Enter the 6-digit code sent to {phone}
            </p>
          )}
        </div>

        <div className="p-6">
          {error && (
            <div className="mb-4 rounded-lg bg-red-50 px-4 py-2 text-sm text-red-600">
              {error}
            </div>
          )}

          {step === "phone" && (
            <div className="space-y-4">
              <div>
                <Label htmlFor="phone" className="text-sm font-medium">
                  UK Phone Number
                </Label>
                <Input
                  id="phone"
                  type="tel"
                  placeholder="+44 7XXX XXX XXX"
                  value={phone}
                  onChange={(e) => handlePhoneChange(e.target.value)}
                  className="mt-1.5 h-12 rounded-xl border-border/50 pl-4 text-base"
                />
                <p className="mt-1.5 text-xs text-muted-foreground">
                  We&apos;ll send you a one-time verification code
                </p>
              </div>

              <Button
                onClick={handleSendOTP}
                disabled={loading || phone.replace(/\D/g, "").length < 10}
                className="w-full rounded-xl bg-accent py-5 text-base font-semibold text-white hover:bg-accent/90 disabled:opacity-50"
              >
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Sending...
                  </>
                ) : (
                  "Send Verification Code"
                )}
              </Button>
            </div>
          )}

          {step === "otp" && (
            <div className="space-y-4">
              <div className="flex justify-center gap-2">
                {otp.map((digit, i) => (
                  <Input
                    key={i}
                    ref={(el) => { inputRefs.current[i] = el; }}
                    type="text"
                    inputMode="numeric"
                    maxLength={6}
                    value={digit}
                    onChange={(e) => handleOtpChange(i, e.target.value)}
                    onKeyDown={(e) => handleOtpKeyDown(i, e)}
                    className="h-14 w-12 rounded-xl border-border/50 text-center text-xl font-bold focus:border-accent focus:ring-accent"
                  />
                ))}
              </div>

              <div className="flex items-center justify-between">
                <button
                  onClick={() => setStep("phone")}
                  className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"
                >
                  <ArrowLeft className="h-3 w-3" />
                  Change number
                </button>
                <button
                  onClick={handleSendOTP}
                  className="text-sm font-medium text-accent hover:underline"
                >
                  Resend code
                </button>
              </div>

              <Button
                onClick={handleVerifyOTP}
                disabled={loading || otp.join("").length < 6}
                className="w-full rounded-xl bg-accent py-5 text-base font-semibold text-white hover:bg-accent/90 disabled:opacity-50"
              >
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Verifying...
                  </>
                ) : (
                  "Verify & Sign In"
                )}
              </Button>
            </div>
          )}

          {step === "success" && (
            <div className="flex flex-col items-center py-4">
              <CheckCircle2 className="h-16 w-16 text-green-500" />
              <p className="mt-4 text-lg font-semibold">Verified!</p>
              <p className="text-sm text-muted-foreground">
                Redirecting you...
              </p>
            </div>
          )}

          <p className="mt-4 text-center text-xs text-muted-foreground">
            By signing in, you agree to our{" "}
            <button
              onClick={() => {
                useStore.getState().setLegalPage("terms");
                useStore.getState().setPage("legal");
                setLoginOpen(false);
              }}
              className="text-accent hover:underline"
            >
              Terms of Service
            </button>{" "}
            and{" "}
            <button
              onClick={() => {
                useStore.getState().setLegalPage("privacy");
                useStore.getState().setPage("legal");
                setLoginOpen(false);
              }}
              className="text-accent hover:underline"
            >
              Privacy Policy
            </button>
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}
