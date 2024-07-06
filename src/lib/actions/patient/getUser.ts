"use server";

import { parseStringify } from "../../../../lib/utils";
import { users } from "../../appwrite.config";

export const getUser = async (userId: string) => {
  try {
    const user = await users.get(userId);
    return parseStringify(user);
  } catch (error) {
    console.error(error);
  }
};
