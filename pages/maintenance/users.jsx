import React, { useEffect } from "react";
import { Input } from "@/components/ui/input";

import {
  Breadcrumb,
  BreadcrumbEllipsis,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

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

import * as icons from "lucide-react";

import { useRouter } from "next/router";
import { Button } from "@/components/ui/button";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { globalAPI } from "../function/globalFunctions";
import { useSignal } from "@preact-signals/safe-react";
import { Skeleton } from "@/components/ui/skeleton";
import SkeletonDemo from "../SkeletonDemo";
import {
  Pagination,
  PaginationItem,
  PaginationCursor,
} from "@nextui-org/pagination";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { signal } from "@preact-signals/safe-react";

export const user = signal([]);

const users = () => {
  const router = useRouter();
  const page = useSignal(1);
  const paginateCount = useSignal(1);
  const searchLoading = useSignal(false);
  const drpValue = useSignal(5);
  const search = useSignal({
    param: "",
    values: "",
  });

  const drpValues = [5, 10, 50, 100, 500, 1000, 2000, 5000];

  const { isLoading, isError, data, error, isSuccess, refetch } = useQuery({
    queryKey: ["usersList", page.value],
    queryFn: async () =>
      await globalAPI().get(
        `Users/userList?page=${page.value - 1}&size=${drpValue.value}&search=${
          search.value.param
        }`
      ),

    keepPreviousData: true,
  });

  if (isError) {
    return <span>Error: {error.message}</span>;
  }

  useEffect(() => {
    searchLoading.value = false;
    if (isSuccess && paginateCount.value != data.data.paginateCount) {
      paginateCount.value = data.data.paginateCount;
    }
  }, [isSuccess, data]);

  const onPage = (pages) => {
    page.value = pages;
  };

  return (
    <div className="p-4 bg-gray-50">
      <Breadcrumb className="bg-white p-4 rounded-md shadow-sm dark:bg-slate-900 ">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink className="text-primary" href="/">
              Home
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink
              className="text-primary pointer-events-none"
              href="/"
            >
              Maintenance
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink className="text-pgray ">Users</BreadcrumbLink>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <div className="p-6 my-4  rounded-md bg-white dark:bg-slate-950 shadow-sm  ">
        <div className="flex items-center justify-between">
          <Button
            className="p-3.5 shadow-none h-0 bg-blue-500 hover:bg-blue-600/50 text-xs  dark:text-white my-4"
            onClick={() => router.push("/maintenance/users/addUsers")}
          >
            <icons.UserRoundPlus size={15} className="mr-1.5" />
            Add
          </Button>
          <div className="relative">
            <span className="px-2  text-primaryGray border-r-2 absolute top-2.5 text-pgray">
              <icons.Search size={16} />
            </span>
            <div className="flex items-center gap-2">
              <Input
                className="xl:w-[300px] pl-10 text-xs "
                type="text"
                placeholder="Search"
                required
                onChange={(e) => {
                  search.value.values = e.target.value;
                  if (e.target.value == "") {
                    searchLoading.value = true;
                    search.value.param = search.value.values;
                    page.value == 1 ? refetch() : (page.value = 1);
                  }
                }}
                onKeyUp={(e) => {
                  if (e.key == "Enter") {
                    searchLoading.value = true;
                    search.value.param = search.value.values;
                    page.value == 1 ? refetch() : (page.value = 1);
                  }
                }}
              />
              <Button
                onClick={() => {
                  searchLoading.value = true;
                  search.value.param = search.value.values;
                  page.value == 1 ? refetch() : (page.value = 1);
                }}
                className="bg-blue-500 hover:bg-blue-600/50 text-xs text-white"
              >
                Search
              </Button>
            </div>
          </div>
        </div>
        <Table className="border dark:border-gray-800 border-gray-100 ">
          <TableCaption>
            <div className="overflow-hidden flex flex-col   ">
              <div className="flex justify-between items-center ">
                <div className="flex flex-col">
                  <div className="flex items-start justify-start flex-col-reverse gap-4">
                    <Pagination
                      className={`${
                        isLoading || data.data.userList.length > 0
                          ? "flex"
                          : "hidden"
                      }`}
                      classNames={{
                        cursor: " text-white bg-blue-500 ",
                      }}
                      total={paginateCount.value}
                      page={page.value}
                      onChange={onPage}
                    />
                    <div
                      className={`${
                        isLoading || data.data.userList.length == 0
                          ? "hidden"
                          : "flex"
                      }`}
                    >
                      <Select
                        className={`${
                          isLoading || data.data.userList.length == 0
                            ? "hidden"
                            : "hidden"
                        }`}
                        defaultValue={5}
                        onValueChange={(e) => {
                          drpValue.value = e;
                          searchLoading.value = true;
                          page.value == 1 ? refetch() : (page.value = 1);
                        }}
                      >
                        <SelectTrigger className="text-xs">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup className={`text-pgray dark:text-white`}>
                            <SelectLabel>User Type</SelectLabel>
                            {drpValues.map((item, key) => {
                              return (
                                <SelectItem
                                  key={key}
                                  className="text-xs"
                                  value={item}
                                >
                                  {item}
                                </SelectItem>
                              );
                            })}
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
                {isLoading || searchLoading.value ? (
                  <span>Total: {data == null ? "" : data.data.userCount}</span>
                ) : (
                  <span>Total: {data == null ? "" : data.data.userCount}</span>
                )}
              </div>
            </div>
          </TableCaption>
          <TableHeader>
            <TableRow className="text-xs">
              <TableHead className=" uppercase">First Name</TableHead>
              <TableHead className=" uppercase">Middle Name</TableHead>
              <TableHead className=" uppercase">Last Name</TableHead>
              <TableHead className=" uppercase">Type</TableHead>
              <TableHead className=" uppercase">Status</TableHead>
              <TableHead className=" text-xs uppercase">Action</TableHead>
            </TableRow>
          </TableHeader>

          {isLoading || searchLoading.value ? (
            <SkeletonDemo cards={10} />
          ) : (
            <>
              <TableBody>
                {data.data.userList.length > 0 ? (
                  data.data.userList.map((item) => {
                    return (
                      <TableRow key={item.id} className="text-xs">
                        <TableCell>{item.firstname}</TableCell>
                        <TableCell>{item.middlename}</TableCell>
                        <TableCell>{item.lastname}</TableCell>
                        <TableCell>{item.type}</TableCell>
                        <TableCell className="py-4">
                          <h1
                            className={` text-white  border rounded-md w-[60px] text-center   p-1.5 ${
                              item.status == 1
                                ? "bg-emerald-400 border-emerald-500"
                                : "bg-rose-400 border-rose-500"
                            }`}
                          >
                            {item.status == 1 ? "Active" : "Inactive"}
                          </h1>
                        </TableCell>
                        <TableCell>
                          <button
                            onClick={() => {
                              sessionStorage.setItem("user",JSON.stringify(item));
                              router.push({
                                pathname: `/maintenance/users/editUsers`,
                              });
                              user.value = item; 
                            }}
                            className="bg-blue-400 border-blue-500 border hover:bg-blue-600/50 rounded-md text-white p-1.5"
                          >
                            <icons.Pencil className=" text-white " size={15} />
                          </button>
                        </TableCell>
                      </TableRow>
                    );
                  })
                ) : (
                  <TableRow>
                    <TableCell colSpan={8}>
                      <div className="flex items-center justify-center flex-col">
                        <img
                          src="/images/norecords.svg"
                          className="w-[300px]"
                          alt="image"
                          loading="lazy"
                        />
                        <h1 className="">No Records Found</h1>
                      </div>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </>
          )}
        </Table>
      </div>
    </div>
  );
};

export default users;
