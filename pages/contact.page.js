const { BasePage } = require('./base.page');

class ContactPage extends BasePage {
    constructor(page) {
        super(page);
        this.navcontact = this.page.getByRole('link', { name: "Contact" });
        this.contactEmail = page.locator("#recipient-email");
        this.contactName = page.locator("#recipient-name");
        this.contactMessage = page.locator("#message-text");
        this.sendMessage = page.getByRole('button', { name: "Send message" });
    };

    async writeMessage(email, name, message) {
        await this.navcontact.click();
        await this.contactEmail.fill(email);
        await this.contactName.fill(name);
        await this.contactMessage.fill(message);
        await this.sendMessage.click();
    }
}

module.exports = { ContactPage }