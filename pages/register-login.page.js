const { BasePage } = require('./base.page');

class RegisterLogin extends BasePage {
    constructor(page) {
        super(page);
        this.signPop = page.locator("#signin2");
        this.signUsername = page.locator("#sign-username");
        this.signPassword = page.locator("#sign-password");
        this.signButton = page.getByRole('button', { name: "Sign up"});

        this.logPop = page.locator("#login2");
        this.logUsername = page.locator("#loginusername");
        this.logPassword = page.locator("#loginpassword");
        this.logButton = page.getByRole('button', { name: "Log in"})
    }

    async signUp(username, password) {
        await this.signPop.click();
        await this.signUsername.fill(username);
        await this.signPassword.fill(password);

        await this.signButton.click();
    }

    async login(username, password) {
        await this.logPop.click();
        await this.logUsername.fill(username);
        await this.logPassword.fill(password);

        await this.logButton.click();
    }
}
module.exports = { RegisterLogin }