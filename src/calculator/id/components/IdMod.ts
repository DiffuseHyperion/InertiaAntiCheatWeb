import {strFromU8, unzipSync} from "fflate"
import Mod from "../../../lib/Mod.ts"

export default class IdMod extends Mod {
    id: Promise<string | null>

    constructor(file: File, softWhitelist: boolean = false) {
        super(file, softWhitelist)
        this.id = this.getModId()
    }

    async getModId(): Promise<string | null> {
        const arrayBuffer = await this.file.arrayBuffer()
        const zippedData = new Uint8Array(arrayBuffer)
        const zipEntries = unzipSync(zippedData)

        const jsonEntry = zipEntries["fabric.mod.json"]
        if (!jsonEntry) {
            console.error("Could not find fabric.mod.json in " + this.file.name)
            return null
        }

        const jsonText = strFromU8(jsonEntry)
        const idMatch = jsonText.match(/"id"\s*:\s*"([^"]+)"/);
        if (idMatch) {
            return idMatch[1];
        } else {
            console.error("Could not find \"id\" field in " + this.file.name)
            return null
        }
    }
}