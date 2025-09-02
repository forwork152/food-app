"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginValidator = exports.registerValidator = void 0;
const express_validator_1 = require("express-validator");
exports.registerValidator = [
    (0, express_validator_1.body)("fullname")
        .trim()
        .notEmpty()
        .withMessage("Full name is required")
        .isLength({ min: 3 })
        .withMessage("Full name must be at least 3 characters long"),
    (0, express_validator_1.body)("email").isEmail().withMessage("Invalid email format"),
    (0, express_validator_1.body)("password")
        .isLength({ min: 4 })
        .withMessage("Password must be at least 4 characters long")
        .withMessage("please Type correct Password"),
    (0, express_validator_1.body)("phone")
        .trim()
        .notEmpty()
        .withMessage("Phone number is required")
        .withMessage("Invalid phone number format"),
];
exports.loginValidator = [
    (0, express_validator_1.body)("email").isEmail().withMessage("Invalid email format"),
    (0, express_validator_1.body)("password").notEmpty().withMessage("Password is required"),
];
//# sourceMappingURL=AuthValidators.js.map