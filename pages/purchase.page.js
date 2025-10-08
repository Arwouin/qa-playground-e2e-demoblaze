const { BasePage } = require('./base.page');
const { expect } = require('@playwright/test');

class Purchase extends BasePage {
    constructor(page) {
        super(page);
        this.products = page.locator('#tbodyid > div');
        this.addCart = page.getByRole('link', { name: "Add to cart" });
        this.cart = page.getByRole('link', { name: "Cart", exact: true });
        this.home = page.getByRole('link', { name: "Home " });

        this.productsCart = page.locator('#tbodyid > tr');

        this.phone = page.locator("a.list-group-item").filter({ hasText: "Phones" });
        this.laptops = page.locator("a.list-group-item").filter({ hasText: "Laptops" });
        this.monitors = page.locator("a.list-group-item").filter({ hasText: "Monitors" });

        this.placeOrder = page.getByRole('button', { name: "Place Order" });

        // Formulaire
        this.price = page.locator('#totalm');
        this.name = page.locator('#name');
        this.country = page.locator('#country');
        this.city = page.locator('#city')
        this.card = page.locator('#card');
        this.month = page.locator('#month');
        this.year = page.locator('#year');
        this.purchaseButton = page.getByRole('button', { name: "Purchase" });

        this.error = page.locator('#errors');
        this.confirm = page.getByRole('button', { name: "OK" });
    };

    async goHome() {
        await this.home.click();
    };

    async goToPhones() {
        await this.phone.click();
    };

    async goToLaptops() {
        await this.laptops.click();
    };

    async goToMonitors() {
        await this.monitors.click();
    };

    async goToProduct(index) {
        await this.products.nth(index).click();
    };

    async addItemToCart() {
        await this.addCart.waitFor({ state: 'visible', timeout: 60000 });
        await this.addCart.click();
    };

    async goToCart() {
        await this.cart.click();
    };

    async verifItems(number) {
        await expect(this.productsCart).toHaveCount(number);
    };

    async purchaseItem(name, country, city, card, month, year) {
        await this.placeOrder.click();

        await this.name.fill(name);
        await this.country.fill(country);
        await this.city.fill(city);
        await this.card.fill(card);
        await this.month.fill(month);
        await this.year.fill(year);

        await this.purchaseButton.click();
        await this.confirm.click();
    };

    async deleteItem(product) {
        await this.page.locator('tr', { hasText: product }).getByText('Delete').click();
    };
};
module.exports = { Purchase }