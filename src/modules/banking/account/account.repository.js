// src/modules/banking/account/account.repository.js

export async function createAccountInRepository(data) {
  // Stub minimal pour que le mock fonctionne
  return {
    id: 1,
    userId: data.userId,
    balance: data.balance,
    type: data.type,
  };
}

export async function getAccountsFromRepository(userId) {
  // Retourne un exemple de liste
  return [
    { id: 1, userId, balance: 100, type: "savings" },
    { id: 2, userId, balance: 50, type: "checking" },
  ];
}

export async function deleteAccountInRepository(userId, accountId) {
  // Retourne true si suppression réussie
  return true;
}
