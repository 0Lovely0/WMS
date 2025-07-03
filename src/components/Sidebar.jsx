"use client";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { MdOutlineInventory2, MdOutlineEventNote } from "react-icons/md";
import { LuNotebookText } from "react-icons/lu";
import { GrNorton } from "react-icons/gr";
import { GiGate } from "react-icons/gi";
import { RiTakeawayLine } from "react-icons/ri";

export default function Sidebar() {
  const pathname = usePathname();

  const links = [
    {
      href: "/dashboard",
      label: "Inbound",
      icon: <MdOutlineInventory2 className="text-2xl" />,
    },
    {
      href: "/po",
      label: "PO",
      icon: <MdOutlineEventNote className="text-2xl" />,
    },
    {
      href: "/asn",
      label: "ASN",
      icon: <LuNotebookText className="text-2xl" />,
    },
    {
      href: "/gateEntries",
      label: "GE",
      icon: <GiGate className="text-2xl" />,
    },
    { href: "/grn", label: "GRN", icon: <GrNorton className="text-2xl" /> },
    {
      href: "/putaway",
      label: "Putaway",
      icon: <RiTakeawayLine className="text-2xl" />,
    },
  ];

  return (
    <div
      className="flex justify-center items-start min-h-screen w-[80px]"
      style={{ backgroundColor: "#181824" }}
    >
      <div className="flex flex-col justify-start items-center w-[70px] h-screen space-y-20 text-white">
        {links.map((link, index) => {
          const isActive = pathname === link.href;

          return (
            <Link
              key={index}
              href={link.href}
              className={`hover:text-blue-500 ${
                isActive ? "text-blue-500" : "text-gray-500"
              }`}
            >
              <div
                className="flex flex-col justify-center items-center "
                style={{ marginTop: index === 0 ? "30px" : "0" }}
              >
                {link.icon}
                <p>{link.label}</p>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
