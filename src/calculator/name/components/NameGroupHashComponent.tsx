import {useEffect, useState} from "react"
import {md5} from "hash-wasm"
import GroupHashComponent from "../../GroupHashComponent.tsx"
import type Mod from "../../../lib/Mod.ts"

export default function NameGroupHashComponent({mods}: { mods: Mod[] }) {
    const [combinedHash, setCombinedHash] = useState<string>()

    useEffect(() => {
        const input: string = mods
            .filter((mod) => !mod.softWhitelist)
            .map((mod) => mod.file.name)
            .sort()
            .join("|")
        md5(input).then((result) => setCombinedHash(result))
    }, [mods])

    return (
        <GroupHashComponent combinedHash={combinedHash}/>
    )
}