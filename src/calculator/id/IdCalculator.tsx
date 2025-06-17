import {type ChangeEvent, useState} from "react"
import IdModComponent from "./components/IdModComponent.tsx"
import GenericCalculator from "../GenericCalculator.tsx"
import IdGroupHashComponent from "./components/IdGroupHashComponent.tsx"
import IdMod from "./components/IdMod.ts"

export default function IdCalculator() {
    const [mods, setMods] = useState<IdMod[]>([])

    function updateModFiles(event: ChangeEvent<HTMLInputElement>) {
        setMods(Array.from(event.currentTarget.files!).map((mod) => new IdMod(mod)))
    }

    function updateModSoftWhitelist(targetMod: IdMod) {
        setMods(mods.map((mod) => (mod === targetMod ? new IdMod(mod.file, !mod.softWhitelist) : mod)))
    }

    function IdCalculatorInstructions() {
        return (
            <>
                <h2 className="text-2xl">If you are using the <span
                    className="underline">individual</span> validation
                    method:
                </h2>
                <ul className="list-disc ml-5">
                    <li>Select all mods you want blacklisted or whitelisted.</li>
                    <li>Copy the mod ID into the respective lists.</li>
                </ul>
                <br/>
                <h2 className="text-2xl">If you are using the <span
                    className="underline">group</span> validation
                    method:
                </h2>
                <ul className="list-disc ml-5">
                    <li>Select all mods that are part of your modpack, and mods you want to soft-whitelist.</li>
                    <li>Select mods that should be soft-whitelisted.</li>
                    <li>Copy the group hash into the config file.</li>
                    <li>Copy all soft-whitelisted mods into the config file.</li>
                </ul>
            </>
        )
    }

    return (
        <GenericCalculator instructions={<IdCalculatorInstructions/>} updateModFiles={updateModFiles}>
            <IdGroupHashComponent mods={mods}/>
            {mods.map((mod, index) => (
                <IdModComponent key={index} mod={mod} toggleFunction={updateModSoftWhitelist}/>
            ))}
        </GenericCalculator>
    )
}
