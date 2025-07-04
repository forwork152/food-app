import { ResturentTypes } from "@/types/RestaurentTypes";
import axios from "axios";
import { toast } from "sonner";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { gql } from "@apollo/client";
import client from "@/lib/apolloClient";

const API_URL = import.meta.env.VITE_BACKEND_URL;
const API_ENDPOINT = `${API_URL}/api/v1/resturent`;
axios.defaults.withCredentials = true;

// Graph Ql integration

export const GET_RESTAURANT = gql`
  query GetRestaurant($id: ID!) {
    getRestaurant(id: $id) {
      resturentName
      user
      deliveryTime
      imageFile
      cusines
      menu {
        _id
        name
        description
        price
        image
      }
    }
  }
`;

const useResturent = create<ResturentTypes>()(
  persist(
    (set) => ({
      loading: false,
      resturent: null,
      singleResturent: null,
      permit: false,
      // Create Restaurant
      createResturents: async (formdata: FormData) => {
        try {
          set({ loading: true });
          const res = await axios.post(
            `${API_ENDPOINT}/create-resturent`,
            formdata,
            {
              headers: { "Content-Type": "multipart/form-data" },
            }
          );
          if (res.data.success) {
            toast.success(res.data.message);
          }
        } catch (error: any) {
          toast.error(
            error.response?.data?.message || "Error creating restaurant"
          );
        } finally {
          set({ loading: false });
        }
      },

      handlePermit: () => {
        set({ permit: false });
      },

      reset: () => {
        set({
          loading: false,
          resturent: null,
        });
      },
      // Get Restaurant
      getResturent: async () => {
        try {
          set({ loading: true });
          const res = await axios.get(`${API_ENDPOINT}/get-resturent`);
          if (res.data.success && res.data.resturent) {
            set({ resturent: res.data.resturent });
          } else {
            set({ resturent: null });
          }
        } catch (error: any) {
          set({ resturent: null });
          toast.error(
            error.response?.data?.message || "Error fetching restaurant"
          );
        } finally {
          set({ loading: false });
        }
      },

      // Update Restaurant
      updateResturent: async (formdata: FormData) => {
        try {
          set({ loading: true });
          const res = await axios.put(
            `${API_ENDPOINT}/update-resturent`,
            formdata,
            {
              headers: { "Content-Type": "multipart/form-data" },
            }
          );
          if (res.data.success) {
            toast.success(res.data.message);
          }
        } catch (error: any) {
          toast.error(
            error.response?.data?.message || "Error updating restaurant"
          );
        } finally {
          set({ loading: false });
        }
      },

      GetRestaurant: async (id: string) => {
        try {
          set({ loading: true });
          const { data } = await client.query({
            query: GET_RESTAURANT,
            variables: { id },
            fetchPolicy: "no-cache",
          });
          set({ singleResturent: data.getRestaurant });
        } catch (error: any) {
          console.error("Error fetching restaurant:", error.message);
          set({ singleResturent: null });
        } finally {
          set({ loading: false });
        }
      },

      

      // Menus Related

      addMenuResturent: async (menu: any) => {
        set((state: any) => ({
          resturent: state.resturent
            ? { ...state.resturent, menu: [...state.resturent.menu, menu] }
            : { menu: [menu] }, // Initialize if resturent is null
        }));
      },
      updatedMenuResturent: async (updateMenu: any) => {
        try {
          set((state: any) => {
            if (state.resturent) {
              const update = state.resturent.menu.map((menu: any) =>
                menu._id === updateMenu._id ? updateMenu : menu
              );
              return {
                resturent: {
                  ...state.resturent,
                  menu: update,
                },
              };
            }
            // Always return a valid object even if state.resturent is falsy
            return state;
          });
        } catch (error: any) {
          toast.error(error.message || "Error updating menu");
        }
      },
      deleteMenuResturent: async (menuId: string) => {
        set((state: any) => ({
          resturent: state.resturent
            ? {
                ...state.resturent,
                menu: state.resturent.menu.filter(
                  (menu: any) => menu._id !== menuId // Ensure you are using the correct identifier
                ),
              }
            : null,
        }));
      },
    }),
    {
      name: "resturent",
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export default useResturent;
