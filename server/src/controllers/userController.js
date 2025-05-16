import userModel from "../models/user.js";
import mongoose from "mongoose";
import { paginateQuery } from "../utils/paginate.js";

const getUsers = async (req, res) => {
  try {
    const data = await paginateQuery(userModel, {}, {
      page: req.query.page,
      limit: req.query.limit,
      select: "-password",
      sort: { createdAt: -1 },
    });

    res.json(data);
  } catch (error) {
    console.error("Error al obtener usuarios:", error.message);
    res.status(400).json({ error: error.message });
  }
};

const getUserById = async (req, res) => {
  const id = req.params.id;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "ID inválido" });
  }

  try {
    const user = await userModel.findById(id).select("-password");

    if (!user) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }

    res.json(user);
  } catch (error) {
    console.error("Error al obtener usuario:", error);
    res.status(500).json({ error: "Error del servidor" });
  }
};

const createUser = async (req, res) => {
  const data = req.body;

  try {
    const newUser = new userModel(data);
    await newUser.save();

    const userToReturn = newUser.toObject();
    delete userToReturn.password;

    res.status(201).json(userToReturn);
  } catch (error) {
    console.error("Error al crear usuario:", error);
    res.status(500).json({ error: "Error del servidor" });
  }
};

const updateUser = async (req, res) => {
  const id = req.params.id;
  const data = req.body;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "ID inválido" });
  }

  try {
    const updatedUser = await userModel.findByIdAndUpdate(id, data, {
      new: true,
      runValidators: true,
    }).select("-password");

    if (!updatedUser) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }

    res.json(updatedUser);
  } catch (error) {
    console.error("Error al actualizar usuario:", error);
    res.status(500).json({ error: "Error del servidor" });
  }
};

const deleteUser = async (req, res) => {
  const id = req.params.id;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "ID inválido" });
  }

  try {
    const deletedUser = await userModel.findByIdAndDelete(id).select("-password");

    if (!deletedUser) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }

    res.json({ message: "Usuario eliminado correctamente", user: deletedUser });
  } catch (error) {
    console.error("Error al eliminar usuario:", error);
    res.status(500).json({ error: "Error del servidor" });
  }
};

export default {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
};
