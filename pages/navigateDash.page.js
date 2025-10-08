const { BasePage } = require('./base.page');
const { expect } = require('@playwright/test');

class NavigateDash extends BasePage {
    constructor(page) {
        super(page);
        this.home = page.getByRole('link', { name: "Home " });
        this.contact = page.getByRole('link', { name: "Contact" });
        this.about = page.getByRole('link', { name: "About us" });
        this.cart = page.getByRole('link', { name: "Cart", exact: true });

        this.products = page.locator('#tbodyid > div'); 

        this.addCart = page.getByRole('link', { name: "Add to cart" });

        this.next = page.locator('#next2');
        this.previous = page.locator('#prev2');
    };

    async goHome() {
        await this.home.click();
        await expect(this.page.locator('#cat')).toBeVisible();
    };

    async goContact() {
        await this.contact.click();
        await expect(this.page.getByText("New message")).toBeVisible();
    };

    async goAbout() {
        await this.about.click();
        await expect(this.page.getByText("About us", { exact: true }).nth(0)).toBeVisible();
    };

    async goCart() {
        await this.cart.click();
        await this.page.waitForURL('https://www.demoblaze.com/cart.html');
        await expect(this.page.getByText('Products')).toBeVisible();
    };


    async verifyCategoryOfProducts(category, expProducts) {
        await this.page.getByText(category).click();
        await expect(this.products).toHaveCount(expProducts.length);

        for (const name of expProducts) {
            const product = this.products.filter({ hasText: name }).first();
            await expect(product).toBeVisible();
        };
    };

    async verifyAllProducts() {
        const count = await this.products.count();

        for (let i = 0; i < count; i++) {
            await expect(this.products.nth(i)).toBeVisible();
        };

        await expect(this.products).toHaveCount(count);
    };

    async goToProduct(index) {
        await this.products.nth(index).click();
    };
    
    async clickAddToCart() {
        await this.addCart.click();
    };

    async goToCartPage() {
        await this.cart.click();
    };

    async verifyNextAndPrevious(index) {
        await expect(this.products.first()).toBeVisible({ timeout: 5000 });

        await this.next.click();

        await expect(this.products.nth(index)).toBeVisible();

        await this.previous.click();

        await expect(this.products.first()).toBeVisible();
    };

    async altImage() {
        const images = this.products.locator('img');
        const countI = await images.count();

        for (let i = 0; i < countI; i++) {
            await expect(images.nth(i)).toHaveAttribute('alt');
        };
    };
};
module.exports = { NavigateDash }



// Vérifier que le bouton Cart est bien accessible et mettre un produit dedans. Vérifier que ça apparaisse bien dans le Cart avec un goBack, goForward
// Vérifier que chaque image possède bien un alt
