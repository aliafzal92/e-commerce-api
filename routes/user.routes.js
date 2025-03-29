import express from "express";

import {
  getAllUsers,
  getSingleUser,
  showCurrentUser,
  updateUser,
  updateUserPassword,
} from "../controllers/user.controller.js";
import {
  authorizePermisission,
  authenticateUser,
} from "../middlewares/authentication.js";

const router = express.Router();

router.get("/", authenticateUser, authorizePermisission("admin"), getAllUsers);
router.get("/showMe", authenticateUser, showCurrentUser);
router.post("/updateUser", authenticateUser, updateUser);
router.post("/updateUserPassword", authenticateUser, updateUserPassword);

router.get("/:id", getSingleUser);

export default router;
