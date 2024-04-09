import Hotel from "../models/Hotel.js";
import { Room } from "../models/Room.js";

export const createRoom = async (req, res) => {
  const hotelId = req.params.hotelId;
  const newRoom = new Room(req.body);
  try {
    const room = await newRoom.save();
    try {
      await Hotel.findByIdAndUpdate(hotelId, {
        $push: {
          rooms: room._id,
        },
      });
      res.status(200).json(room);
    } catch (error) {
      next(error);
    }
  } catch (error) {
    next(error);
  }
};

export const updateRoom = async (req, res, next) => {
  try {
    const room = await Room.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      {
        new: true,
      }
    );
    return res.status(200).json(room);
  } catch (err) {
    next(err);
  }
};

export const deleteRoom = async (req, res, next) => {
  const hotelId = req.params.hotelId;
  try {
    const room = await Room.findByIdAndDelete(req.params.id);
    try {
      await Hotel.findByIdAndUpdate(hotelId, {
        $pull: {
          rooms: req.params.id,
        },
      });
      res.status(200).json(room);
    } catch (error) {
      next(error);
    }
  } catch (err) {
    next(err);
  }
};

export const getRoom = async (req, res, next) => {
  try {
    const room = await Room.findById(req.params.id);
    if (!room) {
      return next(
        errorHandler(400, `Room with id ${req.params.id} does not exist!`)
      );
    }
    return res.status(200).json(room);
  } catch (err) {
    next(err);
  }
};

export const getAllRoom = async (req, res, next) => {
  try {
    const room = await Room.find({});
    return res.status(200).json(room);
  } catch (err) {
    next(err);
  }
};
