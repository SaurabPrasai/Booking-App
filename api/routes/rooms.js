import express from "express";

import { verifyAdmin } from "../utils/verifyToken.js";
import {
  createRoom,
  deleteRoom,
  getAllRoom,
  getRoom,
  updateRoom,
} from "../controllers/room.js";

const router = express.Router();

// CREATE
router.post("/:hotelId", verifyAdmin, createRoom);

// UPDATE
router.put("/:id", verifyAdmin, updateRoom);
// Delete
router.delete("/:hotelId/:id", verifyAdmin, deleteRoom);

//   GET
router.get("/:id", getRoom);

// GET ALL
router.get("/", getAllRoom);

export default router;
