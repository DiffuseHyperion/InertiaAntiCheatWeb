import {type ChangeEvent, useState} from "react"
import ModComponent from "./components/ModComponent.tsx"
import type {Algorithm} from "./components/DataMod.ts"
import DataMod from "./components/DataMod.ts"
import GroupHashComponent from "./components/GroupHashComponent.tsx"
import GenericCalculator from "../GenericCalculator.tsx"

export default function DataCalculator() {
    const [mods, setMods] = useState<DataMod[]>([])
    const [algorithm, setAlgorithm] = useState<Algorithm>("MD5")

    function updateModFiles(event: ChangeEvent<HTMLInputElement>) {
        setMods(Array.from(event.currentTarget.files!).map((mod) => new DataMod(mod, algorithm)))
    }

    function updateAlgorithm(event: ChangeEvent<HTMLSelectElement>) {
        const newAlgorithm: Algorithm = event.currentTarget.value! as Algorithm
        setAlgorithm(newAlgorithm)
        setMods(mods.map((mod) => new DataMod(mod.file, newAlgorithm)))
    }

    function updateModSoftWhitelist(targetMod: DataMod) {
        setMods(mods.map((mod) => (mod === targetMod ? new DataMod(mod.file, mod.algorithm, !mod.softWhitelist) : mod)))
    }

    function SelectAlgorithmComponent() {
        return (
            <div className="bg-white rounded-2xl h-10 px-4 py-1">
                <select className="text-black w-full h-full" id="algorithm" name="algorithm"
                        onChange={(event) => updateAlgorithm(event)}>
                    <option value="MD5">MD5</option>
                    <option value="SHA1">SHA1</option>
                    <option value="SHA256">SHA256</option>
                </select>
            </div>
        )
    }

    function DataCalculatorInstructions() {
        return (
            <>
                <h2 className="text-2xl">If you are using the <span
                    className="underline">individual</span> validation
                    method:
                </h2>
                <ul className="list-disc ml-5">
                    <li>Select all mods you want blacklisted or whitelisted.</li>
                    <li>Select algorithm that you are using.</li>
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
                    <li>Select algorithm that you are using.</li>
                    <li>Copy the group hash into the config file.</li>
                </ul>
            </>
        )
    }

    return (
        <GenericCalculator instructions={<DataCalculatorInstructions/>} updateModFiles={updateModFiles}
                           additionalSelects={<SelectAlgorithmComponent/>}>
            <GroupHashComponent mods={mods}/>
            {mods.map((mod, index) => (
                <ModComponent key={index} mod={mod} toggleFunction={updateModSoftWhitelist}/>
            ))}
        </GenericCalculator>
    )
}