import {useEffect, useState} from "react"
import IdMod from "./IdMod.ts"
import {md5} from "hash-wasm"
import GroupHashComponent from "../../GroupHashComponent.tsx"

export default function IdGroupHashComponent({mods}: { mods: IdMod[] }) {
    const [combinedHash, setCombinedHash] = useState<string>()

    useEffect(() => {
        const input: string = mods
            .filter((mod) => !mod.softWhitelist)
            .map((mod) => mod.id)
            .sort()
            .join("|")
        md5(input).then((result) => setCombinedHash(result))
    }, [mods])

    return (
        <GroupHashComponent combinedHash={combinedHash}/>
    )
}