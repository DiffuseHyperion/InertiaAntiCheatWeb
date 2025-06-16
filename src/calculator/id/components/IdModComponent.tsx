import IdMod from "./IdMod.ts"
import {useEffect, useState} from "react"
import {copyText} from "../../../lib/Utils.ts"

export default function IdModComponent({mod, toggleFunction}: {
    mod: IdMod,
    toggleFunction: (targetMod: IdMod) => void
}) {
    const [id, setID] = useState<string>()

    useEffect(() => {
        mod.id.then((result) => {
            setID(result)
        })
    }, [mod, id])

    return (
        <div className="w-full h-24 bg-white text-black rounded-3xl p-3 px-3 md:px-8 grid grid-cols-6 grid-rows-1">
            <div className="col-span-4 md:col-span-5 w-full flex flex-row space-x-3 justify-start items-center">
                <h1 className="text-lg md:text-2xl font-bold">{mod.file.name}</h1>
                <h2 className="hidden lg:block lg:text-xl">Mod ID:</h2>
                <p onClick={() => copyText(id)} className="underline cursor-pointer truncate"
                   title="Click me to copy!">{id ? id : "Calculating..."}</p>
            </div>
            <div className="col-span-2 md:col-span-1 w-full flex flex-row space-x-3 justify-end items-center">
                <p className="text-center">Soft-whitelist?</p>
                <input className={"p-3"} onChange={() => toggleFunction(mod)} type="checkbox"/>
            </div>
        </div>
    )
}