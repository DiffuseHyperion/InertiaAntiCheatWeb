import {Algorithm} from "../../common/Algorithm";
import {getFileMD5, getFileSHA1, getFileSHA256} from "../../common/Crypto";
export default class Mod {

    file: File
    algorithm: Algorithm
    softWhitelist: boolean
    hash: Promise<string>

    constructor(file: File, algorithm: Algorithm, softWhitelist: boolean = false) {
        this.file = file
        this.algorithm = algorithm;
        this.softWhitelist = softWhitelist;

        switch (algorithm) {
            case Algorithm.MD5:
                this.hash = getFileMD5(this.file)
                break;
            case Algorithm.SHA1:
                this.hash = getFileSHA1(this.file)
                break;
            case Algorithm.SHA256:
                this.hash = getFileSHA256(this.file)
                break
        }

    }
}