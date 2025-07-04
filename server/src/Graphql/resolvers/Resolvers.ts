// resolvers/restaurantResolvers.ts
import RestaurantModel from "../../models/ResturentSchema";
import MenuModel from "../../models/MenuSchema";

export const Resolver = {
  Query: {
    async getRestaurant(_: any, { id }: { id: string }) {
      const restaurant = await RestaurantModel.findById(id).populate("menu");
      if (!restaurant) throw new Error("Restaurant not found");
      return restaurant;
    },

    async getRestaurantMenus(_: any, { id }: { id: string }) {
      const restaurant = await RestaurantModel.findById(id).populate("menu");
      if (!restaurant) throw new Error("Restaurant not found");
      return restaurant.menu;
    },
  },
};
