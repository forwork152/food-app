"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Resolver = void 0;
// resolvers/restaurantResolvers.ts
const ResturentSchema_1 = __importDefault(require("../../models/ResturentSchema"));
exports.Resolver = {
    Query: {
        getRestaurant(_1, _a) {
            return __awaiter(this, arguments, void 0, function* (_, { id }) {
                const restaurant = yield ResturentSchema_1.default.findById(id).populate("menu");
                if (!restaurant)
                    throw new Error("Restaurant not found");
                return restaurant;
            });
        },
        getRestaurantMenus(_1, _a) {
            return __awaiter(this, arguments, void 0, function* (_, { id }) {
                const restaurant = yield ResturentSchema_1.default.findById(id).populate("menu");
                if (!restaurant)
                    throw new Error("Restaurant not found");
                return restaurant.menu;
            });
        },
    },
};
//# sourceMappingURL=Resolvers.js.map