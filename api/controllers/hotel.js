import Hotel from "../models/Hotel.js";
import { errorHandler } from "../utils/error.js";

export const createHotel = async (req, res, next) => {
  const newHotel = new Hotel(req.body);
  try {
    const hotel = await newHotel.save();
    return res.status(200).json(hotel);
  } catch (err) {
    next(err);
  }
};

export const updateHotel = async (req, res, next) => {
  try {
    const hotel = await Hotel.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      {
        new: true,
      }
    );
    return res.status(200).json(hotel);
  } catch (err) {
    next(err);
  }
};

export const deleteHotel = async (req, res, next) => {
  try {
    const hotel = await Hotel.findByIdAndDelete(req.params.id);
    if (!hotel) {
      return next(
        errorHandler(400, `Hotel with id ${req.params.id} does not exist!`)
      );
    }
    return res.status(200).json(hotel);
  } catch (err) {
    next(err);
  }
};

export const getHotel = async (req, res, next) => {
  try {
    const hotel = await Hotel.findById(req.params.id);
    if (!hotel) {
      return next(
        errorHandler(400, `Hotel with id ${req.params.id} does not exist!`)
      );
    }
    return res.status(200).json(hotel);
  } catch (err) {
    next(err);
  }
};

export const getAllHotel = async (req, res, next) => {
  try {
    const hotel = await Hotel.find({});
    return res.status(200).json(hotel);
  } catch (err) {
    next(err);
  }
};
