import {useEffect, useState} from "react"
import IdMod from "./IdMod.ts"
import {md5} from "hash-wasm"
import GroupHashComponent from "../../GroupHashComponent.tsx"

export default function IdGroupHashComponent({mods}: { mods: IdMod[] }) {
    const [combinedHash, setCombinedHash] = useState<string>()


    useEffect(() => {
        (async () => {
            const hashes = await Promise.all(mods.filter((mod) => !mod.softWhitelist).map((mod) => mod.id))
            setCombinedHash(await md5(hashes.sort().join("|")))
        })()
    }, [mods])

    return (
        <GroupHashComponent combinedHash={combinedHash}/>
    )
}