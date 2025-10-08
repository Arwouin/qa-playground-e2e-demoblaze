const { test, expect } = require('@playwright/test');
const { RegisterLogin } = require('../../pages/register-login.page');
const users = require('../../json/users.json');
const { generateUser } = require('../../utils/generate');
const { takeScreen } = require('../../utils/screenshots');

const emptyInputs = [
    { username: "", password: ""},
    { username: "thisisatest", password: ""},
    { username: "", password: "thisoneisapassword"}
];

test.describe("Test d'inscription et de connexion", () => {
    let registerLogin;

    test.beforeEach(async ({ page }) => {
        registerLogin = new RegisterLogin(page);
        await registerLogin.navigate();
    });

    test("Inscriptions", async ({ page }) => {
        await test.step("Inscription avec un utilisateur généré automatiquement", async () => {
            const UserGenerate = generateUser();
            await registerLogin.signUp(UserGenerate.username, UserGenerate.password);
        });
        await expect(page).toHaveURL('https://www.demoblaze.com/index.html')

        await test.step("Inscription avec un utilisateur déjà inscrit", async () => {
            // L'utilisateur test est déjà utilisé précédemment.
            const username = "thisusernameisatest";
            const password = "test";

            await registerLogin.signUp(username, password);
            
            const signUpText = page.locator('#signin2');
            await expect(signUpText).toBeVisible(); // Je vérifie ici que le texte signUp est visible (Donc signup échoué)
            await takeScreen(page, "authScreen", "already-taken");
        });

        await test.step("Inscription avec des champs vides", async () => {
            for (const { username, password } of emptyInputs) {
                await registerLogin.refresh();
                await test.step(`Tentative d'inscription avec ${username}`, async () => {
                    page.once('dialog', async dialog => {
                        expect(dialog.type()).toBe('alert');
                        await dialog.accept();
                    });
                    await registerLogin.signUp(username, password);
                    await expect(page.locator('#signin2')).toBeVisible();
                });
            };
        });
    });

    test("Connexions", async ({ page }) => {
        await test.step("Connexion via un utilisateur valide", async () => {
            await registerLogin.login(
                users.Valid_user.username,
                users.Valid_user.password 
            );
            const nameUser = page.locator('#nameofuser');
            await expect(nameUser).toContainText('thisusernameisatest');
            await takeScreen(page, "authScreen", "after-login");
        });

        await test.step("Connexion avec des champs vides", async () => {
            const logOut = page.locator('#logout2');
            await logOut.click();
            for (const { username, password } of emptyInputs) {
                await registerLogin.refresh();
                await test.step(`Tentative de connexion avec ${username}`, async () => {
                    page.once('dialog', async dialog => {
                        expect(dialog.type()).toBe('alert');
                        await dialog.accept();
                    });
                    await registerLogin.login(username, password);
                    await expect(page.locator('#login2')).toBeVisible({ timeout: 5000 });
                });
            };
        });

        await test.step("Tentative de connexion avec un utilisateur non inscrit", async () => {
            await registerLogin.refresh();
            await registerLogin.login(
                users.NotSignUser.username,
                users.NotSignUser.password
            );
            await expect(page.locator('#login2')).toBeVisible({ timeout: 5000 });
        });
    });
});