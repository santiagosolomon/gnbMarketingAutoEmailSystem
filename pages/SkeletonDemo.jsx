import React from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { TableBody, TableCell, TableRow } from "@/components/ui/table";

const SkeletonDemo = ({ cards }) => {
  return Array(cards)
    .fill(0)
    .map((item, index) => {
      return (
        <TableBody key={index}>
          <TableRow className="text-xs">
            <TableCell>
              <Skeleton className="h-7 " />
            </TableCell>
            <TableCell>
              <Skeleton className="h-7 " />
            </TableCell>
            <TableCell>
              <Skeleton className="h-7 " />
            </TableCell>
            <TableCell>
              <Skeleton className="h-7 " />
            </TableCell>
            <TableCell>
              <Skeleton className="h-7 py-4 " />
            </TableCell>
            <TableCell>
              <Skeleton className="h-7  " />
            </TableCell>
          </TableRow>
        </TableBody>
      );
    });
};

export default SkeletonDemo;
