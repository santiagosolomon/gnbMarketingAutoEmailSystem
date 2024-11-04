import React, { useState, useEffect } from "react";
import { Progress } from "@/components/ui/progress";
const LoadingDialog = () => {
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    const timer = setTimeout(() => setProgress(66), 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="bg-slate-900/60 inset-0 z-50 text-gray-600 fixed ">
      <div className="flex items-center justify-center  rounded-sm  bg-white absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 max-w-7xl max-h-[450px] md:max-h-[500px] h-full w-11/12 m-auto md:w-[500px]">
        <Progress value={progress} className="w-[60%]" />
      </div>
    </div>
  );
};

export default LoadingDialog;
