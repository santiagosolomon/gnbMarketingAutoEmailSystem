// shadcn
import * as Form from "@radix-ui/react-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

// lucide

import { User, Lock, TicketX } from "lucide-react";
import { ReloadIcon } from "@radix-ui/react-icons";

//react state
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

// GlobalFunctions.js
import { globalAPI, encryptAES } from "./function/globalFunctions";
import { useMutation } from "@tanstack/react-query";

//Real Time
import { HubConnectionBuilder } from "@microsoft/signalr";
import { cookies } from "next/headers";

//cookies
import Cookies from "js-cookie";

//zustand store

import { useStore } from "@/store/store";
import { OTPDialog } from "./components/Email/OTPDialog";

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
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";

export default function Home() {
  const [connectionmsg, setConnectionmsg] = useState("");
  const passwordText = useStore((state) => state.bar);
  const setPasswordText = useStore((state) => state.setBar);
  const [errorMessage, setErrorMessage] = useState("");
  const [username, setUsername] = useState(""),
    [password, setPassword] = useState(""),
    router = useRouter(),
    [data, setData] = useState({}),
    setStorage = (nameKey, value) => {
      setData((prevData) => ({ ...prevData, [nameKey]: value }));
    },
    getStorage = (nameKey) => {
      return data[nameKey];
    };

  //functionRealTime
  const connection = new HubConnectionBuilder()
    .withUrl("http://192.168.0.35:5289/Groupnb@2024Lumping")
    .withAutomaticReconnect()
    .build();
  const [messages, setMessage] = useState([]);
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");

  connection.on("ReceiveMessage", (user, message) => {
    const newMessages = [...messages, { user, message }];

    cookies().set("login", res.data, { secure: true });
    console.log(message);

    tanLogin.mutate();
  });

  useEffect(() => {
    //functionRealTime
    connectionStart();
  }, []);

  function connectionStart() {
    connection
      .start()
      .then(() => {
        console.log("Connection established");
      })
      .catch((err) => {
        // setConnectionmsg(err.message);
      });
  }

  //function for show password

  function handleShowPasword() {
    setPasswordText(!passwordText);
  }

  //functionLogin
  const tanLogin = useMutation({
    mutationFn: () =>
      globalAPI()
        .post(`Login/login`, {
          username: username,
          password: password,
        })
        .catch((err) => {
          setErrorMessage(err.response.data);
          setOpen(false);
        }),
    onSuccess: (res) => {
      const encryptedText = encryptAES(JSON.stringify(res.data));
      Cookies.set("uD", encryptedText);
      router.push("/dashboard");

      console.log(res)
    },
    onError: (error) => {
      setConnectionmsg(error.response);
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    tanLogin.mutate();
  };

  const handleSubmitOTP = (e) => {
    e.preventDefault();
  };

  return (
    <>
      <div className="flex flex-col justify-center h-screen m-4 md:max-w-screen-sm md:m-auto lg:max-w-[500px] xl:flex-row xl:items-center xl:max-w-screen-2xl  ">
        <div className="xl:flex rounded-md xl:items-center xl:border xl:justify-center  ">
          <div className=" rounded-md hidden lg:flex   ">
            <img
              src="/images/loginGNB.png"
              className="w-full"
              alt="logo"
              loading="lazy"
            ></img>
          </div>
          <div className="flex flex-col gap-4 border rounded-md xl:border-none p-6 xl:p-10 ">
            <div className="flex flex-col gap-2 items-center">
              <h1 className="font-bold">Welcome</h1>
              <p className="text-xs">Login to access your account</p>
            </div>
            <Form.Root onSubmit={handleSubmit} className="FormRoot">
              <div className="flex flex-col gap-4 xl:h-[250px]">
                <Form.Field className="grid" name="email">
                  <div className="relative ">
                    <span className="px-2  text-primaryGray border-r-2 absolute top-2.5  text-pgray">
                      <User size={16} />
                    </span>
                    <Form.Control asChild>
                      <Input
                        value={username}
                        onChange={(event) => setUsername(event.target.value)}
                        className="xl:w-[300px] pl-10 text-xs "
                        type="text"
                        placeholder="Email / Username"
                        required
                      />
                    </Form.Control>
                    <div className="flex items-baseline justify-between">
                      <Form.Message
                        className="text-rose-500/90 text-xs p-1.5 "
                        match="valueMissing"
                      >
                        Invalid Username
                      </Form.Message>
                    </div>
                  </div>
                </Form.Field>

                <Form.Field className="grid" name="password">
                  <div className="relative">
                    <span className="px-2  text-primaryGray border-r-2 absolute top-2.5 text-pgray">
                      <Lock size={16} />
                    </span>
                    <Form.Control asChild>
                      <Input
                        value={password}
                        onChange={(event) => setPassword(event.target.value)}
                        className="xl:w-[300px] pl-10 text-xs "
                        type={`${passwordText == false ? "text" : "password"}`}
                        placeholder="Password"
                        required
                      />
                    </Form.Control>
                    <div className="flex items-baseline justify-between">
                      <Form.Message
                        className="text-rose-500/90 text-xs p-1.5 "
                        match="valueMissing"
                      >
                        Invalid Password
                      </Form.Message>
                    </div>
                    <button
                      type="button"
                      onClick={handleShowPasword}
                      className="px-2 text-xs cursor-pointer text-pgray hover:text-primary/90  absolute top-2.5 right-0 "
                    >
                      {passwordText === false ? "Hide" : "Show"}
                    </button>
                  </div>
                </Form.Field>

                <div className="flex items-end justify-end">
                  <button
                    onClick={() => setOpen(!open)}
                    type="button"
                    className="text-xs text-pgray hover:text-primary/90 cursor-pointer"
                  >
                    Forgot your password?
                  </button>
                </div>
                <Form.Submit asChild>
                  {tanLogin.isPending ? (
                    <Button disabled>
                      <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
                      Loading
                    </Button>
                  ) : (
                    <Button>Login</Button>
                  )}
                </Form.Submit>

                {connectionmsg && (
                  <>
                    <div className="text-xs flex items-center justify-center text-rose-500">
                      <h1 className="text-xs ">{connectionmsg}</h1>
                    </div>
                  </>
                )}

                {errorMessage && (
                  <>
                    <div className="flex items-center justify-center gap-2  text-rose-500 ">
                      <h1 className="text-xs text-center pb-0.5">
                        {errorMessage}
                      </h1>
                      <TicketX size={16} className="" />
                    </div>
                  </>
                )}
              </div>
            </Form.Root>
          </div>
        </div>
      </div>
      {/* {open && (
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>One-Time Password</DialogTitle>
              <DialogDescription className="text-xs py-4">
                Please enter the one-time password sent to your phone.
              </DialogDescription>
            </DialogHeader>

            <div className="flex items-center justify-center ">
              <Form.Root onSubmit={handleSubmitOTP}>
                <Form.Field
                  name="otp"
                  className="flex items-center flex-col gap-4"
                >
                  <Form.Control asChild>
                    <InputOTP
                      required
                      maxLength={6}
                      value={value}
                      onChange={(value) => setValue(value)}
                    >
                      <InputOTPGroup>
                        <InputOTPSlot index={0} />
                        <InputOTPSlot index={1} />
                        <InputOTPSlot index={2} />
                      </InputOTPGroup>
                      <InputOTPSeparator />
                      <InputOTPGroup>
                        <InputOTPSlot index={3} />
                        <InputOTPSlot index={4} />
                        <InputOTPSlot index={5} />
                      </InputOTPGroup>
                    </InputOTP>
                  </Form.Control>
                  <div className="flex items-center justify-center">
                    <Form.Message
                      className="text-rose-500/90 text-xs p-1.5 "
                      match="valueMissing"
                    >
                      OTP should be exactly 6 digits
                    </Form.Message>
                  </div>
                </Form.Field>
                <div className="flex items-center justify-center py-4">
                  <Button type="submit">Submit</Button>
                </div>
              </Form.Root>
            </div>
          </DialogContent>
        </Dialog>
      )} */}
    </>
  );
}
