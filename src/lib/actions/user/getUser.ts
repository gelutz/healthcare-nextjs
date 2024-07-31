"use server";

import { users } from "../../appwrite.config";
import { parseStringify } from "../../utils";

export const getUser = async (userId: string) => {
  try {
    const user = await users.get(userId);
    return parseStringify(user);
  } catch (error) {
    console.error(error);
  }
};
