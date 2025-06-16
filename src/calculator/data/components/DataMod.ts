import Mod from "../../../lib/Mod.ts"
import {md5, sha1, sha256} from "hash-wasm"

export default class DataMod extends Mod {
    algorithm: Algorithm
    hash: Promise<string>

    constructor(file: File, algorithm: Algorithm, softWhitelist: boolean = false) {
        super(file, softWhitelist)

        this.algorithm = algorithm
        this.softWhitelist = softWhitelist

        switch (algorithm) {
            case "MD5":
                this.hash = getFileMD5(this.file)
                break
            case "SHA1":
                this.hash = getFileSHA1(this.file)
                break
            case "SHA256":
                this.hash = getFileSHA256(this.file)
                break
        }
    }
}

async function getFileMD5(file: File): Promise<string> {
    const arrayBuffer = await file.arrayBuffer()
    return await md5(new Uint8Array(arrayBuffer))
}

async function getFileSHA1(file: File): Promise<string> {
    const arrayBuffer = await file.arrayBuffer()
    return await sha1(new Uint8Array(arrayBuffer))
}

async function getFileSHA256(file: File): Promise<string> {
    const arrayBuffer = await file.arrayBuffer()
    return await sha256(new Uint8Array(arrayBuffer))
}

export type Algorithm = "MD5" | "SHA1" | "SHA256"