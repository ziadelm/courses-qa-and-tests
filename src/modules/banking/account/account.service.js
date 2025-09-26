// src/modules/banking/account/account.service.js
import {
  createAccountInRepository,
  getAccountsFromRepository,
  deleteAccountInRepository,
} from "./account.repository.js";
import { HttpBadRequest, HttpNotFound } from "@httpx/exception";

export async function createAccount(data) {
  if (!data.userId || data.balance == null || !data.type) {
    throw new HttpBadRequest("Invalid account data");
  }
  return createAccountInRepository(data);
}

export async function getAccounts(userId) {
  if (!userId) throw new HttpBadRequest("User ID required");
  return getAccountsFromRepository(userId);
}

export async function deleteAccount(userId, accountId) {
  if (!userId || !accountId) throw new HttpBadRequest("UserId and AccountId required");

  const result = await deleteAccountInRepository(userId, accountId);
  if (!result) throw new HttpNotFound("Account not found");
  return result;
}
