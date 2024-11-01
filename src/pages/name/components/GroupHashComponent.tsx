import {copyText} from "../../../index";
import React, {useEffect, useState} from "react";
import Mod from "./Mod";
import {md5} from "hash-wasm";

export default function GroupHashComponent({mods}: {mods: Mod[]}) {
    const [combinedHash, setcombinedHash] = useState<string>()

    useEffect(() => {
        let input: string = mods.filter((mod) => !mod.softWhitelist).map((mod) => mod.file.name).sort().join("|")
        md5(input).then((result) => setcombinedHash(result))
    }, [mods]);

    return (
        <div
            className="w-full h-24 border-white border-4 rounded-3xl p-3 pl-8 pr-8 flex flex-row items-center space-x-3">
            <h2 className="text-xl sm:text-2xl bold mr-4">Combined<br/>hash:</h2>
            <p onClick={() => copyText(combinedHash)} className="underline cursor-pointer truncate"
               title="Click me to copy!">{combinedHash ? combinedHash : "Waiting..."}</p>
        </div>
    )
}