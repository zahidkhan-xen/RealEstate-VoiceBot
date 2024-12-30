import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import ReservationForm from "./reservationForm";
import { useState } from "react";

export default function Navbar({openVoiceModal}:any) {

    const [isVoiceOpen, setIsVoiceOpen] = useState(false);
    const closeVoiceModal = () => setIsVoiceOpen(false);
  
   

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/80 backdrop-blur-sm">
      <div className="container py-4">
        <nav className="flex items-center justify-between">
          <Link
            href="https://ehsaantech.com/"
            className="relative w-[120px] h-[80px]"
          >
            <Image
              src="/logo.png"
              alt="Ehsaantech Logo"
              fill
              className="object-contain"
              priority
            />
          </Link>

          {/* <div className="hidden md:flex items-center space-x-8">
            <Link href="#services" className="text-emerald-900 hover:text-emerald-700 font-medium">
              Services
            </Link>
            <Link href="#company" className="text-emerald-900 hover:text-emerald-700 font-medium">
              Company
            </Link>
            <Link href="#blogs" className="text-emerald-900 hover:text-emerald-700 font-medium">
              Blogs
            </Link>
          </div> */}

          <Button
            className="w-fit mt-8  bg-[#f59e0b] hover:bg-[#d97706] text-white animate-buttonheartbeat rounded-3xl p-6 text-lg"
            onClick={openVoiceModal}
          >
            Book a Call Now{" "}
          </Button>

          
        </nav>
      </div>
    </header>
  );
}
