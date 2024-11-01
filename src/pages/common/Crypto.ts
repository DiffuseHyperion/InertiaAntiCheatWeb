import {md5, sha1, sha256} from "hash-wasm";

export async function getFileMD5(file: File): Promise<string> {
    const arrayBuffer = await file.arrayBuffer();
    return await md5(new Uint8Array(arrayBuffer));
}

export async function getFileSHA1(file: File): Promise<string> {
    const arrayBuffer = await file.arrayBuffer();
    return await sha1(new Uint8Array(arrayBuffer));
}

export async function getFileSHA256(file: File): Promise<string> {
    const arrayBuffer = await file.arrayBuffer();
    return await sha256(new Uint8Array(arrayBuffer));
}