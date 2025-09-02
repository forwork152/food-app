import { ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useEffect, useRef } from "react";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card } from "@/components/ui/card";
import { UserStore } from "@/store/UserStroe";
import { User } from "@/types/UserTypes";

// const PER_PAGE = 10;

const AllUsers = () => {
  const { Getusers, allUsers, loading } = UserStore();
  const hasFetched = useRef(false);

  useEffect(() => {
    if (
      !hasFetched.current &&
      !loading &&
      (!allUsers || allUsers.length === 0)
    ) {
      hasFetched.current = true;
      Getusers();
    }
  }, []);

  // Mock data - replace with actual API call later

  return (
    <div className="space-y-6">
      <nav className="flex items-center space-x-2 text-sm text-gray-500">
        <Link to="/admin" className="hover:text-gray-700">
          Dashboard
        </Link>
        <ChevronRight className="h-4 w-4" />
        <span>Users</span>
      </nav>
      {/* <UsersFilter /> */}
      <Card>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Role</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {allUsers?.map((user: User, indx) => (
              <TableRow key={user._id}>
                <TableCell>{indx + 1}</TableCell>
                <TableCell>{user.fullname}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.isAdmin ? "Admin" : "User"}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
};

export default AllUsers;
