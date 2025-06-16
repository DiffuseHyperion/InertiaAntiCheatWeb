export default class Mod {
    file: File
    softWhitelist: boolean

    constructor(file: File, softWhitelist: boolean = false) {
        this.file = file
        this.softWhitelist = softWhitelist;
    }
}