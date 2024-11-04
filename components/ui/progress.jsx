import * as React from "react";
import * as ProgressPrimitive from "@radix-ui/react-progress";
 
import { cn } from "@/lib/utils";
 
const Progress = React.forwardRef(({ className, value, indicatorColor, ...props }, ref) => (
  React.createElement(ProgressPrimitive.Root, {
    ref: ref,
    className: cn(
      "relative h-4 w-full overflow-hidden rounded-full bg-secondary",
      className
    ),
    ...props
  },
    React.createElement(ProgressPrimitive.Indicator, {
      className: `h-full w-full flex-1  transition-all ${indicatorColor}`,
      style: { transform: `translateX(-${100 - (value || 0)}%)` }
    })
  )
));
Progress.displayName = ProgressPrimitive.Root.displayName;
 
export { Progress };