const { test, expect } = require('@playwright/test');
const { ContactPage } = require('../../pages/contact.page');
const contact = require('../../json/contact.json');

test.describe("Envoi d'un message via la partie contact", () => {
    let contactPage;

    test.beforeEach(async ({ page }) => {
        contactPage = new ContactPage(page);
        await contactPage.navigate();
    });

    test("Envoi d'un message standard via la plateforme contact", async ({ page }) => {
        await contactPage.writeMessage(
            contact.MessageContact.email,
            contact.MessageContact.name,
            contact.MessageContact.message
        );
        await expect(page).toHaveURL('https://www.demoblaze.com/index.html');
    });
});
