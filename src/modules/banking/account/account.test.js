// src/modules/banking/account/account.test.js
import { describe, it, expect, vi, afterEach } from "vitest";
import { createAccount, getAccounts, deleteAccount } from "./account.service.js";
import {
  createAccountInRepository,
  getAccountsFromRepository,
  deleteAccountInRepository,
} from "./account.repository.js";
import { HttpBadRequest, HttpNotFound } from "@httpx/exception";

// Mock du repository
vi.mock("./account.repository.js", async (importOriginal) => ({
  ...(await importOriginal()),
  createAccountInRepository: vi.fn((data) => ({ id: 1, ...data })),
  getAccountsFromRepository: vi.fn((userId) => [
    { id: 1, userId, balance: 100, type: "savings" },
    { id: 2, userId, balance: 50, type: "checking" },
  ]),
  deleteAccountInRepository: vi.fn((userId, accountId) => accountId === 1),
}));

describe("Account Service", () => {
  afterEach(() => vi.clearAllMocks());

  it("should create an account", async () => {
    const account = await createAccount({ userId: 1, balance: 100, type: "savings" });
    expect(account).toBeDefined();
    expect(account).toHaveProperty("id", 1);
    expect(createAccountInRepository).toBeCalledTimes(1);
  });

  it("should fail creating account with invalid data", async () => {
    try {
      await createAccount({ userId: 1, balance: 100 }); // type manquant
      throw new Error("createAccount should throw");
    } catch (e) {
      expect(e.name).toBe("HttpBadRequest");
    }
  });

  it("should get accounts for a user", async () => {
    const accounts = await getAccounts(1);
    expect(accounts).toHaveLength(2);
    expect(accounts[0]).toHaveProperty("balance");
    expect(getAccountsFromRepository).toBeCalledTimes(1);
  });

  it("should delete an account", async () => {
    const result = await deleteAccount(1, 1);
    expect(result).toBe(true);
    expect(deleteAccountInRepository).toBeCalledTimes(1);
  });

  it("should fail deleting non-existent account", async () => {
    try {
      await deleteAccount(1, 99);
      throw new Error("deleteAccount should throw");
    } catch (e) {
      expect(e.name).toBe("HttpNotFound");
    }
  });
});
