import {useEffect, useState} from "react";
import {Algorithm} from "./Algorithm";
import {md5, sha1, sha256} from "hash-wasm";
import Mod from "./Mod";
import {copyText} from "./index";

interface Props {
    mod: Mod
}

export default function ModComponent(props: Props) {
    const [checksum, setChecksum] = useState<string>()

    function updateChecksum(checksum: string) {
        setChecksum(checksum)
        props.mod.checksum = checksum
    }

    useEffect(() => {
        let fileReader: FileReader = new FileReader()
        fileReader.onload = () => {
            let data= fileReader.result!

            if (!(data instanceof ArrayBuffer)) {
                if (props.mod.algorithm === Algorithm.MD5) {
                    md5(data).then((result) => updateChecksum(result))
                } else if (props.mod.algorithm === Algorithm.SHA1) {
                    sha1(data).then((result) => updateChecksum(result))
                } else if (props.mod.algorithm === Algorithm.SHA256) {
                    sha256(data).then((result) => updateChecksum(result))
                }
            }
        }
        fileReader.readAsBinaryString(props.mod.file)
    }, [props.mod.file, props.mod.algorithm]);

    return (
        <div className="w-full h-24 bg-white text-black rounded-3xl p-3 pl-8 pr-8 flex flex-row items-center justify-between">
            <div className="flex flex-row space-x-3 items-center">
                <h1 className="text-2xl font-bold">{props.mod.file.name}</h1>
                <h2 className="text-xl">Checksum:</h2>
                <p onClick={() => copyText(checksum)} className="underline cursor-pointer" title="Click me to copy!">{checksum ? checksum : "Calculating..."}</p>
            </div>
            <div className="flex flex-row space-x-3 justify-center items-center">
            <p>Soft-whitelist?</p>
                <input className={"p-3"} onChange={() => props.mod.softWhitelist = !props.mod.softWhitelist} type="checkbox"/>
            </div>
        </div>
    )
}