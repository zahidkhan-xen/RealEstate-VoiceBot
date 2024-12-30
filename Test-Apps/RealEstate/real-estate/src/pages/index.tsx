import Image from "next/image";
import LandingPage from "@/page";
import { Toaster } from 'react-hot-toast';

export default function Home() {
  return (
    <div
    >
    <Toaster position="top-center" />
     <LandingPage/>
    </div>
  );
}
