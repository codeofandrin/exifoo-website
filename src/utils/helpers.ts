export function extractMarkdownMetaData(text: string): Array<any> {
    const metaData = {} as any

    const metaRegExp = RegExp(/^---[\r\n](((?!---).|[\r\n])*)[\r\n]---$/m)
    // get metadata
    const rawMetaData = metaRegExp.exec(text)

    let keyValues

    if (rawMetaData!) {
        // rawMeta[1] are the stuff between "---"
        keyValues = rawMetaData[1].split("\r\n")

        // which returns a list of key values: ["key1: value", "key2: value"]
        keyValues.forEach((keyValue) => {
            // split each keyValue to keys and values
            let [key, value] = keyValue.split(":")
            key = key.trim()
            metaData[key] = value.trim()
        })
    }
    return [rawMetaData, metaData]
}
