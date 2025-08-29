// app/components/SingleRestaurantTable.tsx

"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import useResturent from "@/store/UseResturent";
import { useEffect } from "react";
import { useParams } from "react-router-dom";

export default function RestaurantTable() {
  const params = useParams();
  // const navigate = useNavigate();

  const { singleResturent, getSingleRestaurent, loading } = useResturent();

  useEffect(() => {
    const paramsId = params.id!;
    getSingleRestaurent(paramsId);
  }, [getSingleRestaurent, params.id]);

  console.log("Single Restaurant:", singleResturent);
  console.log("params:", params.id);

  if (loading) {
    return (
      <div className="flex min-h-[200px] items-center justify-center">
        <p className="text-lg font-semibold">Loading Restaurant...</p>
      </div>
    );
  }

  if (!singleResturent) {
    return (
      <div className="flex min-h-[200px] items-center justify-center">
        <p className="text-lg text-gray-500">No restaurant found</p>
      </div>
    );
  }

  return (
    <div className="p-6 bg-white rounded-2xl shadow-md">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Image</TableHead>
            <TableHead>ID</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>City</TableHead>
            <TableHead>Country</TableHead>
            <TableHead>Delivery Time</TableHead>
            <TableHead>Delivery Price</TableHead>
            <TableHead>Cuisines</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell>
              <img
                src={singleResturent?.imageFile || ""}
                alt={singleResturent?.resturentName}
                className="rounded-2xl w-16 h-16 object-cover"
              />
            </TableCell>
            <TableCell>{singleResturent?.id}</TableCell>
            <TableCell>{singleResturent?.resturentName}</TableCell>
            <TableCell>{singleResturent?.city}</TableCell>
            <TableCell>{singleResturent?.country}</TableCell>
            <TableCell>{singleResturent?.deliveryTime} min</TableCell>
            <TableCell>${singleResturent?.deliveryPrice}</TableCell>
            <TableCell>{singleResturent?.cusines.join(", ")}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
}
