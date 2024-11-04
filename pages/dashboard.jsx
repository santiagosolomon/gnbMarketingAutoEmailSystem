import React from "react";
import { useStore } from "@/store/store";
import { useQuery } from "@tanstack/react-query";
import { globalAPI } from "./function/globalFunctions";

export const dashboard = () => {
  const { isPending, error, data } = useQuery({
    queryKey: ["repoData"],
    queryFn: () =>
    globalAPI().get(`Login/users`).then((res)=> {
      return res.data
    }),
  });

   if (isPending) return "Loading...";

   if (error) return "An error has occurred: " + error.message;

  return (
    <div className=" p-4">
      <h1>{data[0].firstname} {data[0].middlename} {data[0].lastname}</h1>
    </div>
  );
};

export default dashboard;
