import type { NextPage } from "next";
import Head from "next/head";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Navbar from "./components/navbar";
import {
  Clock,
  BadgeCheck,
  Building2,
  Mic2,
  Phone,
  Star,
  Users,
  ArrowRight,
  MessageSquare,
  BarChart,
  Bot,
  Building,
} from "lucide-react";
import Image from "next/image";
import ReservationForm from "./components/reservationForm";
import { useState } from "react";

const Home: NextPage = () => {

  const [isVoiceOpen, setIsVoiceOpen] = useState(false);
  const closeVoiceModal = () => setIsVoiceOpen(false);

  const openVoiceModal = () => {
    setIsVoiceOpen(true);
  };

  return (
    <>
      <Head>
        <title>RealEstateVoiceAI - AI Voice Assistant for Real Estate</title>
        <meta
          name="description"
          content="Transform your real estate business with AI-powered voice assistants"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="min-h-screen bg-[#f8fafc]">
        <Navbar openVoiceModal={openVoiceModal} />
        {/* Hero Bento Section */}
        <section className="container px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Main Hero Card */}
            <Card className="md:col-span-2 lg:row-span-2 bg-gradient-to-br from-[#1e293b] to-[#0f172a] text-white overflow-hidden">
              <CardContent className="p-8 flex flex-col justify-between h-full">
                <div className="space-y-6">
                  <div className="inline-flex items-center gap-2 bg-white/10 rounded-full px-4 py-1">
                    <Mic2 className="h-4 w-4 text-[#f59e0b]" />
                    <span className="text-sm">AI-Powered Voice Assistant</span>
                  </div>
                  <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
                    Transform Your Real Estate Business with Voice AI
                  </h1>
                  <p className="text-lg text-slate-300 max-w-xl">
                    Never miss a lead again. Our AI voice assistant handles
                    calls 24/7, qualifies leads, and schedules viewings
                    automatically.
                  </p>
                </div>
                <div className="flex flex-col sm:flex-row items-center sm:items-start justify-center sm:justify-start   sm:space-x-4">
  <Button
    onClick={openVoiceModal}
    className="w-full sm:w-fit mt-4 sm:mt-8 rounded-3xl bg-[#f59e0b] hover:bg-[#d97706] text-white p-4 sm:p-6"
  >
    Schedule Demo
    <ArrowRight className="ml-2 h-4 w-4" />
  </Button>
  <Button
    onClick={() => window.voiceflow.chat.open()}
    className="w-full sm:w-fit mt-4 sm:mt-8 rounded-3xl bg-[#f59e0b] hover:bg-[#d97706] text-white p-4 sm:p-6"
  >
    Interact with Chatbot
  </Button>
</div>

              </CardContent>
            </Card>
            {isVoiceOpen && (
              <ReservationForm
                isVoiceOpen={isVoiceOpen}
                onClose={closeVoiceModal}
              />
            )}
            {/* Stats Card */}
            <Card className="bg-white">
              <CardContent className="p-8">
                <div className="space-y-6">
                  <Building className="h-8 w-8 text-[#f59e0b]" />
                  <div className="space-y-2">
                    <h3 className="text-4xl font-bold text-[#f59e0b]">
                      2,500+
                    </h3>
                    <p className="text-slate-600">
                      Properties Sold via AI Assistant
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Feature Highlight */}
            <Card className="bg-[#f59e0b] text-white">
              <CardContent className="p-8">
                <div className="space-y-4">
                  <Users className="h-8 w-8" />
                  <h3 className="text-xl font-bold">Lead Qualification</h3>
                  <p>
                    AI automatically qualifies leads by asking the right
                    questions
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Features Bento Grid */}
        <section className="container px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Main Feature */}
            <Card className="md:col-span-2 bg-white overflow-hidden">
              <CardContent className="p-0">
                <div className="grid md:grid-cols-2 h-full">
                  <div className="p-8 space-y-4">
                    <h2 className="text-2xl font-bold">
                      Intelligent Voice Assistant
                    </h2>
                    <p className="text-slate-600">
                      Our AI understands natural language and handles complex
                      real estate queries
                    </p>
                    <ul className="space-y-2">
                      {[
                        "Natural conversation flow",
                        "Multi-language support",
                        "Property details handling",
                        "Price negotiations",
                      ].map((feature, i) => (
                        <li key={i} className="flex items-center gap-2">
                          <BadgeCheck className="h-5 w-5 text-[#f59e0b]" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="relative h-full min-h-[300px]">
                    <Image
                      src="https://images.unsplash.com/photo-1592595896551-12b371d546d5?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                      alt="AI Voice Assistant Dashboard"
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Success Story */}
            <Card className="bg-[#1e293b] text-white">
              <CardContent className="p-8">
                <div className="space-y-4">
                  <div className="flex gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 fill-[#f59e0b]" />
                    ))}
                  </div>
                  <blockquote className="text-lg">
                    "Increased our response rate by 300% and doubled our
                    conversions"
                  </blockquote>
                  <div className="pt-4 border-t border-white/20">
                    <p className="font-semibold">Sarah Johnson</p>
                    <p className="text-sm text-slate-300">
                      Premier Real Estate, NYC
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Benefits Bento Grid */}
        <section className="container px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              {
                icon: <Clock className="h-8 w-8 text-[#f59e0b]" />,
                title: "24/7 Availability",
                description: "Never miss a potential client call, day or night",
              },
              {
                icon: <MessageSquare className="h-8 w-8 text-[#f59e0b]" />,
                title: "Smart Responses",
                description:
                  "AI learns from interactions to provide better answers",
              },
              {
                icon: <BarChart className="h-8 w-8 text-[#f59e0b]" />,
                title: "Analytics",
                description:
                  "Detailed insights into call patterns and lead quality",
              },
              {
                icon: <Building2 className="h-8 w-8 text-[#f59e0b]" />,
                title: "Property Matching",
                description:
                  "Automatically matches leads with suitable properties",
              },
            ].map((benefit, i) => (
              <Card key={i} className="bg-white">
                <CardContent className="p-8">
                  <div className="space-y-4">
                    {benefit.icon}
                    <h3 className="text-xl font-bold">{benefit.title}</h3>
                    <p className="text-slate-600">{benefit.description}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* CTA Section */}
        <section className="container px-4 py-12">
          <Card className="bg-gradient-to-br from-[#1e293b] to-[#0f172a] text-white">
            <CardContent className="p-12">
              <div className="max-w-2xl mx-auto text-center space-y-8">
                <h2 className="text-3xl font-bold">
                  Ready to Transform Your Real Estate Business?
                </h2>
                <p className="text-lg text-slate-300">
                  Join leading real estate firms already using our AI voice
                  assistant
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button
                    onClick={openVoiceModal}
                    size="lg"
                    className="bg-[#f59e0b] hover:bg-[#d97706] rounded-3xl p-6"
                  >
                    <Phone className="mr-2 h-4 w-4 " />
                    Book a Demo
                  </Button>
                  {/* <Button size="lg" variant="outline" className="text-white border-white hover:bg-white/10">
                    View Pricing
                  </Button> */}
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Footer */}
        <footer className="border-t bg-white">
          <div className="container px-4 py-8">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <div className="flex items-center gap-2">
                <Mic2 className="h-6 w-6 text-[#f59e0b]" />
                <span className="font-bold text-xl">RealEstateVoiceAI</span>
              </div>
              <p className="text-sm text-slate-600">
                © {new Date().getFullYear()} RealEstateVoiceAI. All rights
                reserved.
              </p>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
};

export default Home;
