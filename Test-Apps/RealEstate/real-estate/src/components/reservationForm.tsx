/* eslint-disable react/prop-types */
import React, { useState, useEffect, FormEvent, ChangeEvent, MouseEvent } from "react";
// import { AiOutlineClose } from "react-icons/ai";
import toast from "react-hot-toast";
import { Button } from "./ui/button";

interface ReservationFormProps {
  isVoiceOpen: boolean;
  onClose: () => void;
}

const ReservationForm: React.FC<ReservationFormProps> = ({ isVoiceOpen, onClose }) => {
  const [email, setEmail] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  useEffect(() => {
    if (isVoiceOpen) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }

    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, [isVoiceOpen]);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/voice-agent/calls/legal`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, phone }),
      });

      if (response.ok) {
        toast.success(
          "Appointment request sent successfully. The AI voice agent will contact you soon!"
        );
        onClose();
      } else {
        const errorData = await response.json();
        toast.error(`Failed to send appointment request: ${errorData.message}`);
      }
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : "Unknown error occurred";
      toast.error(`Error occurred: ${errorMessage}`);
    } finally {
      setIsSubmitting(false);
      setEmail("");
      setPhone("");
    }
  };

  const handleOverlayClick = (e: MouseEvent<HTMLDivElement>) => {
    if ((e.target as HTMLDivElement).id === "overlay") {
      onClose();
    }
  };

  if (!isVoiceOpen) return null;

  return (
    <div
      id="overlay"
      className="fixed inset-0 bg-black/60 backdrop-blur-sm flex justify-center items-center z-50 p-4"
      onClick={handleOverlayClick}
    >
      <div className="bg-white rounded-2xl w-full max-w-md transform transition-all relative">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 p-2 hover:bg-gray-100 rounded-full transition-colors"
          aria-label="Close modal"
        >
          {/* <AiOutlineClose className="w-5 h-5 text-gray-500" /> */}
        </button>

        <div className="p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-gray-900">
              Schedule a Call Appointment
            </h2>
            <p className="text-gray-500 mt-2">
              Fill in your details and we&apos;ll get back to you
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                placeholder="you@example.com"
                required
              />
            </div>

            <div>
              <label
                htmlFor="phone"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Phone
              </label>
              <input
                type="tel"
                id="phone"
                value={phone}
                onChange={(e: ChangeEvent<HTMLInputElement>) => setPhone(e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                placeholder="+1 (555) 000-0000"
                required
              />
            </div>

            <div className="flex items-center justify-center">

            <Button
              type="submit"
              className="mt-8  bg-[#f59e0b] hover:bg-[#d97706] text-white  rounded-3xl p-6 text-lg"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <svg
                    className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Submitting...
                </>
              ) : (
                "Voice AI Demo Call"
              )}
            </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ReservationForm;
