"use client";

import Link from "next/link";
import {
  PresentationChartBarIcon,
  ChartBarSquareIcon,
  SignalIcon,
  PowerIcon,
  TicketIcon
} from "@heroicons/react/24/solid";

export default function Sidebar({
  sidebarOpen,
  setSidebarOpen,
}: {
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
}) {
  return (
    <aside
      className={`h-[calc(100vh-2rem)] w-full max-w-[20rem] p-4 shadow-xl shadow-blue-gray-900/5 bg-white z-50 transform ${
        sidebarOpen ? "translate-x-0" : "-translate-x-full"
      } transition-transform duration-300 ease-in-out`}
    >
      <ul className="mt-10 space-y-2">
        <li>
          <Link
            href="/"
            className="flex items-center gap-3 p-2 rounded hover:bg-gray-100"
            onClick={() => setSidebarOpen(false)}
          >
            <PresentationChartBarIcon className="h-5 w-5 text-gray-600" />
            <span>Dashboard</span>
          </Link>
        </li>

        <li>
          <Link
            href="/campaigns"
            className="flex items-center gap-3 p-2 rounded hover:bg-gray-100"
            onClick={() => setSidebarOpen(false)}
          >
            <TicketIcon className="h-5 w-5 text-gray-600" />
            <span>Campaigns</span>
          </Link>
        </li>

        <li>
          <Link
            href="/insights"
            className="flex items-center gap-3 p-2 rounded hover:bg-gray-100"
            onClick={() => setSidebarOpen(false)}
          >
            <ChartBarSquareIcon className="h-5 w-5 text-gray-600" />
            <span>Insights</span>
          </Link>
        </li>

        <li>
          <Link
            href="/live"
            className="flex items-center gap-3 p-2 rounded hover:bg-gray-100"
            onClick={() => setSidebarOpen(false)}
          >
            <SignalIcon className="h-5 w-5 text-gray-600" />
            <span>Live Stream</span>
          </Link>
        </li>

        <li>
          <Link
            href="/logout"
            className="flex items-center gap-3 p-2 rounded hover:bg-gray-100"
            onClick={() => setSidebarOpen(false)}
          >
            <PowerIcon className="h-5 w-5 text-gray-600" />
            <span>Log Out</span>
          </Link>
        </li>
      </ul>
    </aside>
  );
}
