export class EmailObfuscated {
    // base64 encoded (2x)
    static feedback = "YldGcGJFQmhibVJ5YVc0dWMyOW1kSGRoY21VPQ=="
    static help = "YldGcGJFQmhibVJ5YVc0dWMyOW1kSGRoY21VPQ=="
    static info = "YldGcGJFQmhibVJ5YVc0dWMyOW1kSGRoY21VPQ=="
}

export class Checkout {
    static storeURL = "https://exifoo.lemonsqueezy.com"
    static checkoutID = process.env.LEMSQZY_CHECKOUT_ID
    static checkoutURL = `${this.storeURL}/buy/${this.checkoutID}`
}

export class GeneralLinks {
    static buyMeACoffeeURL = "https://buymeacoffee.com/andrin.software"
}
