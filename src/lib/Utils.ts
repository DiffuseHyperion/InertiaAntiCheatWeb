export function copyText(text: string | undefined) {
    if (text !== undefined) {
        navigator.clipboard.writeText(text).then(() => {
            alert("Copied to clipboard!")
        }).catch(() => {
            alert("Could not copy to clipboard. Did you give permissions to access your clipboard?")
        })
    } else {
        alert("Checksum is still calculating, please try again later!")
    }
}