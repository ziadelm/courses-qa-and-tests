import { sql } from "../../infrastructure/db";

export async function createUserInRepository(name) {
  const users = await sql`
    INSERT INTO users (name)
    VALUES (${name})
    RETURNING *
    `;

  return users[0];
}
