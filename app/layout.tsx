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
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <html lang="en">
      <body className="bg-gray-100 text-gray-900 h-screen">
        
        {/* Navbar (TOP MOST) */}
        <div className="fixed top-0 left-0 right-0 h-16 z-50 flex items-center bg-white shadow">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="md:hidden ml-4 p-2 rounded hover:bg-gray-100"
          >
            <Bars3CenterLeftIcon className="h-6 w-6" />
          </button>
          <Navbar />
        </div>

        {/* Overlay (below navbar) */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 bg-black/40 z-30 md:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Sidebar */}
        <div
          className={`fixed top-16 left-0 z-40 h-[calc(100vh-64px)] w-64 bg-white
          transition-transform duration-300
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
          md:translate-x-0`}
        >
          <Sidebar
            sidebarOpen={sidebarOpen}
            setSidebarOpen={setSidebarOpen}
          />
        </div>

        {/* Desktop Toggle */}
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className={`hidden md:block fixed top-20 z-50 bg-white p-2 rounded shadow
          ${sidebarOpen ? "left-64" : "left-2"}`}
        >
          <Bars3CenterLeftIcon className="h-5 w-5" />
        </button>

        {/* Main Content */}
        <main
          className={`pt-16 transition-all duration-300
          md:ml-64
          h-[calc(100vh-64px)] overflow-y-auto p-4 sm:p-6`}
        >
          {children}
        </main>

      </body>
    </html>
  );
}
