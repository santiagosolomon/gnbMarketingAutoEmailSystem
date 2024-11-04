"use client";
import React, { useEffect, useState, useRef } from "react";
import Cookies from "js-cookie";
import { useTheme } from "next-themes";

//shadcn

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

//lucide icons
import { Menu, LogOut, BellRing, Sun, MoonStar } from "lucide-react";

import { useStore } from "@/store/store";
import { signal, useSignal } from "@preact-signals/safe-react";

export const getThemeHead = signal("");

export const header = () => {
  const [themeLs, setThemeLs] = useState("");
  const { setTheme } = useTheme();

  const openbar = useStore((state) => state.bar);
  const setopenbar = useStore((state) => state.setBar);

  const [rightSideBar, setrightSideBar] = useState(false);
  const [rightSideBarNotif, setrightSideBarNotif] = useState(false);

  const ref = useRef();
  const ref1 = useRef();
  const ref2 = useRef();

  function handleBarsClick() {
    setopenbar(!openbar);
  }

  function handleBarsClickRight() {
    setrightSideBar(!rightSideBar);
    //false other bars
    setrightSideBarNotif(false);
  }
  function handleBarsClickRightNotif() {
    setrightSideBarNotif(!rightSideBarNotif);

    //false other bars
    setrightSideBar(false);
  }

  function handleClickTheme() {
    if (themeLs == "light") {
      setTheme("dark");
      setThemeLs("dark");
    } else {
      setTheme("light");
      setThemeLs("light");
    }
  }

  useEffect(() => {
    const x = localStorage.getItem("theme");

    if (x != null) {
      setThemeLs(x);
      getThemeHead.value = themeLs;
    }
    getThemeHead.value = x;
  }, [themeLs]);

  function logoutUser() {
    Cookies.remove("uD");
    location.reload();
  }

  useEffect(() => {
    const handleOutSideClick = (event) => {
      if (
        !ref.current?.contains(event.target) &&
        !ref1.current?.contains(event.target) &&
        !ref2.current?.contains(event.target)
      ) {
        setrightSideBar(false);
        setrightSideBarNotif(false);
      }
    };

    window.addEventListener("mousedown", handleOutSideClick);
    return () => {
      window.removeEventListener("mousedown", handleOutSideClick);
    };
  }, [ref, ref1, ref2]);

  function asdasdas(e) {
    e.stopPropagation();
  }

  return (
    <>
      <nav
        onClick={asdasdas}
        className=" py-4 w-full bg-white dark:bg-slate-950 border-b top-0 sticky "
      >
        <div className="flex justify-between px-4">
          <div className="flex items-center gap-4">
            <button onClick={handleBarsClick} id="oButton">
              <Menu className="text-pgray" />
            </button>
            <div className=" gap-2 items-center text-xs hidden md:flex ">
              <h1 className="">Welcome,</h1>
              <p className="text-xs font-semibold ">Nathalie Babinaeu</p>
            </div>
          </div>
          <div ref={ref2} className="flex items-center ">
            <div className="flex items-center gap-4 px-4">
              <div onClick={handleClickTheme}>
                {themeLs == "light" ? (
                  <MoonStar size={16} className="cursor-pointer  " />
                ) : (
                  <Sun size={16} className="cursor-pointer" />
                )}
              </div>

              <BellRing
                onClick={handleBarsClickRightNotif}
                className="cursor-pointer"
                size={16}
              />
            </div>
            <button
              className="bg-primary dark:bg-slate-900 select-none text-white rounded-full p-2 flex items-center justify-center  cursor-pointer "
              onClick={handleBarsClickRight}
            >
              NB
            </button>
            {/* //RING LOGO CLICK */}
            <div
              className={`relative ${rightSideBarNotif ? "flex" : "hidden"}`}
            >
              <div
                ref={ref1}
                // className={`${
                //   rightSideBarNotif ? "h-auto" : "h-[0]"
                // }  absolute  bg-white dark:bg-slate-950 w-[250px] right-0  top-[2.23rem]  rounded-md shadow-md flex flex-col z-50 lg:w-[350px] `}
                className={`$ absolute dark:border select-none  bg-white dark:bg-slate-950 w-[250px] right-0  top-[2.23rem]  rounded-md shadow-md flex flex-col z-50 lg:w-[350px] `}
              >
                <div className={` p-4 border-b w-full  justify-center  `}>
                  <h1 className="text-xs font-semibold">Notification</h1>
                </div>
                <div className="pt-4 px-4 space-y-2">
                  <div>
                    <div className="flex items-center space-x-4">
                      <div className=" w-12  bg-gray-50">
                        <img
                          src="https://ui.shadcn.com/avatars/01.png"
                          loading="lazy"
                          alt="icon-picture"
                        />
                      </div>
                      <div className="flex flex-col w-full">
                        <div className="w-full ">
                          <p className="text-xs text-primary font-medium">
                            GroupNB
                          </p>
                          <p className="text-xs text-pgray">
                            groupnb123@gmail.com
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="flex w-full">
                      <div className="line-clamp-2">
                        <p className="text-xs">
                          Lorem, ipsum dolor sit amet consectetur adipisicing
                          elit. Rerum beatae quam iusto assumenda harum
                          doloremque fugit incidunt, laborum maxime tempora.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div
                  className={`p-4 mt-4  w-full  bg-gray-50 dark:bg-slate-950 dark:border-t hover:bg-gray-100 items-center justify-center gap-4 group`}
                >
                  <h1 className="text-xs text-center">View All</h1>
                </div>
              </div>
            </div>
            {/* //NB LOGO CLICK */}
            <div className={`relative ${rightSideBar ? "flex" : "hidden"}`}>
              <div
                ref={ref}
                className={`  absolute cursor-default bg-white dark:bg-slate-950 dark:border   w-[200px] right-0  top-[2.23rem]   rounded-md shadow-md flex flex-col justify-between z-50 `}
              >
                <div className={` p-4 -full justify-center `}>
                  <h1 className="text-xs font-semibold">Nathalie Babinaeu</h1>
                </div>
                <div
                  onClick={logoutUser}
                  className={`flex p-4 w-full cursor-pointer  bg-gray-50 dark:bg-slate-950 dark:border-t hover:bg-gray-100 items-center justify-center   gap-4 group`}
                >
                  <LogOut size={16} className="group-hover:text-rose-700" />
                  <h1 className="text-xs">Logout</h1>
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};
export default header;
