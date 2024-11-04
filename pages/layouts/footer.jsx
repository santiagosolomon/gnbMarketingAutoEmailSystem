import React from "react";

export const footer = () => {
  let date = new Date();
  let currentYear = date.getFullYear();

  return (
    <>
      <div className="p-4 text-xs mx-4 bg-white rounded-md shadow-sm dark:bg-slate-950 ">
        <p className="text-xs ">{`© ${currentYear} Group NB. All Rights Reserved.`}</p>
      </div>
    </>
  );
};
export default footer;
