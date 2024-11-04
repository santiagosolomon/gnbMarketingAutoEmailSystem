import React, { useEffect, useState } from "react";
import * as Form from "@radix-ui/react-form";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/router";

import {
  Breadcrumb,
  BreadcrumbEllipsis,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

import * as icons from "lucide-react";

import { Button } from "@/components/ui/button";

//import { user } from "../users";
import { signal, useSignal } from "@preact-signals/safe-react";
import { decryptAES, rToast } from "@/pages/function/globalFunctions";
import Cookies from "js-cookie";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { globalAPI } from "@/pages/function/globalFunctions";

const editUsers = () => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const userCreds = useSignal();
  const currentdate = new Date();
  const [storedSessionStorage, setSessionStorage] = useState([]);

  useEffect(() => {
    setSessionStorage(JSON.parse(sessionStorage.getItem("user")));
    userCreds.value = JSON.parse(decryptAES(Cookies.get("uD")))[0];
  }, []);

  const editMutation = useMutation({
    mutationFn: (updatedpost) =>
      globalAPI().post("/Users/editUser", updatedpost),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["usersList"] });
      rToast("Success", "Edit Success", "success");
    },
    onError: (err) => {
      rToast("error", err, "error");
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    editMutation.mutate({
      id: storedSessionStorage.id,
      firstname: storedSessionStorage.firstname,
      middlename: storedSessionStorage.middlename,
      lastname: storedSessionStorage.lastname,
      password: storedSessionStorage.password,
      username: storedSessionStorage.username,
      email: storedSessionStorage.email,
      type: storedSessionStorage.type,
      createdDate: currentdate,
      status: storedSessionStorage.status,
      modifiedBy: userCreds.value.id,
      fullname: `${storedSessionStorage.firstname} ${
        storedSessionStorage.middlename == ""
          ? " "
          : storedSessionStorage.middlename + " "
      }${storedSessionStorage.lastname}`,
      fullname2: `${storedSessionStorage.lastname} ${storedSessionStorage.firstname} ${storedSessionStorage.middlename} `,
    });
  };

  function handleChange(e) {
    const { value, name } = e.target;
    setSessionStorage((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  }

  return (
    <div className="p-4">
      <Breadcrumb className="bg-white p-4 shadow-sm  dark:bg-slate-950 rounded-md ">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink
              className="text-primary pointer-events-none"
              href="/"
            >
              Activity
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem onClick={() => router.push("/maintenance/users")}>
            <BreadcrumbLink className="text-pgray cursor-pointer ">
              Maintenance
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink className="text-pgray ">Edit Users</BreadcrumbLink>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <div className="p-4 my-4 bg-white  text-xs dark:bg-slate-950 rounded-md ">
        <button
          className="flex gap-2 items-center"
          onClick={() => router.push("/maintenance/users")}
        >
          <icons.MoveLeft size={18} />
          Back
        </button>
        <div className="py-8 px-4">
          <Form.Root onSubmit={handleSubmit} className="FormRoot ">
            <span className="text-xs text-pgray font-semibold dark:text-white">
              Full Name
            </span>
            <div className="grid lg:grid-cols-3 gap-4 border-t py-10  ">
              <div className="max-h-[52px]">
                <span className="text-xs text-pgray dark:text-white">
                  <span className="text-rose-400">*</span>First Name
                </span>
                <Form.Field name="first_name">
                  <Form.Control asChild>
                    <Input
                      className="text-xs"
                      name="firstname"
                      value={storedSessionStorage.firstname || ""}
                      onChange={handleChange}
                      type="text"
                      required
                    />
                  </Form.Control>
                  <Form.Message
                    className="text-rose-500/90 text-xs "
                    match="valueMissing"
                  >
                    Invalid First Name
                  </Form.Message>
                </Form.Field>
              </div>

              <div className="max-h-[52px]">
                <span className="text-xs text-pgray dark:text-white">
                  <span className="text-rose-400">*</span>Middle Name
                </span>
                <Form.Field name="middle_name">
                  <Form.Control asChild>
                    <Input
                      className="text-xs"
                      name="middlename"
                      value={storedSessionStorage.middlename || ""}
                      onChange={handleChange}
                      type="text"
                      required
                    />
                  </Form.Control>
                  <Form.Message
                    className="text-rose-500/90 text-xs "
                    match="valueMissing"
                  >
                    Invalid Middle Name
                  </Form.Message>
                </Form.Field>
              </div>

              <div className="max-h-[52px]">
                <span className="text-xs text-pgray dark:text-white">
                  <span className="text-rose-400">*</span>Last Name
                </span>
                <Form.Field name="last_name">
                  <Form.Control asChild>
                    <Input
                      className="text-xs"
                      name="lastname"
                      value={storedSessionStorage.lastname || ""}
                      onChange={handleChange}
                      type="text"
                      required
                    />
                  </Form.Control>
                  <Form.Message
                    className="text-rose-500/90 text-xs "
                    match="valueMissing"
                  >
                    Invalid Last Name
                  </Form.Message>
                </Form.Field>
              </div>
            </div>
            <span className="text-xs text-pgray font-semibold dark:text-white">
              Account Details
            </span>
            <div className="grid lg:grid-cols-3  gap-4 border-t pt-10 pb-4  ">
              <div className="max-h-[52px]">
                <span className="text-xs text-pgray dark:text-white">
                  <span className="text-rose-400">*</span>Email
                </span>
                <Form.Field name="email">
                  <Form.Control asChild>
                    <Input
                      className="text-xs"
                      name="email"
                      value={storedSessionStorage.email || ""}
                      onChange={handleChange}
                      type="text"
                      required
                    />
                  </Form.Control>
                  <Form.Message
                    className="text-rose-500/90 text-xs "
                    match="valueMissing"
                  >
                    Invalid Email
                  </Form.Message>
                </Form.Field>
              </div>

              <div className="max-h-[52px]">
                <span className="text-xs text-pgray dark:text-white">
                  <span className="text-rose-400">*</span>Username
                </span>
                <Form.Field name="Username">
                  <Form.Control asChild>
                    <Input
                      name="username"
                      value={storedSessionStorage.username || ""}
                      onChange={handleChange}
                      className="text-xs"
                      type="text"
                      required
                    />
                  </Form.Control>
                  <Form.Message
                    className="text-rose-500/90 text-xs "
                    match="valueMissing"
                  >
                    Invalid Username
                  </Form.Message>
                </Form.Field>
              </div>

              <div className="max-h-[52px]">
                <span className="text-xs text-pgray dark:text-white ">
                  User Type
                </span>
                <Form.Field name="type">
                  <Select
                    className=""
                    value={storedSessionStorage.type || ""}
                    onValueChange={(e) => {
                      const newValue = e;
                      setSessionStorage((prev) => {
                        return {
                          ...prev,
                          type: newValue,
                        };
                      });
                    }}
                  >
                    <SelectTrigger className="text-xs">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup className=" text-pgray">
                        <SelectLabel>User Type</SelectLabel>
                        <SelectItem className="text-xs" value="Admin">
                          Admin
                        </SelectItem>
                        <SelectItem className="text-xs" value="User">
                          User
                        </SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </Form.Field>
              </div>

              <div className="max-h-[52px]">
                <span className="text-xs text-pgray dark:text-white ">
                  Status
                </span>
                <Form.Field name="status">
                  <Select
                    value={
                      storedSessionStorage.status == 1 ? "Active" : "Inactive"
                    }
                    onValueChange={(e) => {
                      const newValue = e === "Active" ? 1 : 0;
                      setSessionStorage((prev) => {
                        return {
                          ...prev,
                          status: newValue,
                        };
                      });
                    }}
                  >
                    <SelectTrigger className="text-xs">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup className=" text-pgray">
                        <SelectLabel>User Type</SelectLabel>
                        <SelectItem className="text-xs" value={"Active"}>
                          Active
                        </SelectItem>
                        <SelectItem className="text-xs" value={"Inactive"}>
                          Inactive
                        </SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </Form.Field>
              </div>
            </div>
            <Form.Submit asChild>
              <div className=" my-6  max-w-14">
                <Button className="bg-emerald-500 hover:bg-emerald-600/50 flex gap-2 dark:text-white">
                  <icons.Save size={15} />
                  Save
                </Button>
              </div>
            </Form.Submit>
          </Form.Root>
        </div>
      </div>
    </div>
  );
};

export default editUsers;
