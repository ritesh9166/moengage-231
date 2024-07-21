/*
import { List } from "../model/list.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const createList = async (req, res, next) => {
  try {
    const { name, code, userId } = req.body;

    if (!name || !code || !userId) {
      throw new ApiError(400, "Name, code, and userId are required");
    }

    const list = await List.create({
      name,
      code,
      userId,
    });

    const createdList = await List.findById(list._id);
    if (!createdList) {
      throw new ApiError(500, "Something went wrong while creating the list");
    }

    return res
      .status(201)
      .json(new ApiResponse(201, createdList, "List created successfully"));
  } catch (error) {
    console.error("Error in createList:", error);
    next(error);
  }
};

const getList = async (req, res, next) => {
  try {
    const lists = await List.find({}).populate("userId", "name email");
    return res
      .status(200)
      .json(new ApiResponse(200, lists, "Lists fetched successfully"));
  } catch (error) {
    console.error("Error in getList:", error);
    next(error);
  }
};

const updateList = async (req, res, next) => {
  const { listId } = req.params;
  const { name, code } = req.body;

  try {
    const updateData = { name, code };

    const list = await List.findByIdAndUpdate(listId, updateData, { new: true });
    if (!list) {
      return res.status(404).json(new ApiResponse(404, {}, "List not found"));
    }

    return res
      .status(200)
      .json(new ApiResponse(200, list, "List updated successfully"));
  } catch (error) {
    console.error("Error in updateList:", error);
    next(error);
  }
};

const deleteList = async (req, res, next) => {
  const { listId } = req.params;
  try {
    const list = await List.findByIdAndDelete(listId);
    if (!list) {
      return res.status(404).json(new ApiResponse(404, {}, "List not found"));
    }
    return res
      .status(200)
      .json(new ApiResponse(200, list, "List deleted successfully"));
  } catch (error) {
    console.error("Error in deleteList:", error);
    next(error);
  }
};

export { createList, getList, updateList, deleteList };
*/

import {List} from "../model/list.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";

// Create a new list
const createList = async (req, res, next) => {
  try {
    const { name, code, userId } = req.body;
    const image = req.file ? req.file.path : null;

    if (!name || !code || !userId) {
      throw new ApiError(400, "Name, code, and userId are required");
    }

    const list = await List.create({ name, code, userId, image });

    const createdList = await List.findById(list._id);
    if (!createdList) {
      throw new ApiError(500, "Something went wrong while creating the list");
    }

    return res.status(201).json(new ApiResponse(201, createdList, "List created successfully"));
  } catch (error) {
    console.error("Error in createList:", error);
    next(error);
  }
};

// Get all lists
const getList = async (req, res, next) => {
  try {
    const lists = await List.find({}).populate("userId", "name email");
    return res.status(200).json(new ApiResponse(200, lists, "Lists fetched successfully"));
  } catch (error) {
    console.error("Error in getList:", error);
    next(error);
  }
};

// Update a list by ID
const updateList = async (req, res, next) => {
  const { listId } = req.params;
  const { name, code } = req.body;
  const image = req.file ? req.file.path : null;

  try {
    const updateData = { name, code, image };

    const list = await List.findByIdAndUpdate(listId, updateData, { new: true });
    if (!list) {
      return res.status(404).json(new ApiResponse(404, {}, "List not found"));
    }

    return res.status(200).json(new ApiResponse(200, list, "List updated successfully"));
  } catch (error) {
    console.error("Error in updateList:", error);
    next(error);
  }
};

// Delete a list by ID
const deleteList = async (req, res, next) => {
  const { listId } = req.params;
  try {
    const list = await List.findByIdAndDelete(listId);
    if (!list) {
      return res.status(404).json(new ApiResponse(404, {}, "List not found"));
    }
    return res.status(200).json(new ApiResponse(200, list, "List deleted successfully"));
  } catch (error) {
    console.error("Error in deleteList:", error);
    next(error);
  }
};

export { createList, getList, updateList, deleteList };
