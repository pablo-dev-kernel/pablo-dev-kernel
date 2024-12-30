"use client";
import Link from "next/link";
// Global Components
import { NavbarPortal, IconAutorenew, IconInfo } from "@/components/customized";

const links = [
  {
    url: "dashboard",
    label: "panel de control",
    icon: <IconInfo />
  }
];

const otherslinks = [
  {
    url: "home",
    label: "inicio",
    icon: <IconAutorenew />
  },
  {
    url: "",
    label: "app",
    icon: <IconAutorenew />
  }
];

export default function UserLayout(props: {
  children: React.ReactNode;
}) {
  return (
    <div className="h-screen flex flex-col">
      <header className="flex justify-between items-center p-1 md:px-2">
        <Link href={"sale"} title={"ir a ventas"}>
          <h1 className="text-stone-400 hover:text-stone-200 text-xl uppercase font-semibold">sistema de stock</h1>
        </Link>

        <NavbarPortal listRoutes={links} othersRoutes={otherslinks} />
      </header>

      <div className="flex-grow overflow-auto py-2">
        {props.children}
      </div>
    </div>
  );
}
