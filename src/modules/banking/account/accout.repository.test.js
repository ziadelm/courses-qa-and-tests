// src/modules/banking/account/account.repository.test.js
import { describe, it, expect } from "vitest";
import {
  createAccountInRepository,
  getAccountsFromRepository,
  deleteAccountInRepository,
} from "./account.repository";

describe("Account Repository", () => {
  // Test createAccountInRepository
  it("should create an account", async () => {
    const data = { userId: 1, balance: 100, type: "savings" };
    const account = await createAccountInRepository(data);

    expect(account).toBeDefined();
    expect(account.id).toBe(1);
    expect(account.userId).toBe(data.userId);
    expect(account.balance).toBe(data.balance);
    expect(account.type).toBe(data.type);
  });

  // Test getAccountsFromRepository
  it("should return a list of accounts for a user", async () => {
    const accounts = await getAccountsFromRepository(1);

    expect(accounts).toBeDefined();
    expect(accounts.length).toBe(2);

    expect(accounts[0]).toHaveProperty("id", 1);
    expect(accounts[0]).toHaveProperty("userId", 1);
    expect(accounts[0]).toHaveProperty("balance", 100);
    expect(accounts[0]).toHaveProperty("type", "savings");

    expect(accounts[1]).toHaveProperty("id", 2);
    expect(accounts[1]).toHaveProperty("userId", 1);
    expect(accounts[1]).toHaveProperty("balance", 50);
    expect(accounts[1]).toHaveProperty("type", "checking");
  });

  // Test deleteAccountInRepository
  it("should delete an account and return true", async () => {
    const result = await deleteAccountInRepository(1, 2);
    expect(result).toBe(true);
  });
});
