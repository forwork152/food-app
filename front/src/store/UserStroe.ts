import {
  loginInpt,
  signupInpt,
  UserState,
  UpdateProfileInput,
} from "@/types/UserTypes";
import axios, { AxiosError } from "axios";
import { toast } from "sonner";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

const API_URL =
  import.meta.env.VITE_BACKEND_URL ||
  "https://food-delivery-app-production-6026.up.railway.app";

axios.defaults.withCredentials = true;
axios.defaults.headers.common["Content-Type"] = "application/json";
axios.defaults.baseURL = API_URL;

// If you're using tokens in Authorization header:
axios.interceptors.request.use(function (config) {
  const token = localStorage.getItem("token"); // or however you store your token
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

const API_ENDPOINT = `${API_URL}/api/v1/auth`;

export const UserStore = create<UserState>()(
  persist(
    (set) => ({
      isAuthentiacte: false,
      loading: false,
      user: null,
      isAdmin: false,
      isCheckAuth: true,
      allUsers: [],

      //   Methods
      signup: async (input: signupInpt) => {
        try {
          set({ loading: true });

          const response = await axios.post(`${API_ENDPOINT}/regester`, input, {
            headers: {
              "Content-Type": "application/json",
            },
          });

          if (response.data.success) {
            toast.success(response.data.message || "Signup successful!");
            set({
              user: response.data.user, // Set user data
              loading: false,
              isAuthentiacte: true,
              isCheckAuth: false,
            });
            return true;
          } else {
            toast.error(response.data.message || "Signup failed");
            set({ loading: false });
            return false;
          }
        } catch (error: unknown) {
          const err = error as AxiosError<{ message: string }>;
          toast.error(err.response?.data?.message || "An error occurred");
          set({ loading: false });
          return false;
        }
      },

      login: async (input: loginInpt) => {
        try {
          set({ loading: true });
          const response = await axios.post(`${API_ENDPOINT}/login`, input, {
            headers: {
              "Content-Type": "application/json",
            },
            withCredentials: true, // important if using cookies/session
          });

          if (response.data.success) {
            set({
              user: response.data.user,
              isAuthentiacte: true, // 👈 mark user as logged in
              isAdmin: response.data.user?.isAdmin || false, // 👈 update admin flag too
              loading: false,
            });
          }
          return true;
        } catch (error: unknown) {
          const err = error as AxiosError<{ message: string }>;
          set({ loading: false });
          toast.error(err.response?.data?.message || "An error occurred");
          return false; // 👈 make sure you return false on error
        }
      },

      Getusers: async () => {
        try {
          set({ loading: true });
          const response = await axios.get(`${API_ENDPOINT}/all-users`);
          if (response.data.success) {
            set({
              allUsers: response.data.users,
              loading: false,
            });
          }
        } catch (error: unknown) {
          const err = error as AxiosError<{ message: string }>;
          set({ loading: false });
          toast.error(err.response?.data?.message || "An error occurred");
        }
      },

      verifyOtp: async (verificationCode: string) => {
        try {
          set({ loading: true });
          const response = await axios.post(
            `${API_ENDPOINT}/verify-email`,
            { verificationCode },
            {
              headers: {
                "Content-Type": "application/json",
              },
            }
          );
          if (response.data.success) {
            toast.success(response.data.message);
            set({
              isAuthentiacte: true,
              loading: false,
              user: response.data.user,
            });
          }
        } catch (error: unknown) {
          const err = error as AxiosError<{ message: string }>;
          set({ loading: false });
          toast.error(err.response?.data?.message || "An error occurred");
          toast.error(err.message);
        }
      },
      CheckingAuth: async () => {
        try {
          set({ isCheckAuth: true }); // Start checking
          const response = await axios.get(`${API_ENDPOINT}/check-auth`);

          if (response.data.success) {
            set({
              isAuthentiacte: true,
              user: response.data.user,
              isCheckAuth: false, // Auth check complete
            });
          }
        } catch (error: unknown) {
          const err = error as AxiosError<{ message: string }>;
          console.log(err);

          set({ isCheckAuth: false, isAuthentiacte: false });
        }
      },

      logout: async () => {
        try {
          const response = await axios.post(`${API_ENDPOINT}/logout`);

          if (response.data.success) {
            // Clear authentication token (e.g., from localStorage or cookies)
            localStorage.removeItem("token");

            // Update state to reflect logout
            set({
              isAuthentiacte: false,
              user: null,
              isAdmin: false,
            });

            // Show success message
            toast.success("Logout Successfully");
          }
        } catch (error: unknown) {
          const err = error as AxiosError<{ message: string }>;
          toast.error(err.response?.data?.message || "An error occurred");
          toast.error(err.message);
        }
      },

      forgetPassword: async (
        email: string,
        fullname: string,
        password: string
      ) => {
        try {
          set({ loading: true });
          const res = await axios.post(`${API_ENDPOINT}/forgot-password`, {
            email,
            fullname,
            newPassword: password,
          });
          if (res.data.success) {
            toast.success(res.data.message);
            set({ loading: false });
          }
        } catch (error: unknown) {
          const err = error as AxiosError<{ message: string }>;
          toast.error(err.response?.data?.message || "An error occurred");
          toast.error(err.message);
          set({ loading: false });
        }
      },

      updateProfile: async (input: UpdateProfileInput) => {
        try {
          const response = await axios.put(
            `${API_ENDPOINT}/profile/update`,
            { ...input, timestamp: new Date().toISOString() },
            {
              headers: {
                "Content-Type": "application/json",
              },
            }
          );
          if (response.data.success) {
            toast.success(response.data.message);
            set({ user: response.data.user, isAuthentiacte: true });
          }
        } catch (error: unknown) {
          const err = error as AxiosError<{ message: string }>;
          toast.error(err.response?.data?.message || "An error occurred");
        }
      },

      // admin

      CaptainSignupApi: async (input: signupInpt) => {
        try {
          set({ loading: true });
          const response = await axios.post(
            `${API_ENDPOINT}/captain-regester`,
            input,
            {
              headers: {
                "Content-Type": "application/json",
              },
            }
          );
          if (response.data.success) {
            set({
              user: response.data.captain,
              loading: false,
              isAuthentiacte: true,
              isAdmin: true,
              isCheckAuth: false,
            });
          }
          return true;
        } catch (error: unknown) {
          const err = error as AxiosError<{ message: string }>;
          set({ loading: false });
          toast.error(err.response?.data?.message || "An error occurred");
          throw err;
        }
      },
      CaptainLoginApi: async (input: loginInpt) => {
        try {
          set({ loading: true });
          const response = await axios.post(
            `${API_ENDPOINT}/captain-login`,
            input,
            {
              headers: { "Content-Type": "application/json" },
            }
          );

          if (response.data.success) {
            set({
              user: response.data.captain,
              loading: false,
              isAdmin: true,
              isAuthentiacte: true,
              isCheckAuth: false,
            });
            return response.data.captain;
          }

          return null;
        } catch (error: unknown) {
          const err = error as AxiosError<{ message: string }>;
          set({ loading: false });
          toast.error(err.response?.data?.message || "An error occurred");
          throw err;
        }
      },
    }),
    {
      name: "user-store",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
