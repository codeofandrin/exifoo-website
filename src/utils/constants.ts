export class EMail {
    static feedback = "mail@andrin.software"
    static help = "mail@andrin.software"
    static info = "mail@andrin.software"
}

export class Checkout {
    static storeURL = "https://exifoo.lemonsqueezy.com"
    static checkoutID = process.env.LEMSQZY_CHECKOUT_ID
    static checkoutURL = `${this.storeURL}/buy/${this.checkoutID}`
}
