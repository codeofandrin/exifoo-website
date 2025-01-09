export class EMail {
    static feedback = "feedback@exifoo.com"
    static help = "support@exifoo.com"
    static info = "info@exifoo.com"
}

export class Checkout {
    static storeURL = "https://store.exifoo.com"
    static productID = process.env.LEMSQZY_PRODUCT_ID
    static productURL = `${this.storeURL}/buy/${this.productID}`
}
