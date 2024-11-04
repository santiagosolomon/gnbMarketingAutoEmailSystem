import { signal, useSignal } from "@preact-signals/safe-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import * as Form from "@radix-ui/react-form";
import * as icons from "lucide-react";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { clientData } from "@/pages/emailing";
import { rToast } from "@/pages/function/globalFunctions";
import { DialogClose } from "@radix-ui/react-dialog";
import { useEffect, useState } from "react";


export function AddClientDialog({ isAdd, clientDetails, index, isDelete }) {
  const name = useSignal(isAdd ? "" : clientDetails.name);
  const company = useSignal(isAdd ? "" : clientDetails.company);
  const email = useSignal(isAdd ? "" : clientDetails.email);
  const isSuccessData = useSignal(false);
  const [open, setOpen] = useState(false);

  // console.log(clientDetails);

  function handleSubmit(e) {
    try {
      e.preventDefault();
      if (isAdd) {
        if (
          clientData.value.filter(
            (x) => x.uId == `${name.value}${company.value}${email.value}`
          ).length > 0
        ) {
          document.getElementById("name").focus();
          rToast("Existing", "Data already exist!", "warning");
        } else {
          clientData.value = [
            ...clientData.value,
            {
              name: name.value,
              company: company.value,
              email: email.value,
              uId: `${name.value}${company.value}${email.value}`,
            },
          ];
          name.value = "";
          company.value = "";
          email.value = "";
          document.getElementById("name").focus();
          rToast("Success", "Data Added", "success");
        }
      } else if (isDelete) {
        clientData.value = clientData.value.filter((_, x) => x !== index);
        setOpen(false);
        rToast("Success", "Data Deleted ", "success");
      } else {
        rToast("Success", "Edited Successfully", "success");
        const newValue = clientData.value.map((item, i) => {
          if (i === index) {
            return {
              ...item,
              name: name.value,
              company: company.value,
              email: email.value,
            };
          } else {
            return item;
          }
        });

        clientData.value = newValue;

        setOpen(false);
      }
    } catch (err) {
    } finally {
      isSuccessData.value = false;
    }
  }

  function clearData() {
    if (!isAdd) {
      name.value = clientData.value[index].name;
      company.value = clientData.value[index].company;
      email.value = clientData.value[index].email;
    }
  }

  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button
            onClick={() => clearData()}
            variant="outline"
            className={`${
              isAdd
                ? "p-3.5 shadow-none h-0 bg-blue-500 hover:bg-blue-600/50"
                : isDelete
                ? "py-3.5 px-2.5 shadow-none h-0 bg-rose-500 hover:bg-rose-600/50"
                : "py-3.5 px-2.5 shadow-none h-0 bg-blue-500 hover:bg-blue-600/50"
            }`}
          >
            {isAdd ? (
              <div className="flex items-center gap-1.5">
                <icons.UserRoundPlus className="text-white " size={15} />
                <h1 className="text-white text-xs">Add</h1>
              </div>
            ) : isDelete ? (
              <icons.Trash2Icon className="text-white" size={15} />
            ) : (
              <icons.Pencil className="text-white" size={15} />
            )}
          </Button>
        </DialogTrigger>
        <DialogContent>
          {isDelete === "isDeleted" ? (
            <DialogHeader>
              <DialogTitle> Remove Client </DialogTitle>
            </DialogHeader>
          ) : (
            <DialogHeader>
              <DialogTitle> {isAdd ? "Add Client" : "Edit Client"}</DialogTitle>
            </DialogHeader>
          )}
          <Form.Root onSubmit={handleSubmit} className="FormRoot">
            {isDelete === "isDeleted" ? (
              <div className="py-4">
                <h1>
                  Are you sure you want to delete this user?{" "}
                  <span className="text-rose-600 font-semibold">
                    {clientDetails.name}
                  </span>
                </h1>
                <h1 className=""></h1>
              </div>
            ) : (
              <div className="grid gap-4 py-4">
                <Form.Field>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="name" className="text-right">
                      Name
                    </Label>
                    <Form.Control asChild>
                      <Input
                        id="name"
                        value={name.value}
                        onChange={(e) => {
                          name.value = e.target.value;
                        }}
                        className="col-span-3"
                        required
                      />
                    </Form.Control>
                  </div>
                  <div className="flex justify-end items-end ">
                    <Form.Message
                      className="text-rose-500/90 text-xs p-1.5 "
                      match="valueMissing"
                    >
                      Invalid Name
                    </Form.Message>
                  </div>
                </Form.Field>
                <Form.Field>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="company" className="text-right">
                      Company
                    </Label>
                    <Form.Control asChild>
                      <Input
                        id="company"
                        value={company.value}
                        onChange={(e) => {
                          company.value = e.target.value;
                        }}
                        className="col-span-3"
                        required
                      />
                    </Form.Control>
                  </div>
                  <div className="flex justify-end items-end">
                    <Form.Message
                      className="text-rose-500/90 text-xs p-1.5 "
                      match="valueMissing"
                    >
                      Invalid Company
                    </Form.Message>
                  </div>
                </Form.Field>
                <Form.Field>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="email" className="text-right">
                      Email
                    </Label>
                    <Form.Control asChild>
                      <Input
                        type="email"
                        id="email"
                        value={email.value}
                        onChange={(e) => {
                          email.value = e.target.value;
                        }}
                        className="col-span-3"
                        required
                      />
                    </Form.Control>
                  </div>
                  <div className="flex justify-end items-end">
                    <Form.Message
                      className="text-rose-500/90 text-xs p-1.5 "
                      match="valueMissing"
                    >
                      Invalid Email
                    </Form.Message>
                    <Form.Message
                      className="text-rose-500/90 text-xs p-1.5"
                      match="typeMismatch"
                    >
                      Please provide a valid email
                    </Form.Message>
                  </div>
                </Form.Field>
              </div>
            )}

            <DialogFooter>
              <Form.Submit asChild>
                <Button type="submit">Save changes</Button>
              </Form.Submit>
            </DialogFooter>
          </Form.Root>
        </DialogContent>
      </Dialog>
    </>
  );
}
