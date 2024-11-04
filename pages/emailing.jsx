import React, { useState, useRef, useEffect } from "react";
import { useTheme } from "next-themes";
import { MoonIcon, SunIcon } from "@radix-ui/react-icons";
import * as icons from "lucide-react";
import { AddClientDialog } from "./components/Email/EmailDialog";
import { hehehe } from "./components/Email/EmailDialog";
import { useSignal } from "@preact-signals/safe-react";

//shadcn
import {
  Breadcrumb,
  BreadcrumbEllipsis,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

import { Textarea } from "@/components/ui/textarea";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import { Button } from "@/components/ui/button";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Button } from "@/components/ui/button";
import { signal, useSignal } from "@preact-signals/safe-react";
import LoadingDialog from "./components/Email/LoadingDialog";
import { Progress } from "@/components/ui/progress";
import { globalAPI, rToast } from "./function/globalFunctions";
import { useMutation } from "@tanstack/react-query";

export const clientData = signal([]);
export const passDatas = signal();
export const markPasa = signal(false);

const admindashboard = () => {
  //  const clientData = useSignal([]);
  const { setTheme } = useTheme();
  const [preview, setPreview] = useState(null);
  const fileInput = useRef(null);
  const [open, setOpen] = useState(false);
  const selectedFile = useSignal(null);
  const tArea = useSignal("");
  const [progress, setProgress] = useState(0);
  const [loading, setLoading] = useState(false);
  const loadingCount = useSignal({
    current: 0,
    total: 0,
  });

  const handleFileChange = (e) => {
    selectedFile.value = e.currentTarget.files[0];

    const read = e.target.files[0];
    try {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(read);
    } catch (err) {
      console.log(err);
    }
  };

  const handleClick = () => {
    fileInput.current.click();
  };

  const closeasdasd = () => {
    setOpen(!open);
  };
  const failed = useSignal(false);
  async function sendEmail() {
    setLoading(true);
    failed.value = false;
    loadingCount.value.total = clientData.value.length;

    clientData.value.forEach(async (data, index) => {
      let file = selectedFile.value;
      let formData = new FormData();
      let config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };
      formData.append("Name", data.name);
      formData.append("company", data.company);
      formData.append("email", data.email);
      formData.append("letter", tArea.value);
      formData.append("image", file);

      await globalAPI()
        .post(`Emailing/sendToAll`, formData, config)
        .then(async (response) => {
          loadingCount.value.current = loadingCount.value.current + 1;
          if (response.status == 200) {
            clientData.value = clientData.value.filter(
              (x) => x.uId != data.uId
            );
            setProgress(
              (loadingCount.value.current / loadingCount.value.total) * 100
            );
          } else {
            failed.value = true;
          }
        })
        .catch(() => {
          failed.value = true;
          loadingCount.value.current = loadingCount.value.current + 1;
        })
        .finally(() => {
          if (loadingCount.value.current == loadingCount.value.total) {
            setTimeout(() => {
              setLoading(false);
              loadingCount.value.current = 0;
              failed
                ? rToast(
                    "Failed",
                    "Remaining data has not been sent!",
                    "warning"
                  )
                : rToast("Success", "Data Added", "success");
            }, 3000);
          }
        });
    });
  }

  return (
    <div className=" p-4 bg-slate-50 dark:bg-slate-900  ">
      {/* breadcrumb */}
      <Breadcrumb className="bg-white p-4 rounded-md shadow-sm dark:bg-slate-900 ">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink className="text-primary" href="/">
              Home
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          {/* <BreadcrumbItem>
            <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center gap-1">
                <BreadcrumbEllipsis className="h-4 w-4" />
                <span className="sr-only">Toggle menu</span>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start">
                <DropdownMenuItem>Documentation</DropdownMenuItem>
                <DropdownMenuItem>Themes</DropdownMenuItem>
                <DropdownMenuItem>GitHub</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </BreadcrumbItem>
          <BreadcrumbSeparator /> */}
          <BreadcrumbItem>
            <BreadcrumbLink className="text-pgray" href="/docs/components">
              Admin Dashboard
            </BreadcrumbLink>
          </BreadcrumbItem>
          {/* <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Breadcrumb</BreadcrumbPage>
          </BreadcrumbItem> */}
        </BreadcrumbList>
      </Breadcrumb>

      {/* //content */}
      <TooltipProvider>
        <div className="my-4 ">
          <div className=" rounded-md  grid grid-cols-2 gap-4">
            <div className="bg-white p-10 shadow-sm w-full flex flex-wrap justify-between items-center gap-6 dark:bg-slate-950 dark:border ">
              <p className="text-xs text-primary ">
                Hi, <span className="font-semibold ">Name Company Email</span>
              </p>
              <Textarea
                value={tArea.value}
                onChange={(e) => {
                  tArea.value = e.target.value;
                }}
                rows="6"
                className="text-xs"
                placeholder="Type your message here."
              />
            </div>

            <div className="bg-white p-4 shadow-sm w-auto flex items-center justify-center dark:bg-slate-950 dark:border ">
              <div style={{ textAlign: "center" }}>
                <input
                  className="hidden"
                  type="file"
                  onChange={(e) => handleFileChange(e)}
                  ref={fileInput}
                />

                {preview && (
                  <Tooltip>
                    <TooltipTrigger>
                      <div>
                        <img
                          onClick={handleClick}
                          src={preview}
                          alt="Preview"
                          className="h-[200px]"
                        />
                      </div>
                      <TooltipContent side="left" asChild>
                        <p>Re-upload Image</p>
                      </TooltipContent>
                    </TooltipTrigger>
                  </Tooltip>
                )}
              </div>
              <div
                onClick={handleClick}
                className={`${
                  preview == null ? "flex" : "hidden"
                } p-6 border-dashed border-2 flex items-center justify-center flex-col gap-4 w-full rounded-md cursor-pointer hover:bg-slate-200/50 dark:hover:bg-slate-900 transition-all ease-in-out `}
              >
                <icons.ImageUp size={60} className="text-slate-300" />
                <p className="text-sm text-pgray">
                  Upload Image{" "}
                  <span className="text-xs text-pgray">
                    (.jpeg, .jpg, .pneg)
                  </span>
                </p>
              </div>
            </div>
            <div className="bg-white p-4 shadow-sm w-full col-span-2 dark:bg-slate-950 dark:border ">
              <div className="my-4 flex items-center justify-between">
                <AddClientDialog isAdd={true} markpasa={markPasa.value} />

                <Button
                  onClick={() => {
                    sendEmail();
                  }}
                  disabled={
                    clientData.value.length == 0 ||
                    tArea.value == "" ||
                    selectedFile.value == null
                      ? true
                      : false
                  }
                  className="p-3.5 shadow-none h-0 bg-blue-500 hover:bg-blue-600/50 text-xs  dark:text-white"
                >
                  <icons.Send size={15} className="mr-1.5" />
                  Send Email
                </Button>
              </div>

              {loading == true ? (
                <>
                  <div className="flex items-center justify-center ">
                    <lord-icon
                      src="https://cdn.lordicon.com/tmqaflqo.json"
                      trigger="loop"
                      colors="primary:#c71f16,secondary:#ebe6ef,tertiary:#3a3347"
                      delay="0"
                      style={{ width: "100px", height: "100px" }}
                    />
                  </div>
                  <div className="flex items-center justify-center flex-col gap-2">
                    <p className="text-pgray text-3xl">
                      {loadingCount.value.current} out of{" "}
                      {loadingCount.value.total}
                    </p>
                    <p className="text-pgray text-lg">
                      {Number.parseInt(
                        (
                          (loadingCount.value.current /
                            loadingCount.value.total) *
                          100
                        ).toString()
                      )}
                      %
                    </p>
                    <Progress
                      indicatorColor={"bg-blue-500"}
                      value={progress}
                      className="w-[30%]"
                    />
                  </div>
                </>
              ) : clientData.value.length > 0 ? (
                <div className="shadow-md">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>Company</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead className="text-right">Action</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {clientData.value.map((data, index) => (
                        <TableRow
                          key={index}
                          onClick={() => (markPasa.value = "Edit")}
                        >
                          <TableCell>{data.name}</TableCell>
                          <TableCell>{data.company}</TableCell>
                          <TableCell>{data.email}</TableCell>
                          <TableCell className="text-right">
                            <AddClientDialog
                              isAdd={false}
                              clientDetails={data}
                              index={index}
                            />
                            <AddClientDialog
                              isAdd={false}
                              clientDetails={data}
                              index={index}
                              closeitona={closeasdasd}
                              isDelete={"isDeleted"}
                            />
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              ) : (
                <div className="flex items-center justify-center flex-col">
                  <icons.CloudOff size={80} className="text-slate-300" />
                  <h1 className="font-medium text-pgray">There is no Data</h1>
                </div>
              )}
            </div>
          </div>
        </div>
        {/* <LoadingDialog /> */}
      </TooltipProvider>
      <script src="https://cdn.lordicon.com/lordicon.js" />
    </div>
  );
};

export default admindashboard;

// var bar = new Promise((resolve, reject) => {
//   foo.forEach((value, index, array) => {
//       console.log(value);
//       if (index === array.length -1) resolve();
//   });
// });

// bar.then(() => {
//   console.log('All done!');
// });
