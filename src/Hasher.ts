import {Algorithm} from "./Algorithm";
import {IHasher} from "hash-wasm/dist/lib/WASMInterface";
import {createMD5, createSHA1, createSHA256} from "hash-wasm";

const chunkSize = 64 * 1024 * 1024;
let AsyncLock = require('async-lock');
let lock = new AsyncLock();

export class Hasher {
    hasher: IHasher | undefined;
    algorithm: Algorithm

    constructor(algorithm: Algorithm) {
        this.algorithm = algorithm;
    }

    async hashFile(file: File): Promise<string> {
        return lock.acquire("hasher", async () => {
            console.log("Hashing " + file.name)
            if (this.hasher === undefined) {
                switch (this.algorithm) {
                    case Algorithm.MD5:
                        this.hasher = await createMD5()
                        break;
                    case Algorithm.SHA1:
                        this.hasher = await createSHA1()
                        break;
                    case Algorithm.SHA256:
                        this.hasher = await createSHA256()
                        break;
                }
            } else {
                this.hasher.init()
            }

            function hashChunk(chunk: Blob, hasher: IHasher, fileReader: FileReader): Promise<void> {
                return new Promise((resolve) => {
                    fileReader.onload = (e) => {
                        const view = new Uint8Array(e.target!.result as ArrayBuffer);
                        hasher.update(view);
                        resolve();
                    };

                    fileReader.readAsArrayBuffer(chunk);
                });
            }

            const fileReader: FileReader = new FileReader();
            const chunkNumber = Math.floor(file.size / chunkSize);

            for (let i = 0; i <= chunkNumber; i++) {
                let chunk: Blob = file.slice(
                    chunkSize * i,
                    Math.min(chunkSize * (i + 1), file.size)
                );
                await hashChunk(chunk, this.hasher, fileReader);
            }

            return Promise.resolve(this.hasher.digest())
        });
    }
}




