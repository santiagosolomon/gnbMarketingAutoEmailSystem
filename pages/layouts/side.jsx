"use client";

import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/router";
import { usePathname } from "next/navigation";
import Link from "next/link";
//shadcn

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";

//lucide icons

import {
  User,
  Lock,
  ChevronDown,
  ChevronUp,
  LayoutDashboard,
} from "lucide-react";

//zustand

import { useStore } from "@/store/store";

import useWindowDimensions from "../function/WindowDimension";
import { getThemeHead } from "./header";
const side = () => {
  const router = useRouter();
  const pathname = usePathname();
  const [openSide, setOpenSide] = useState(false);
  const openbar = useStore((state) => state.bar);
  const setopenbar = useStore((state) => state.setBar);
  const { width } = useWindowDimensions();

  function handleSideClick() {
    setOpenSide(!openSide);
  }

  // mark and mon kapag inopen mo to yung desktop at yung desktop bar neto bubukas

  useEffect(() => {
    if (width >= 1500) {
      setopenbar(!openbar);
    }
  }, []);

  return (
    <TooltipProvider>
      <aside
        className={`${
          openbar
            ? "w-[80px] hidden lg:block opacity-100  "
            : "block w-[300px] "
        } fixed   transition-all border-r border-b h-screen bg-white z-50 dark:bg-slate-950 text-primary `}
      >
        <div
          className={`p-[0.9rem] flex items-center  justify-center ${
            openbar ? "gap-0" : "gap-4"
          } `}
        >
          <img
            src={
              getThemeHead.value == "light"
                ? "/images/sa2.png"
                : "/images/logodarkmode.png"
            }
            className="max-w-[47px] transition-all"
            alt="picture"
            loading=""
          />

          <h1 className="text-xs font-bold">
            {openbar ? "" : "System Template"}
          </h1>
        </div>

        <div className={`py-10 px-4 h-screen flex flex-col gap-4`}>
          {/* //Dashboard */}
          <Tooltip disableHoverableContent="false">
            <div className="flex flex-col gap-2">
              <TooltipTrigger
                className={`flex items-start justify-start ${
                  openbar ? "cursor-pointer" : "cursor-default"
                }`}
              >
                <h1 className="text-sm font-bold">
                  {openbar ? "..." : "Home"}
                </h1>
                {openbar ? (
                  <TooltipContent side="left" asChild>
                    <p>Home</p>
                  </TooltipContent>
                ) : (
                  ""
                )}
              </TooltipTrigger>

              <ul className={`flex flex-col gap-2  ${openbar ? "p-0" : "p-2"}`}>
                <Tooltip disableHoverableContent="false">
                  <TooltipTrigger>
                    <li
                      onClick={() => router.push("/dashboard")}
                      className={`${
                        openbar ? "justify-center" : "justify-normal"
                      } ${
                        pathname === "/dashboard"
                          ? "bg-rose-700 text-white"
                          : "bg-none"
                      } flex gap-4 text-xs items-center  p-2  rounded-md cursor-pointer `}
                    >
                      <LayoutDashboard size={16} />
                      {openbar ? "" : "Dashboard"}
                    </li>
                    {openbar ? (
                      <TooltipContent side="left" asChild>
                        <p>Dashboard</p>
                      </TooltipContent>
                    ) : (
                      ""
                    )}
                  </TooltipTrigger>
                </Tooltip>
              </ul>
            </div>
          </Tooltip>

          {/* Home */}
          <Tooltip disableHoverableContent="false">
            <div className="flex flex-col gap-2">
              <TooltipTrigger
                className={`flex items-start justify-start ${
                  openbar ? "cursor-pointer" : "cursor-default"
                }`}
              >
                <h1 className="text-sm font-bold">
                  {openbar ? "..." : "Activity"}
                </h1>
                {openbar ? (
                  <TooltipContent side="left" asChild>
                    <p>Home</p>
                  </TooltipContent>
                ) : (
                  ""
                )}
              </TooltipTrigger>

              <ul className={`flex flex-col gap-2  ${openbar ? "p-0" : "p-2"}`}>
                <Tooltip disableHoverableContent="false">
                  <TooltipTrigger>
                    <li
                      onClick={() => router.push("/emailing")}
                      className={`${
                        openbar ? "justify-center" : "justify-normal"
                      } ${
                        pathname === "/emailing"
                          ? "bg-rose-700 text-white"
                          : "bg-none"
                      } flex gap-4 text-xs items-center  p-2  rounded-md cursor-pointer `}
                    >
                      <LayoutDashboard size={16} />
                      {openbar ? "" : "Emailing"}
                    </li>
                    {openbar ? (
                      <TooltipContent side="left" asChild>
                        <p>Emailing</p>
                      </TooltipContent>
                    ) : (
                      ""
                    )}
                  </TooltipTrigger>
                </Tooltip>

                <Tooltip disableHoverableContent="false">
                  <TooltipTrigger>
                    <li
                      onClick={() => router.push("/maintenance/users")}
                      className={`${
                        openbar ? "justify-center" : "justify-normal"
                      } ${
                        pathname === "/maintenance/users" ||
                        pathname === "/maintenance/users/editUsers" ||
                        pathname === "/maintenance/users/addUsers"
                          ? "bg-rose-700 text-white"
                          : "bg-none"
                      } flex gap-4 text-xs items-center  p-2  rounded-md cursor-pointer `}
                    >
                      <LayoutDashboard size={16} />
                      {openbar ? "" : "Maintenance"}
                    </li>
                    {openbar ? (
                      <TooltipContent side="left" asChild>
                        <p>Maintenance</p>
                      </TooltipContent>
                    ) : (
                      ""
                    )}
                  </TooltipTrigger>
                </Tooltip>
              </ul>
            </div>
          </Tooltip>
        </div>
      </aside>
      <div
        onClick={() => setopenbar(true)}
        className={`${
          openbar == true
            ? "backdrop-blur-none hidden"
            : "backdrop-blur-sm lg:pointer-events-none lg:backdrop-blur-none "
        } z-20  absolute left-[300px] bottom-0 right-0 top-0 `}
      />
    </TooltipProvider>
  );
};

export default side;
