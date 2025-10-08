const { test, expect } = require('@playwright/test');
const { Purchase } = require('../../pages/purchase.page');
const purchaseForm = require('../../json/purchase.json');

test.describe("Utilisation et vérification des achats produits", () => {
    let purchase;

    test.beforeEach(async ({ page }) => {
        purchase = new Purchase(page);
        await purchase.navigate();
    });

    test('Différents achats', async ({ page }) => {
        await test.step("Achat d'un produit seul et paiement de celui-ci", async () => {
            test.setTimeout(60000);
            await purchase.goToProduct(1);
            await purchase.addItemToCart();

            await purchase.goToCart();
            await purchase.verifItems(1)

            await purchase.purchaseItem(
                purchaseForm.Form.name,
                purchaseForm.Form.country,
                purchaseForm.Form.city,
                purchaseForm.Form.card,
                purchaseForm.Form.month,
                purchaseForm.Form.year
            );
            await expect(page).toHaveURL('https://www.demoblaze.com/index.html');
        });

        await test.step("Achat de deux produits", async () => {
            test.setTimeout(60000);
            await purchase.goToProduct(0);
            await purchase.addItemToCart();
            await purchase.goHome();

            await purchase.goToProduct(1);
            await purchase.addItemToCart();

            await purchase.goToCart();
            await purchase.verifItems(2);

            await purchase.purchaseItem(
                purchaseForm.Form.name,
                purchaseForm.Form.country,
                purchaseForm.Form.city,
                purchaseForm.Form.card,
                purchaseForm.Form.month,
                purchaseForm.Form.year
            );
            await expect(page).toHaveURL('https://www.demoblaze.com/index.html');
        });

        await test.step("Ajout de deux produits au panier, en supprimer un et vérifier celle-ci", async () => {
            test.setTimeout(60000);
            await purchase.goToProduct(3);
            await purchase.addItemToCart();
            await purchase.goHome();

            await purchase.goToProduct(5);
            await purchase.addItemToCart();

            await purchase.goToCart();
            await purchase.verifItems(2);

            await purchase.deleteItem("Samsung galaxy s7");
            await purchase.verifItems(1);
        })
    });
});