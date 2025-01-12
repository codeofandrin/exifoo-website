export class EMail {
    static feedback = "feedback@exifoo.com"
    static help = "support@exifoo.com"
    static info = "info@exifoo.com"
}

export class Checkout {
    static storeURL = "https://store.exifoo.com"
    static checkoutID = process.env.LEMSQZY_CHECKOUT_ID
    static checkoutURL = `${this.storeURL}/buy/${this.checkoutID}`
}
