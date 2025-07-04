"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.typeDefs = void 0;
const apollo_server_express_1 = require("apollo-server-express");
exports.typeDefs = (0, apollo_server_express_1.gql) `
  scalar Date

  type Menu {
    _id: ID!
    name: String!
    description: String!
    price: Float!
    image: String!
    createdAt: Date
    updatedAt: Date
  }

  type Restaurant {
    _id: ID!
    user: ID!
    resturentName: String!
    city: String!
    country: String!
    deliveryTime: Int!
    deliveryPrice: Float!
    imageFile: String!
    cusines: [String!]!
    menu: [Menu!]!
    createdAt: Date
    updatedAt: Date
  }

  type CartDetails {
    menuId: ID!
    name: String!
    image: String!
    price: Float!
    quantity: Int!
  }

  type Order {
    _id: ID!
    user: ID!
    resturent: ID!
    cartItems: CartDetails!
    totalPrice: Float!
    status: String!
    createdAt: Date
    updatedAt: Date
  }

  type Query {
    getRestaurant(id: ID!): Restaurant
    getRestaurantMenus(id: ID!): [Menu]
    getAllRestaurants: [Restaurant]
    getMenu(id: ID!): Menu
    getAllMenus: [Menu]
  }
`;
//# sourceMappingURL=typeDefs.js.map