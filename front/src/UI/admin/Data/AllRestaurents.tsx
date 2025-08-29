"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface Restaurant {
  id: number;
  resturentName: string;
  city: string;
  country: string;
  deliveryTime: number;
  deliveryPrice: number;
  cusines: string[];
  image: string;
}

const mockRestaurants: Restaurant[] = [
  {
    id: 1,
    resturentName: "La Bella Italia",
    city: "Rome",
    country: "Italy",
    deliveryTime: 30,
    deliveryPrice: 200,
    cusines: ["Italian"],
    image:
      "https://images.unsplash.com/photo-1600891964599-f61ba0e24092?w=600&q=80",
  },
  {
    id: 2,
    resturentName: "Dragon Palace",
    city: "Beijing",
    country: "China",
    deliveryTime: 40,
    deliveryPrice: 150,
    cusines: ["Chinese"],
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTzmnuNE7Vg8_evlj5T85CKWArPluVly20wLw&s",
  },
  {
    id: 3,
    resturentName: "Spice Hub",
    city: "Delhi",
    country: "India",
    deliveryTime: 35,
    deliveryPrice: 120,
    cusines: ["Indian"],
    image:
      "https://hips.hearstapps.com/hmg-prod/images/dsc01939-1638289406.jpg",
  },
];

export default function RestaurantTable() {
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
          {mockRestaurants.map((resturent) => (
            <TableRow key={resturent.id}>
              <TableCell>
                <img
                  src={resturent.image}
                  alt={resturent.resturentName}
                  className="rounded-2xl w-16 h-16 object-cover"
                />
              </TableCell>
              <TableCell>{resturent.id}</TableCell>
              <TableCell>{resturent.resturentName}</TableCell>
              <TableCell>{resturent.city}</TableCell>
              <TableCell>{resturent.country}</TableCell>
              <TableCell>{resturent.deliveryTime} min</TableCell>
              <TableCell>${resturent.deliveryPrice}</TableCell>
              <TableCell>{resturent.cusines.join(", ")}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
