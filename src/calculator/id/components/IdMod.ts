import {strFromU8, unzipSync} from "fflate"
import Mod from "../../../lib/Mod.ts"

export default class IdMod extends Mod {
    id: Promise<string>

    constructor(file: File, softWhitelist: boolean = false) {
        super(file, softWhitelist)
        this.id = this.getModId()
    }

    async getModId(): Promise<string> {
        const arrayBuffer = await this.file.arrayBuffer()

        const zippedData = new Uint8Array(arrayBuffer)
        const zipEntries = unzipSync(zippedData)

        const jsonEntry = zipEntries["fabric.mod.json"]
        if (!jsonEntry) {
            return ""
        }

        const jsonText = strFromU8(jsonEntry)
        const jsonData = JSON.parse(jsonText)
        return jsonData.id ?? ""
    }
}