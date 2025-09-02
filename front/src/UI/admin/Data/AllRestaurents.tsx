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
import { Link, useParams } from "react-router-dom";
import { FaEdit } from "react-icons/fa";
import DeleteButton from "./DeleteButton";

export default function RestaurantTable() {
  const params = useParams();
  // const navigate = useNavigate();

  const { singleResturent, getSingleRestaurent, deleteResturent, loading } =
    useResturent();
  useEffect(() => {
    const paramsId = params.id!;
    getSingleRestaurent(paramsId);
  }, [getSingleRestaurent, params.id]);

  if (loading) {
    return (
      <div className="flex min-h-[200px] items-center justify-center">
        <p className="text-lg font-semibold">Loading Restaurant...</p>
      </div>
    );
  }

  // delete resturent

  if (!singleResturent) {
    return (
      <div className="flex flex-col min-h-[200px] items-center justify-center gap-4">
        <p className="text-lg text-gray-500">No restaurant found</p>
        <Link to="/admin/add-resturents">
          <button className="bg-gradient-to-r from-[#FF2B85] to-[#FF6CAB] text-white font-semibold py-2 px-6 rounded-2xl shadow-md hover:scale-105 transition-transform">
            ➕ Add Restaurant
          </button>
        </Link>
      </div>
    );
  }

  return (
    <div className="p-6 bg-white dark:bg-gray-900 rounded-2xl shadow-md">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="text-gray-700 dark:text-gray-200">
              Image
            </TableHead>
            <TableHead className="text-gray-700 dark:text-gray-200">
              ID
            </TableHead>
            <TableHead className="text-gray-700 dark:text-gray-200">
              Name
            </TableHead>
            <TableHead className="text-gray-700 dark:text-gray-200">
              City
            </TableHead>
            <TableHead className="text-gray-700 dark:text-gray-200">
              Country
            </TableHead>
            <TableHead className="text-gray-700 dark:text-gray-200">
              Delivery Time
            </TableHead>
            <TableHead className="text-gray-700 dark:text-gray-200">
              Delivery Price
            </TableHead>
            <TableHead className="text-gray-700 dark:text-gray-200">
              Cuisines
            </TableHead>
            <TableHead className="text-gray-700 dark:text-gray-200">
              Action
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow className="hover:bg-gray-100 dark:hover:bg-gray-800">
            <TableCell>
              <img
                src={singleResturent?.imageFile || ""}
                alt={singleResturent?.resturentName}
                className="rounded-2xl w-16 h-16 object-cover"
              />
            </TableCell>
            <TableCell className="text-gray-800 dark:text-gray-100">
              {singleResturent?.id}
            </TableCell>
            <TableCell className="text-gray-800 dark:text-gray-100">
              {singleResturent?.resturentName}
            </TableCell>
            <TableCell className="text-gray-800 dark:text-gray-100">
              {singleResturent?.city}
            </TableCell>
            <TableCell className="text-gray-800 dark:text-gray-100">
              {singleResturent?.country}
            </TableCell>
            <TableCell className="text-gray-800 dark:text-gray-100">
              {singleResturent?.deliveryTime} min
            </TableCell>
            <TableCell className="text-gray-800 dark:text-gray-100">
              ${singleResturent?.deliveryPrice}
            </TableCell>
            <TableCell className="text-gray-800 dark:text-gray-100">
              {singleResturent?.cusines.join(", ")}
            </TableCell>
            <TableCell className="text-gray-800 dark:text-gray-100 flex justify-start gap-3 items-center mt-3">
              <Link to={"/admin/add-resturents"}>
                <button className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded">
                  <FaEdit />
                </button>
              </Link>
              <DeleteButton
                deleteResturent={deleteResturent}
                id={singleResturent?._id}
              />
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
}
