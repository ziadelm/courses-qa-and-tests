import { HttpBadRequest } from "@httpx/exception";
import { z } from "zod";
import { createUserInRepository } from "./user.repository";

const UserSchema = z.object({
  name: z.string().min(2),
});

export async function createUser(name) {
  const result = UserSchema.safeParse({ name });

  if (result.success) {
    return createUserInRepository(name);
  } else {
    throw new HttpBadRequest(result.error);
  }
}
