import { describe, it, expect, vi, afterEach } from "vitest";
import { createUser } from "./user.service";
import { createUserInRepository } from "./user.repository";
import { HttpBadRequest, HttpForbidden } from "@httpx/exception";

// Création du Mock du repository
vi.mock("./user.repository", async (importOriginal) => ({
  ...(await importOriginal()),
  createUserInRepository: vi.fn((data) => ({
    id: 4,
    name: data.name,
    birthday: data.birthday,
  })),
}));

describe("User Service", () => {
  // Réinitialise tous les mocks après chaque test
  afterEach(() => vi.clearAllMocks());

  // Création de notre premier test
  it("should create an user", async () => {
    const user = await createUser({
      name: "Valentin R",
      birthday: new Date(1997, 8, 13),
    });

    // Assertions sur le retour de la fonction
    expect(user).toBeDefined();
    expect(user.id).toBeDefined();
    expect(user.id).toBeTypeOf("number");
    expect(user).toHaveProperty("name", "Valentin R");
    expect(user.birthday).toBeDefined();
    expect(user.birthday.getFullYear()).toBe(1997);
    expect(user.birthday.getMonth()).toBe(8);

    // Assertions sur le Mock
    expect(createUserInRepository).toBeCalledTimes(1);
    expect(createUserInRepository).toBeCalledWith({
      name: "Valentin R",
      birthday: new Date(1997, 8, 13),
    });
  });

  // Gestion des erreurs - données manquantes
  it("should trigger a bad request error when user creation", async () => {
    try {
      await createUser({
        name: "Valentin R", // date manquante
      });
      throw new Error("createUser should trigger an error.");
    } catch (e) {
      expect(e.name).toBe("HttpBadRequest");
      expect(e.statusCode).toBe(400);
    }
  });

  // Exercice 1 : utilisateur trop jeune
  it("should trigger an error when user is too young", async () => {
    try {
      await createUser({
        name: "Petit Valentin",
        birthday: new Date(), // aujourd'hui = trop jeune
      });
      throw new Error("createUser should trigger an error for too young user.");
    } catch (e) {
      // Correction : correspond à la logique métier
      expect(e.name).toBe("HttpForbidden");
      expect(e.statusCode).toBe(403);
    }
  });
});
