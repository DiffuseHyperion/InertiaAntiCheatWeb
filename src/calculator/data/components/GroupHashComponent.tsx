import {useEffect, useState} from "react"
import DataMod from "./DataMod.ts"
import {md5} from "hash-wasm"
import {copyText} from "../../../lib/Utils.ts"

export default function GroupHashComponent({mods}: { mods: DataMod[] }) {
    const [combinedHash, setcombinedHash] = useState<string>()

    useEffect(() => {
        (async () => {
            const hashes = await Promise.all(mods.filter((mod) => !mod.softWhitelist).map((mod) => mod.hash))
            setcombinedHash(await md5(hashes.sort().join("|")))
        })()
    }, [mods])

    return (
        <div
            className="w-full h-24 border-white border-4 rounded-3xl p-3 pl-8 pr-8 flex flex-row items-center space-x-3">
            <h2 className="text-xl sm:text-2xl bold mr-4">Combined<br/>hash:</h2>
            <p onClick={() => copyText(combinedHash)} className="underline cursor-pointer truncate"
               title="Click me to copy!">{combinedHash ? combinedHash : "Waiting..."}</p>
        </div>
    )
}