import express from "express";

import {
  deleteUser,
  updateUser,
  getAllUser,
  getUser,
} from "../controllers/user.js";
import { verifyAdmin, verifyToken, verifyUser } from "../utils/verifyToken.js";

const router = express.Router();

// router.get("/verifytoken/:id",verifyToken,(req,res)=>{
//   res.send("Yes it is absolutely working")
// })

// router.get("/checkuser/:id",verifyUser,(req,res)=>{
//   res.send("Yes it is working")
// })

// router.get("/checkadmin/:id",verifyAdmin,(req,res)=>{
//   res.send("Yes it is admin")
// })

// UPDATE
router.put("/:id", verifyUser, updateUser);
// Delete
router.delete("/:id", verifyUser, deleteUser);

//   GET
router.get("/:id", verifyUser, getUser);

// GET ALL
router.get("/", verifyAdmin, getAllUser);

export default router;
