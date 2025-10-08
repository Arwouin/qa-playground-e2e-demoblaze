class BasePage {
    constructor(page) {
        this.page = page;
        this.baseUrl = "https://www.demoblaze.com/index.html";
    }

    async navigate() {
        await this.page.goto(`${this.baseUrl}`);
    }

    async goBack() {
        await this.page.goBack();
    }

    async goForward() {
        await this.page.goForward();
    }

    async refresh() {
        await this.page.reload();
    }
}

module.exports = { BasePage } 