export class EMail {
    static feedback = "feedback@exifoo.com"
    static help = "support@exifoo.com"
    static info = "info@exifoo.com"
}

export class Checkout {
    static storeURL = "https://store.exifoo.com"
    // productID
    //      Live Mode: TODO
    //      Test Mode: 28dafee5-7c7f-48c2-8a15-4e4700742055"
    static productID = "28dafee5-7c7f-48c2-8a15-4e4700742055"
    static productURL = `${this.storeURL}/buy/${this.productID}`
}
