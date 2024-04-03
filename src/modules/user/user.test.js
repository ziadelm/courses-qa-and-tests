import { describe, it, expect } from "vitest";
import { createUser } from "./user.service";

describe("User Service", () => {
  it("Create user", async () => {
    const user = await createUser("Valentin R");

    expect(user).toBeDefined();
    expect(user.id).toBeDefined();
    expect(user.id).toBeTypeOf("number");
    expect(user).toHaveProperty("name", "Valentin R");
  });
});
