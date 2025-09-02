import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { MdDelete } from "react-icons/md";

type DeleteButtonProps = {
  id: string;
  deleteResturent: (id: string) => void;
};

export default function DeleteButton({
  id,
  deleteResturent,
}: DeleteButtonProps) {
  const handleDelete = () => {
    toast.custom((t) => (
      <div className="p-4 rounded-xl bg-white shadow-lg border text-sm">
        <p className="mb-3 font-medium">
          Are you sure you want to delete this restaurant?
        </p>
        <div className="flex gap-2 justify-end">
          <Button
            size="sm"
            variant="destructive"
            onClick={() => {
              deleteResturent(id);
              toast.dismiss(t); // close confirm toast
            }}>
            Yes, Delete
          </Button>
          <Button size="sm" variant="outline" onClick={() => toast.dismiss(t)}>
            Cancel
          </Button>
        </div>
      </div>
    ));
  };

  return (
    <button
      className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded"
      onClick={handleDelete}>
      <MdDelete />
    </button>
  );
}
