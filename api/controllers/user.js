import { User } from "../models/User.js";
import { errorHandler } from "../utils/error.js";


export const updateUser = async (req, res, next) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      {
        new: true,
      }
    );
    return res.status(200).json(user);
  } catch (err) {
    next(err);
  }
};

export const deleteUser = async (req, res, next) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
      return next(
        errorHandler(400, "user doesn't exist")
      );
    }
    return res.status(200).json(user);
  } catch (err) {
    next(err);
  }
};

export const getUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return next(
        errorHandler(400, "user doesn't exist")
      );
    }
    return res.status(200).json(user);
  } catch (err) {
    next(err);
  }
};

export const getAllUser = async (req, res, next) => {
  try {
    const user = await User.find({});
    return res.status(200).json(user);
  } catch (err) {
    next(err);
  }
};
