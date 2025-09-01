"use client";

import type React from "react";

import { useState } from "react";
import {
  Loader2,
  Plus,
  Edit,
  Trash2,
  DollarSign,
  ChefHat,
  Clock,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import EditMenu from "./EditMenu";
import { MenuSchema, type MenuTypes } from "@/schema/MenuSchema";
import UseMenu from "@/store/UseMenu";
import useResturent from "@/store/UseResturent";
import { toast } from "sonner";

const AddMenu = () => {
  const { createMenu, loading, DeleteMenu } = UseMenu();
  const { resturent } = useResturent();
  const [open, setOpen] = useState<boolean>(false);
  const [Editopen, setEditOpen] = useState<boolean>(false);
  const [inpt, setInpt] = useState<MenuTypes>({
    name: "",
    description: "",
    price: 0,
    image: undefined,
  });
  const [Error, setError] = useState<Partial<MenuTypes>>({});
  const [selectMenu, setSelectMenu] = useState<any>();

  const ChangeEventHandler = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;
    setInpt({
      ...inpt,
      [name]: type === "number" ? Number(value) : value,
    });
  };

  // Delete Menu
  const MenuDelete = async (restId: string, menuId: string) => {
    await DeleteMenu(restId, menuId);
  };

  const SubmitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const result = MenuSchema.safeParse(inpt);
    if (!result.success) {
      const error = result.error.formErrors.fieldErrors;
      setError(error as Partial<MenuTypes>);
      return;
    }
    // Call api
    try {
      const formData = new FormData();
      formData.append("name", inpt.name);
      formData.append("description", inpt.description);
      formData.append("price", String(inpt.price));

      if (inpt.image) {
        formData.append("image", inpt.image);
      }
      await createMenu(formData);
      setInpt({ name: "", description: "", price: 0, image: undefined });
      setOpen(false);
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-rose-50 to-pink-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="container mx-auto p-6 max-w-7xl">
        <div className="bg-gradient-to-r from-pink-500 to-rose-500 dark:from-pink-600 dark:to-rose-600 rounded-2xl p-8 mb-8 text-white shadow-xl">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold mb-2">Menu Management</h1>
              <p className="text-pink-100">
                Manage your restaurant's delicious offerings
              </p>
            </div>
            <Button
              onClick={() => setOpen(true)}
              className="bg-white text-pink-600 hover:bg-pink-50 dark:bg-gray-800 dark:text-pink-400 dark:hover:bg-gray-700 shadow-lg transition-all duration-300 hover:scale-105">
              <Plus className="w-4 h-4 mr-2" />
              Add New Menu
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white/20 dark:bg-black/20 backdrop-blur-sm rounded-xl p-4">
              <div className="flex items-center gap-3">
                <ChefHat className="w-8 h-8 text-pink-100" />
                <div>
                  <p className="text-2xl font-bold">
                    {resturent?.menu?.length || 0}
                  </p>
                  <p className="text-pink-100 text-sm">Total Menu Items</p>
                </div>
              </div>
            </div>
            <div className="bg-white/20 dark:bg-black/20 backdrop-blur-sm rounded-xl p-4">
              <div className="flex items-center gap-3">
                <DollarSign className="w-8 h-8 text-pink-100" />
                <div>
                  <p className="text-2xl font-bold">
                    ₹
                    {resturent?.menu?.reduce(
                      (acc: number, item: any) => acc + item.price,
                      0
                    ) || 0}
                  </p>
                  <p className="text-pink-100 text-sm">Total Value</p>
                </div>
              </div>
            </div>
            <div className="bg-white/20 dark:bg-black/20 backdrop-blur-sm rounded-xl p-4">
              <div className="flex items-center gap-3">
                <Clock className="w-8 h-8 text-pink-100" />
                <div>
                  <p className="text-2xl font-bold">Active</p>
                  <p className="text-pink-100 text-sm">Menu Status</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {resturent?.menu?.map((item: any) => (
            <Card
              key={item._id}
              className="group overflow-hidden border-0 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 bg-white dark:bg-gray-800">
              <CardContent className="p-0">
                <div className="relative overflow-hidden">
                  <img
                    src={item.image || "/placeholder.svg"}
                    alt={item.name}
                    className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="absolute top-4 right-4">
                    <div className="bg-pink-500 text-white px-3 py-1 rounded-full text-sm font-semibold shadow-lg">
                      ₹{item.price}
                    </div>
                  </div>
                </div>

                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-800 dark:text-gray-200 mb-2 group-hover:text-pink-600 dark:group-hover:text-pink-400 transition-colors">
                    {item.name}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 line-clamp-2">
                    {item.description}
                  </p>

                  <div className="flex items-center gap-2">
                    <Button
                      onClick={() => {
                        setSelectMenu(item);
                        setEditOpen(true);
                      }}
                      size="sm"
                      className="flex-1 bg-pink-500 hover:bg-pink-600 text-white transition-all duration-300 hover:scale-105">
                      <Edit className="w-4 h-4 mr-2" />
                      Edit
                    </Button>
                    <Button
                      onClick={() => MenuDelete(resturent._id, item._id)}
                      size="sm"
                      variant="outline"
                      className="flex-1 border-red-200 text-red-600 hover:bg-red-50 hover:border-red-300 transition-all duration-300">
                      <Trash2 className="w-4 h-4 mr-2" />
                      Delete
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <Dialog open={open} onOpenChange={setOpen}>
          <DialogContent className="max-w-2xl max-h-[90vh] p-0 bg-white dark:bg-gray-800 border-0 shadow-2xl">
            <DialogHeader className="px-6 py-4 bg-gradient-to-r from-pink-500 to-rose-500 dark:from-pink-600 dark:to-rose-600 text-white">
              <DialogTitle className="text-xl font-bold">
                Add New Menu Item
              </DialogTitle>
            </DialogHeader>
            <ScrollArea className="max-h-[calc(90vh-80px)] px-6">
              <form className="space-y-6 py-6" onSubmit={SubmitHandler}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="name" className="text-gray-700 dark:text-gray-300 font-medium">
                      Menu Name
                    </Label>
                    <Input
                      name="name"
                      placeholder="Enter delicious menu name"
                      className="border-pink-200 focus:border-pink-400 focus:ring-pink-400 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:focus:border-pink-400"
                      required
                      value={inpt.name}
                      onChange={ChangeEventHandler}
                    />
                    {Error.name && (
                      <p className="text-red-500 text-sm font-medium">
                        {Error.name}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label
                      htmlFor="price"
                      className="text-gray-700 dark:text-gray-300 font-medium">
                      Price (₹)
                    </Label>
                    <Input
                      id="price"
                      name="price"
                      type="number"
                      placeholder="Enter price"
                      className="border-pink-200 focus:border-pink-400 focus:ring-pink-400 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:focus:border-pink-400"
                      required
                      value={inpt.price}
                      onChange={ChangeEventHandler}
                    />
                    {Error.price && (
                      <p className="text-red-500 text-sm font-medium">
                        {Error.price}
                      </p>
                    )}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label
                    htmlFor="description"
                    className="text-gray-700 dark:text-gray-300 font-medium">
                    Description
                  </Label>
                  <Textarea
                    id="description"
                    name="description"
                    placeholder="Describe your delicious menu item..."
                    className="border-pink-200 focus:border-pink-400 focus:ring-pink-400 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:focus:border-pink-400 min-h-[100px] resize-none"
                    required
                    value={inpt.description}
                    onChange={ChangeEventHandler}
                  />
                  {Error.description && (
                    <p className="text-red-500 text-sm font-medium">
                      {Error.description}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="image" className="text-gray-700 dark:text-gray-300 font-medium">
                    Menu Image
                  </Label>
                  <Input
                    name="image"
                    type="file"
                    accept="image/*"
                    className="cursor-pointer border-pink-200 focus:border-pink-400 file:bg-pink-50 file:text-pink-700 file:border-0 file:rounded-md file:px-4 file:py-2 file:mr-4 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:file:bg-gray-600 dark:file:text-gray-200"
                    required
                    onChange={(e) =>
                      setInpt({
                        ...inpt,
                        image: e.target.files?.[0] || undefined,
                      })
                    }
                  />
                </div>

                <div className="pt-4">
                  {loading ? (
                    <Button
                      disabled
                      className="w-full bg-pink-500 hover:bg-pink-600 text-white py-3 text-lg">
                      <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                      Adding Menu Item...
                    </Button>
                  ) : (
                    <Button
                      type="submit"
                      className="w-full bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white py-3 text-lg font-semibold shadow-lg transition-all duration-300 hover:scale-105">
                      Add Menu Item
                    </Button>
                  )}
                </div>
              </form>
            </ScrollArea>
          </DialogContent>
        </Dialog>

        {selectMenu && (
          <EditMenu open={Editopen} setOpen={setEditOpen} menu={selectMenu} />
        )}
      </div>
    </div>
  );
};

export default AddMenu;
