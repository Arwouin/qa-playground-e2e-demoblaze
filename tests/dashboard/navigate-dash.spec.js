const { test, expect } = require('@playwright/test');
const { NavigateDash } = require('../../pages/navigateDash.page');
const { takeScreen } = require('../../utils/screenshots');

test.describe("Naviguer dans le dashboard", () => {
    let navigateDash;

    test.beforeEach(async ({ page }) => {
        navigateDash = new NavigateDash(page);
        await navigateDash.navigate();
    });

    test("Navigation libre à l'intérieur du dashboard", async ({ page }) => {
        await test.step("Cliquer sur la page home", async () => {
            await navigateDash.refresh();
            await navigateDash.goHome();
            await takeScreen(page, "dashboardScreen", "navigateClickOnHome");
        });

        await test.step("Cliquer sur la page de contact", async () => {
            await navigateDash.refresh();
            await navigateDash.goContact();
            await takeScreen(page, "dashboardScreen", "navigateClickOnContact");
        });

        await test.step("Cliquer sur la page à propos", async () => {
            await navigateDash.refresh();
            await navigateDash.goAbout();
            await takeScreen(page, "dashboardScreen", "navigateClickOnAbout");
        });

        await test.step("Cliquer sur la page du panier", async () => {
            await navigateDash.refresh();
            await navigateDash.goCart();
            await takeScreen(page, "dashboardScreen", "navigateClickOnCart");
        });
    });

    test("Vérification des catégories produits ainsi que du filtre", async ({ page }) => {
        await test.step("Vérification de tous les produits", async () => {
            await navigateDash.verifyAllProducts();
        });

        await test.step("Vérification de la catégorie Phones", async () => {
            await navigateDash.verifyCategoryOfProducts('Phones', [
                "Samsung galaxy s6",
                "Nokia lumia 1520",
                "Nexus 6",
                "Samsung galaxy s7",
                "Iphone 6 32gb",
                "Sony xperia z5",
                "HTC One M9"
            ]);
        });

        await test.step("Vérification de la catégorie Laptops", async () => {
            await navigateDash.verifyCategoryOfProducts('Laptops', [
                "Sony vaio i5",
                "Sony vaio i7",
                "MacBook air",
                "Dell i7 8gb",
                "2017 Dell 15.6 Inch",
                "MacBook Pro"
            ]);
        });

        await test.step("Vérification de la catégorie Monitors", async () => {
            await navigateDash.verifyCategoryOfProducts('Monitors', [
                "Apple monitor 24",
                "ASUS Full HD"
            ]);
        });

        await test.step("Vérification de l'ajout d'un produit au panier", async () => { 
            await navigateDash.refresh();

            await navigateDash.goToProduct(0);
            await navigateDash.clickAddToCart();

            await navigateDash.goToCartPage();
            await page.waitForURL('https://www.demoblaze.com/cart.html');

            const phone = page.locator('#tbodyid').getByText("Samsung galaxy s6");
            await expect(phone).toBeVisible();                 
        });

        await test.step("Vérification du bouton next", async () => {
            await page.goto('https://www.demoblaze.com/index.html');
            await navigateDash.refresh();
            await navigateDash.verifyNextAndPrevious(1);
        });

        await test.step("Vérifier que le cart est bien accessible avec un back et un forward", async () => {
            await navigateDash.refresh();

            const product1 = page.getByText('Nokia lumia 1520')

            await navigateDash.goToProduct(1);
            await navigateDash.clickAddToCart();


            await navigateDash.goToCartPage();
            page.waitForURL('https://www.demoblaze.com/cart.html');

            await page.goBack();
            await expect(page).toHaveURL('https://www.demoblaze.com/prod.html?idp_=2#');

            await page.goForward();
            await expect(page).toHaveURL('https://www.demoblaze.com/cart.html');

            await expect(product1).toBeVisible();
        });

        await test.step("Vérifier que toutes les images possèdent bien un alt", async () => {
            await navigateDash.refresh();
            await navigateDash.altImage();
        });
    });
});