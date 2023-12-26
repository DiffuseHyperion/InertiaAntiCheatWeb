import {Algorithm} from "./Algorithm";

export default class Mod {
    file: File
    algorithm: Algorithm
    softWhitelist: boolean = false
    checksum: string | undefined

    constructor(file: File, algorithm: Algorithm) {
        this.file = file
        this.algorithm = algorithm;
    }
}