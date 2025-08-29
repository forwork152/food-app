import { ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card } from "@/components/ui/card";
import UsersFilter from "./UserFilter";

// const PER_PAGE = 10;

const AllUsers = () => {
  // Mock data - replace with actual API call later
  const mockUsers = [
    {
      id: 1,
      firstName: "John",
      lastName: "Doe",
      email: "john@example.com",
      role: "admin",
      tenant: { name: "Pizza Palace" },
    },
    {
      id: 2,
      firstName: "Jane",
      lastName: "Smith",
      email: "jane@example.com",
      role: "manager",
      tenant: { name: "Burger House" },
    },
    {
      id: 3,
      firstName: "Mike",
      lastName: "Johnson",
      email: "mike@example.com",
      role: "customer",
      tenant: null,
    },
    {
      id: 4,
      firstName: "Sarah",
      lastName: "Wilson",
      email: "sarah@example.com",
      role: "admin",
      tenant: { name: "Taco Bell" },
    },
    {
      id: 5,
      firstName: "Tom",
      lastName: "Brown",
      email: "tom@example.com",
      role: "customer",
      tenant: null,
    },
  ];

  return (
    <div className="space-y-6">
      <nav className="flex items-center space-x-2 text-sm text-gray-500">
        <Link to="/admin" className="hover:text-gray-700">
          Dashboard
        </Link>
        <ChevronRight className="h-4 w-4" />
        <span>Users</span>
      </nav>
      <UsersFilter />
      <Card>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Restaurant</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {mockUsers.map((user: any) => (
              <TableRow key={user.id}>
                <TableCell>{user.id}</TableCell>
                <TableCell>
                  {user.firstName} {user.lastName}
                </TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.role}</TableCell>
                <TableCell>{user.tenant?.name}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
};

export default AllUsers;
