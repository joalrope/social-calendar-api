import { Schema } from "mongoose";
import { User, Category, SMPost, Role } from "../models";

export const roleIsValid = async (role: string) => {
  try {
    const roleDB = await Role.findOne({ role });

    if (!roleDB) return false;
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
};

export const emailAlreadyExists = async (email: string = "") => {
  // Verificar si el correo existe
  const emailDB = await User.findOne({ email });
  if (emailDB) {
    throw new Error(`El correo: ${email}, ya está registrado`);
  }
};

export const userIdAlreadyExists = async (id: Schema.Types.ObjectId) => {
  // Verificar si el correo existe

  const userDB = await User.findById(id);
  if (!userDB) {
    throw new Error(`El id no existe ${id}`);
  }
};

/**
 * Categorias
 */
export const categoryIdAlreadyExists = async (id: Schema.Types.ObjectId) => {
  // Verificar si el correo existe
  const categoryDB = await Category.findById(id);
  if (!categoryDB) {
    throw new Error(`El id no existe ${id}`);
  }
};

/**
 * Productos
 */
export const productIdAlreadyExists = async (id: Schema.Types.ObjectId) => {
  // Verificar si el correo existe
  const productDB = await SMPost.findById(id);
  if (!productDB) {
    throw new Error(`El id no existe ${id}`);
  }
};

/**
 * Validar colecciones permitidas
 */
export const collectionsAllowed = (
  collection: string = "",
  collections: string[] = []
) => {
  const included = collections.includes(collection);
  if (!included) {
    throw new Error(
      `La colección ${collection} no es permitida, ${collections}`
    );
  }
  return true;
};
