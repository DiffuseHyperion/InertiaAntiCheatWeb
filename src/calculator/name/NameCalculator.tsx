import {type ChangeEvent, useState} from "react"
import NameModComponent from "./components/NameModComponent.tsx"
import NameGroupHashComponent from "./components/NameGroupHashComponent.tsx"
import Mod from "../../lib/Mod.ts"
import GenericCalculator from "../GenericCalculator.tsx"

export default function NameCalculator() {
    const [mods, setMods] = useState<Mod[]>([])

    function updateModFiles(event: ChangeEvent<HTMLInputElement>) {
        setMods(Array.from(event.currentTarget.files!).map((mod) => new Mod(mod)))
    }

    function updateModSoftWhitelist(targetMod: Mod) {
        setMods(mods.map((mod) => (mod === targetMod ? new Mod(mod.file, !mod.softWhitelist) : mod)))
    }

    function NameCalculatorInstructions() {
        return (
            <>
                <h2 className="text-2xl">If you are using the <span
                    className="underline">individual</span> validation
                    method:
                </h2>
                <ul className="list-disc ml-5">
                    <li className={"font-bold"}>You do not need this website.</li>
                    <li>Copy the filename of each mod into the respective lists.</li>
                    <li>Copy the hash into the respective lists.</li>
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
        <GenericCalculator instructions={<NameCalculatorInstructions/>} updateModFiles={updateModFiles}>
            <NameGroupHashComponent mods={mods}/>
            {mods.map((mod, index) => (
                <NameModComponent key={index} mod={mod} toggleFunction={updateModSoftWhitelist}/>
            ))}
        </GenericCalculator>
    )
}