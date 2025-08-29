import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search } from "lucide-react";

type UsersFilterProps = {
  children?: React.ReactNode;
};
const UsersFilter = ({ children }: UsersFilterProps) => {
  return (
    <Card className="p-4">
      <div className="flex justify-between items-center">
        <div className="flex gap-4 flex-1">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input placeholder="Search" className="pl-10 w-64" />
          </div>
          <Select>
            <SelectTrigger className="w-48">
              <SelectValue placeholder="Select role" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="admin">Admin</SelectItem>
              <SelectItem value="customer">Customer</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="flex justify-end">{children}</div>
      </div>
    </Card>
  );
};

export default UsersFilter;
