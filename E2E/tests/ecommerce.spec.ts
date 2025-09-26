import test, { expect, Page } from "@playwright/test";

// Fonction pour accepter les cookies si le bouton est présent
async function acceptCookies(page: Page) {
  const acceptCookiesButton = page.getByRole("button", { name: "Consent" });
  if (await acceptCookiesButton.isVisible({ timeout: 5000 })) {
    await acceptCookiesButton.click();
  }
}

test.describe("Ecommerce end-to-end tests", () => {
  // Avant chaque test : aller sur la page d'accueil et accepter les cookies
  test.beforeEach(async ({ page }) => {
    await page.goto("https://automationexercise.com/");
    await acceptCookies(page);
  });

  test("should go to product page", async ({ page }) => {
    // Cliquer sur le bouton Products
    await page.getByRole("link", { name: " Products" }).click();

    // Vérifier que l'on est sur la bonne URL
    await expect(page).toHaveURL("https://automationexercise.com/products");

    // Vérifier que le titre de la page est correct
    expect(await page.title()).toBe("Automation Exercise - All Products");
  });

  test("should find a t-shirt", async ({ page }) => {
    // Aller sur la page products
    await page.getByRole("link", { name: " Products" }).click();

    // Chercher "t-shirt" dans la barre de recherche
    await page.getByRole("textbox", { name: "Search Product" }).fill("t-shirt");

    // Cliquer sur le bouton de recherche
    await page.getByRole("button", { name: "" }).click();

    // Vérifier que 3 produits sont affichés
    const products = page.locator(".features_items .product-image-wrapper");
    await expect(products).toHaveCount(3);
  });

  test("should contains product's details like title and price", async ({ page }) => {
    // Aller directement sur la page produit
    await page.goto("https://automationexercise.com/product_details/30");

    // Vérifier le titre de la page
    expect(await page.title()).toBe("Automation Exercise - Product Details");

    // Vérifier le titre du produit
    await expect(
      page.getByRole("heading", { name: "Premium Polo T-Shirts" })
    ).toBeVisible();

    // Vérifier que le prix est visible
    await expect(page.getByText("Rs.")).toBeVisible();

    // Vérifier que le bouton "Add to cart" est visible
    await expect(page.getByRole("button", { name: " Add to cart" })).toBeVisible();
  });
});
