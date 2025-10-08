const { test, expect } = require('@playwright/test');
const { ContactPage } = require('../../pages/contact.page');
const { NavigateDash } = require('../../pages/navigateDash.page');
const { Purchase } = require('../../pages/purchase.page');
const { RegisterLogin } = require('../../pages/register-login.page');
const contactJson = require('../../json/contact.json');
const purchaseJson = require('../../json/purchase.json');
const usersJson = require('../../json/users.json');

test.describe("Scénario E2E avec connexion, achat, paiement x2", () => {
    let contactPage;
    let navigate;
    let purchase;
    let registerLogin;

    test.beforeEach(async ({ page }) => {
        contactPage = new ContactPage(page);
        navigate = new NavigateDash(page);
        purchase = new Purchase(page);
        registerLogin = new RegisterLogin(page);
        
        await contactPage.navigate();
    });

    test("Scénario E2E", async ({ page }) => {
        await test.step("Connexion en tant qu'utilisateur", async () => {
            await registerLogin.login(
                usersJson.e2e_user.username,
                usersJson.e2e_user.password
            );
            const nameUser = page.locator('#nameofuser');
            await expect(nameUser).toContainText('thisuserisforaEndToEnd');
        });

        await test.step("Achat d'un téléphone", async () => {
            // Téléphones
            await purchase.goToProduct(1);
            await purchase.addItemToCart();
            await purchase.goToCart();
            await purchase.verifItems(1);

            await purchase.purchaseItem(
                purchaseJson.Form.name,
                purchaseJson.Form.country,
                purchaseJson.Form.city,
                purchaseJson.Form.card,
                purchaseJson.Form.month,
                purchaseJson.Form.year
            );
        });

        await test.step("Envoi d'un message contact", async () => {
            await navigate.goHome();
            await contactPage.writeMessage(
                contactJson.E2EContact.email,
                contactJson.E2EContact.name,
                contactJson.E2EContact.message
            );
            await expect(page).toHaveURL('https://www.demoblaze.com/index.html');
        });
    });
});