import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";

export default function SidebarToggle({
  collapsed,
  setCollapsed,
}: {
  collapsed: boolean;
  setCollapsed: (val: boolean) => void;
}) {
  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={() => setCollapsed(!collapsed)}
      className="h-14 w-14 p-0 mx-4 rounded-xl bg-gray-100 shadow-md hover:shadow-lg hover:bg-gray-100 transition-all duration-300 flex items-center justify-center">
      <motion.div
        initial={false}
        animate={{ rotate: collapsed ? 0 : 180 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="flex items-center justify-center">
        {collapsed ? (
          <ChevronRight className="h-6 w-6 text-gray-700" />
        ) : (
          <ChevronLeft className="h-6 w-6 text-gray-700" />
        )}
      </motion.div>
    </Button>
  );
}
