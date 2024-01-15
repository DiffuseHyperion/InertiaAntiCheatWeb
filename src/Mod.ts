import {Algorithm} from "./Algorithm";
import {Hasher} from "./Hasher";

export default class Mod {
    static hashers: Hasher[] = [new Hasher(Algorithm.MD5), new Hasher(Algorithm.SHA1), new Hasher(Algorithm.SHA256)]

    file: File
    algorithm: Algorithm
    softWhitelist: boolean = false
    checksum: string | undefined

    constructor(file: File, algorithm: Algorithm) {
        this.file = file
        this.algorithm = algorithm;
    }
}