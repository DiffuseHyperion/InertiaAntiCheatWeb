import DataMod from "./DataMod.ts"
import {useEffect, useState} from "react"
import {copyText} from "../../../lib/Utils.ts"


export default function ModComponent({mod, toggleFunction}: {
    mod: DataMod,
    toggleFunction: (targetMod: DataMod) => void
}) {
    const [hash, sethash] = useState<string>()

    useEffect(() => {
        mod.hash.then((result) => {
            sethash(result)
        })
    }, [mod, hash])
    return (
        <div className="w-full h-24 bg-white text-black rounded-3xl p-3 px-3 md:px-8 grid grid-cols-6 grid-rows-1">
            <div className="col-span-4 md:col-span-5 w-full flex flex-row space-x-3 justify-start items-center">
                <h1 className="text-lg md:text-2xl font-bold">{mod.file.name}</h1>
                <h2 className="hidden lg:block lg:text-xl">Hash:</h2>
                <p onClick={() => copyText(hash)} className="underline cursor-pointer truncate"
                   title="Click me to copy!">{hash ? hash : "Calculating..."}</p>
            </div>
            <div className="col-span-2 md:col-span-1 w-full flex flex-row space-x-3 justify-end items-center">
                <p className="text-center">Soft-whitelist?</p>
                <input className={"p-3"} onChange={() => toggleFunction(mod)} type="checkbox"/>
            </div>
        </div>
    )
}