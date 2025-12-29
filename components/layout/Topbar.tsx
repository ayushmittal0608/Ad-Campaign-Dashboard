"use client";

import { Fragment } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
} from "@headlessui/react";
import {
  Bars3Icon,
  BellIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";

interface NavItem {
  name: string;
  href: string;
}

const navigation: NavItem[] = [
  { name: "Dashboard", href: "/" },
  { name: "Team", href: "/team" },
  { name: "Projects", href: "/projects" },
  { name: "Calendar", href: "/calendar" },
];

function classNames(...classes: (string | false | null | undefined)[]) {
  return classes.filter(Boolean).join(" ");
}

export default function Navbar() {
  const pathname = usePathname();

  return (
    
    <Disclosure as="nav" className="bg-gray-800">
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="relative flex h-16 items-center justify-between">
          
          <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
            <DisclosureButton className="group inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-white/5 hover:text-white">
              <Bars3Icon className="block size-6 group-data-open:hidden" />
              <XMarkIcon className="hidden size-6 group-data-open:block" />
            </DisclosureButton>
          </div>

          {/* Logo + Desktop Nav */}
          <div className="flex flex-1 items-center justify-center sm:justify-start">
            <div className="flex shrink-0 items-center justify-center">
              <span className="text-white font-semibold justify-center items-center">Campaign Dashboard</span>
            </div>

           
          </div>

        </div>
      </div>

      {/* Mobile menu */}
      <DisclosurePanel className="sm:hidden">
        <div className="space-y-1 px-2 pt-2 pb-3">
          {navigation.map((item) => {
            const active = pathname === item.href;

            return (
              <DisclosureButton
                key={item.name}
                as={Link}
                href={item.href}
                className={classNames(
                  active
                    ? "bg-gray-900 text-white"
                    : "text-gray-300 hover:bg-white/5 hover:text-white",
                  "block rounded-md px-3 py-2 text-base font-medium"
                )}
              >
                {item.name}
              </DisclosureButton>
            );
          })}
        </div>
      </DisclosurePanel>
    </Disclosure>
  );
}
