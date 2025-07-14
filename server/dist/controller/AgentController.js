"use strict";
// // controllers/AgentController.ts
// import { Request, Response } from "express";
// import { Groq } from "groq-sdk";
// import ResturentModel from "../models/ResturentSchema";
// import OrderModel from "../models/OrderSchema";
// import dotenv from "dotenv";
// import mongoose from "mongoose";
// import { MenuItem } from "../types/AgentTypes";
// import { MenuDocs } from "../types/MenuTypes";
// dotenv.config();
// const groq = new Groq({
//   apiKey: process.env.GROQ_API_KEY,
// });
// // Enhanced normalization with fallbacks
// const normalizeName = (name: any): string => {
//   if (!name) return "";
//   return String(name)
//     .toLowerCase()
//     .replace(/[^a-z0-9\s]/g, "") // Keep spaces
//     .replace(/\s+/g, " ") // Collapse multiple spaces
//     .trim();
// };
// export const processAgentOrder = async (
//   req: Request,
//   res: Response
// ): Promise<any> => {
//   const { message, userId, restaurantId } = req.body;
//   // Enhanced input validation
//   if (
//     !userId ||
//     !restaurantId ||
//     !message ||
//     !mongoose.Types.ObjectId.isValid(userId) ||
//     !mongoose.Types.ObjectId.isValid(restaurantId)
//   ) {
//     return res.status(400).json({
//       success: false,
//       message: "Invalid or missing required fields",
//     });
//   }
//   try {
//     // 1. Get restaurant with menu populated
//     const restaurant = await ResturentModel.findById(restaurantId)
//       .select("menu resturentName")
//       .lean()
//       .exec();
//     if (!restaurant) {
//       return res.status(404).json({
//         success: false,
//         message: "Restaurant not found",
//       });
//     }
//     // Verify menu structure
//     console.log("Restaurant Menu Structure:", restaurant.menu);
//     console.log("First Menu Item:", restaurant.menu[0]);
//     // Log menu for debugging
//     // 2. Prepare menu context
//     const menuItems = restaurant.menu
//       .map((item: MenuItem | any) => `${item.name} (₹${item.price})`)
//       .join("\n");
//     // Debug output
//     console.log("Menu Items String:", menuItems);
//     // 3. Prepare system prompt
//     const systemPrompt = `
//     You are an AI waiter for ${restaurant.resturentName}. 
//     The restaurant menu contains:
//     ${menuItems}
//     Extract order details in STRICT JSON format:
//     {
//       "items": [
//         {"name": "Exact Item name or match the ${message}", "quantity": according to ${message}},
//       ],
//       "special_instructions": "Any special requests"
//     }
//     Rules:
//     1. Use EXACT item names from the menu
//     2. If item not found, omit it
//     3. If no valid items, return {items: []}`;
//     // 4. Call Groq API
//     const chatCompletion = await groq.chat.completions.create({
//       messages: [
//         { role: "system", content: systemPrompt },
//         { role: "user", content: message },
//       ],
//       model: "llama3-70b-8192",
//       response_format: { type: "json_object" },
//       temperature: 0.3,
//       max_tokens: 500,
//     });
//     // 5. Parse JSON response
//     const responseContent = chatCompletion.choices[0]?.message?.content || "";
//     console.log("Raw AI Response:", responseContent);
//     let orderData;
//     try {
//       orderData = JSON.parse(responseContent);
//     } catch (e) {
//       return res.status(400).json({
//         success: false,
//         message: "AI returned invalid JSON format",
//         rawResponse: responseContent,
//       });
//     }
//     // After getting Groq response
//     console.log("Raw Groq Response:", responseContent);
//     console.log("Parsed Order Data:", orderData);
//     // 6. Validate items against menu
//     const cartItems: any[] = [];
//     for (const item of orderData.items || []) {
//       console.log(`- Looking for: ${item.name}`);
//       const normalizedInput = normalizeName(item.name);
//       restaurant.menu.forEach((menuItem: MenuItem | any) => {
//         const normalizedMenu = normalizeName(menuItem.name);
//         const isMatch =
//           normalizedMenu.includes(normalizedInput) ||
//           normalizedInput.includes(normalizedMenu);
//         console.log(
//           `  Comparing: '${normalizedInput}' vs '${normalizedMenu}' → ${isMatch}`
//         );
//       });
//     }
//     // 7. Handle no items found
//     if (cartItems.length === 0) {
//       return res.status(400).json({
//         success: false,
//         message: "No valid menu items found in your request",
//         // Filter out nulls and undefined
//         suggestedItems: Array.isArray(restaurant.menu)
//           ? restaurant.menu
//               .slice(0, 5)
//               .map((i: any) => i?.name)
//               .filter(Boolean)
//           : [],
//       });
//     }
//     // 8. Calculate total price
//     const totalPrice = cartItems.reduce(
//       (total, item) => total + item.price * item.quantity,
//       0
//     );
//     // 9. Create order
//     const newOrder = await OrderModel.create({
//       user: userId,
//       resturent: restaurantId,
//       cartItems,
//       totalPrice,
//       status: "pending",
//       source: "AI Agent",
//       special_instructions: orderData.special_instructions || "",
//     });
//     res.status(201).json({
//       success: true,
//       message: "Order placed via AI agent!",
//       order: newOrder,
//       agentResponse: responseContent,
//     });
//     console.log("order response", newOrder);
//   } catch (error: any) {
//     console.error("Agent order error:", error);
//     res.status(500).json({
//       success: false,
//       message: error.message || "Failed to process AI order",
//       errorDetails: error.response?.data || {},
//     });
//   }
// };
//# sourceMappingURL=AgentController.js.map