import Mod from "./Mod";
import {copyText} from "./index";
import {useEffect, useState} from "react";
import {Algorithm} from "./Algorithm";

interface Props {
    mod: Mod
}

export default function ModComponent(props: Props) {
    const [checksum, setChecksum] = useState<string | undefined>()
    useEffect(() => {
        switch (props.mod.algorithm) {
            case Algorithm.MD5:
                Mod.hashers[0].hashFile(props.mod.file).then((result) => {
                    props.mod.checksum = result
                    setChecksum(props.mod.checksum)
                    console.log("Done hashing " + props.mod.file.name)
                    console.log("Hash for " + props.mod.file.name + ": " + result)
                })
                break;
            case Algorithm.SHA1:
                Mod.hashers[1].hashFile(props.mod.file).then((result) => {
                    props.mod.checksum = result
                    setChecksum(props.mod.checksum)
                    console.log("Done hashing " + props.mod.file.name)
                    console.log("Hash for " + props.mod.file.name + ": " + result)
                })
                break;
            case Algorithm.SHA256:
                Mod.hashers[2].hashFile(props.mod.file).then((result) => {
                    props.mod.checksum = result
                    setChecksum(props.mod.checksum)
                    console.log("Done hashing " + props.mod.file.name)
                    console.log("Hash for " + props.mod.file.name + ": " + result)
                })
                break;
        }
    })

    return (
        <div className="w-full h-24 bg-white text-black rounded-3xl p-3 px-3 md:px-8 grid grid-cols-6 grid-rows-1">
            <div className="col-span-4 md:col-span-5 w-full flex flex-row space-x-3 justify-start items-center">
                <h1 className="text-lg md:text-2xl font-bold">{props.mod.file.name}</h1>
                <h2 className="hidden lg:block lg:text-xl">Checksum:</h2>
                <p onClick={() => copyText(checksum)} className="underline cursor-pointer truncate" title="Click me to copy!">{ checksum ? checksum : "Calculating..."}</p>
            </div>
            <div className="col-span-2 md:col-span-1 w-full flex flex-row space-x-3 justify-end items-center">
                <p className="text-center">Soft-whitelist?</p>
                <input className={"p-3"} onChange={() => props.mod.softWhitelist = !props.mod.softWhitelist} type="checkbox"/>
            </div>
        </div>
    )
}