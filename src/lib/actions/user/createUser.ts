"use server";
import { ID, Query } from "node-appwrite";
import { parseStringify } from "../../../../lib/utils";
import { CreateUserParams } from "../../../../types";
import { users } from "../../appwrite.config";

export const createUser = async (user: CreateUserParams) => {
  try {
    const newUser = await users.create(
      ID.unique(),
      user.email,
      user.phone,
      undefined,
      user.name
    );

    return parseStringify(newUser);
  } catch (error: any) {
    console.error(error);
    if (error && error?.code === 409) {
      const documents = await users.list([Query.equal("email", [user.email])]);

      return documents?.users?.[0];
    }
  }
};
