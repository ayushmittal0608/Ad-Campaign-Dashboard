"use client";
import "./globals.css";
import Sidebar from "../components/layout/Sidebar";
import Navbar from "../components/layout/Topbar";
import { useState } from "react";
import { Bars3CenterLeftIcon } from "@heroicons/react/24/solid";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <html lang="en">
      <body className="bg-gray-100 text-gray-900 h-screen overflow-hidden">
        
        {/* Topbar */}
        <div className="fixed top-0 left-0 right-0 h-16 z-40">
          <Navbar />
        </div>

        {/* Sidebar */}
        <div
          className={`fixed top-16 left-0 h-[calc(100vh-64px)] w-64 z-30
          transition-transform duration-300
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}`}
        >
          <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        </div>

        {/* Toggle Button */}
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className={`fixed top-20 left-2 z-50 bg-white p-2 rounded  ${sidebarOpen ? "left-64" : "left-2"}`}
        >
          <Bars3CenterLeftIcon className="h-5 w-5" />
        </button>

        {/* Main Content */}
        <main
          className={`pt-16 transition-all duration-300
          ${sidebarOpen ? "ml-64" : "ml-0"}
          h-screen overflow-y-auto p-6`}
        >
          {children}
        </main>

      </body>
    </html>
  );
}
