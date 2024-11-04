import React, { useEffect, useState } from "react";
import * as Form from "@radix-ui/react-form";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/router";
import { useSignal } from "@preact-signals/safe-react";
import Cookies from "js-cookie";
import { globalAPI, decryptAES } from "@/pages/function/globalFunctions";
import { rToast } from "@/pages/function/globalFunctions";
import { ReloadIcon } from "@radix-ui/react-icons";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import * as icons from "lucide-react";

import { Button } from "@/components/ui/button";
import { signal } from "@preact-signals/safe-react";
import { useMutation } from "@tanstack/react-query";

// const mutation = useMutation({
//   mutationFn: ([post]) => {
//     return globalAPI().post("/Users/addUser", post);
//   },
//   onSuccess: () => {
//     console.log("success");
//   },
// });

const addUsers = () => {
  const router = useRouter();

  const userCreds = useSignal();

  const [showPassword, setShowPassword] = useState(false);
  const userdata = useSignal({
    firstname: "",
    middlename: "",
    lastname: "",
    password: "",
    username: "",
    email: "",
    type: "User",
    createdBy: "",
    fullname: "",
    fullname2: "",
  });

  const handlePassword = () => {
    setShowPassword(!showPassword);
  };

  const mutation = useMutation({
    mutationFn: (addUser) => globalAPI().post("/Users/addUser", addUser),
    onSuccess: () => {
      rToast("Success", "Data Added", "success");
    },
    onError: (err) => {
      rToast("error", err, "error");
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    mutation.mutate({
      firstname: userdata.value.firstname,
      middlename: userdata.value.middlename,
      lastname: userdata.value.lastname,
      password: userdata.value.password,
      username: userdata.value.username,
      email: userdata.value.email,
      type: userdata.value.type,
      createdBy: userCreds.value.id,
      fullname: `${userdata.value.firstname} ${
        userdata.value.middlename == "" ? " " : userdata.value.middlename + " "
      }${userdata.value.lastname}`,
      fullname2: `${userdata.value.lastname} ${userdata.value.firstname} ${userdata.value.middlename} `,
    });
  };

  useEffect(() => {
    userCreds.value = JSON.parse(decryptAES(Cookies.get("uD")))[0];
  }, []);

  return (
    <div className="p-4">
      <Breadcrumb className="bg-white p-4 rounded-md shadow-sm dark:bg-slate-950  ">
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
            <BreadcrumbLink className="text-pgray ">Add Users</BreadcrumbLink>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <div className="p-4 my-4 bg-white  text-xs dark:bg-slate-950 rounded-md">
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
                  <span className="text-rose-400 ">*</span>First Name
                </span>
                <Form.Field name="firstname">
                  <Form.Control asChild>
                    <Input
                      name="firstname"
                      className="text-xs"
                      type="text"
                      required
                      onChange={(e) => {
                        userdata.value.firstname = e.target.value;
                      }}
                      value={userdata.firstname}
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
                <Form.Field name="middlename">
                  <Form.Control asChild>
                    <Input
                      name="middlename"
                      onChange={(e) => {
                        userdata.value.middlename = e.target.value;
                      }}
                      value={userdata.middlename}
                      className="text-xs"
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
                <Form.Field name="lastname">
                  <Form.Control asChild>
                    <Input
                      name="lastname"
                      onChange={(e) => {
                        userdata.value.lastname = e.target.value;
                      }}
                      value={userdata.lastname}
                      className="text-xs"
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
            <div className="grid lg:grid-cols-3  gap-4 border-t  pt-10 pb-4  ">
              <div className="max-h-[52px]">
                <span className="text-xs text-pgray dark:text-white">
                  <span className="text-rose-400">*</span>Email
                </span>
                <Form.Field name="email">
                  <Form.Control asChild>
                    <Input
                      name="email"
                      onChange={(e) => {
                        userdata.value.email = e.target.value;
                      }}
                      value={userdata.email}
                      className="text-xs"
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
                <Form.Field name="username">
                  <Form.Control asChild>
                    <Input
                      name="username"
                      onChange={(e) => {
                        userdata.value.username = e.target.value;
                      }}
                      value={userdata.username}
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
                <span className="text-xs text-pgray dark:text-white">
                  <span className="text-rose-400">*</span>Password
                </span>
                <Form.Field name="password" className="relative">
                  <Form.Control asChild>
                    <Input
                      id="showpassword"
                      name="password"
                      onChange={(e) => {
                        userdata.value.password = e.target.value;
                      }}
                      value={userdata.password}
                      className="text-xs"
                      type={showPassword == true ? "text" : "password"}
                      required
                    />
                  </Form.Control>
                  <Form.Message
                    className="text-rose-500/90 text-xs "
                    match="valueMissing"
                  >
                    Invalid Password
                  </Form.Message>
                  <button
                    type="button"
                    className="absolute top-2.5 right-2 cursor-pointer"
                    onClick={handlePassword}
                  >
                    {showPassword == true ? "Hide" : "Show"}
                  </button>
                </Form.Field>
              </div>

              <div className="max-h-[52px] lg:py-4">
                <span className="text-xs text-pgray dark:text-white ">
                  User Type
                </span>
                <Form.Field name="user_type">
                  <Select
                    className=""
                    defaultValue={userdata.value.type}
                    onValueChange={(e) => (userdata.value.type = e)}
                  >
                    <SelectTrigger className="text-xs">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup className="text-pgray dark:text-white">
                        <SelectLabel>User Type</SelectLabel>
                        <SelectItem
                          name="admin"
                          className="text-xs"
                          value="Admin"
                        >
                          Admin
                        </SelectItem>
                        <SelectItem
                          name="user"
                          className="text-xs"
                          value="User"
                        >
                          User
                        </SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </Form.Field>
              </div>
            </div>

            <Form.Submit asChild>
              <div className=" my-6  max-w-14">
                {mutation.isPending ? (
                  <Button
                    disabled
                    className="bg-gray-500 hover:bg-emerald-600/50 flex gap-2 dark:text-white"
                  >
                    <ReloadIcon className=" h-4 w-4 animate-spin" />
                    Adding
                  </Button>
                ) : (
                  <Button className="bg-emerald-500 hover:bg-emerald-600/50 flex gap-2 dark:text-white">
                    <icons.Save size={15} />
                    Add
                  </Button>
                )}
              </div>
            </Form.Submit>
          </Form.Root>
        </div>
      </div>
    </div>
  );
};

export default addUsers;
