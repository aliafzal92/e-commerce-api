import express from "express";
import { login, register , logout } from "../controllers/auth.controller.js";
const router = express.Router();

// Define routes for authentication
router.post("/register", register); // Route for user registration
router.post("/login", login); // Route for user login
router.get("/logout", logout); // Route for user logout

export default router; // Export the router for use in other parts of the application


