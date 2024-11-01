import React, {ChangeEvent, useState} from 'react';
import {Link} from "react-router-dom";
import Mod from "./components/Mod";
import ModComponent from "./components/ModComponent";
import GroupHashComponent from "./components/GroupHashComponent";

export default function Name() {
    const [mods, setMods] = useState<Mod[]>([])

    function updateModFiles(event: ChangeEvent<HTMLInputElement>) {
        setMods(Array.from(event.currentTarget.files!).map((mod) => new Mod(mod)))
    }

    function updateModSoftWhitelist(targetMod: Mod) {
        setMods(mods.map((mod) => (mod === targetMod ? new Mod(mod.file, !mod.softWhitelist): mod)))
    }

    return (
        <div className="flex flex-col xl:grid xl:grid-cols-5 xl:grid-rows-1 min-h-screen">
            <div className={"xl:col-span-1 flex flex-col items-start justify-between p-8 max-h-screen gap-y-8"}>
                <div className="flex flex-col items-center justify-start w-full">
                    <div className="w-full">
                        <h1 className="text-4xl font-bold pb-3">Instructions</h1>
                        <h2 className="text-2xl">If you are using the <span className="underline">individual</span> validation
                            method:
                        </h2>
                        <ul className="list-disc ml-5 pb-2">
                            <li>Select all mods you want blacklisted or whitelisted.</li>
                            <li>Select algorithm that you are using.</li>
                            <li>Copy the checksum into the respective lists.</li>
                        </ul>
                        <h2 className="text-2xl">If you are using the <span className="underline">group</span> validation
                            method:
                        </h2>
                        <ul className="list-disc ml-5">
                            <li>Select all mods that are part of your modpack, and mods you want to soft-whitelist.</li>
                            <li>Select mods that should be soft-whitelisted.</li>
                            <li>Select algorithm that you are using.</li>
                        </ul>
                    </div>
                    <div className="w-full flex flex-col space-y-4 mt-8">
                        <div className={"h-20 w-full relative bg-white rounded-2xl flex items-center justify-center"}>
                            <p className={"m-4 absolute text-black text-center"}>Click to select mods / Drag mods here!</p>
                            <input className="w-full h-full opacity-0 z-10 cursor-pointer" type="file" multiple={true}
                                   accept={"*,.jar"}
                                   name="files"
                                   onChange={(event) => updateModFiles(event)}/>
                        </div>
                    </div>
                </div>
                <Link to={"/"} className={"font-bold hover:underline text-xl text-center xl:text-left w-full"}>Go
                    Back</Link>
            </div>
            <div className="xl:col-span-4 border-t-4 xl:border-l-4 xl:border-t-0 border-white flex flex-col items-center space-y-5 p-8">
                <GroupHashComponent mods={mods}/>
                {mods.map((mod, index) => (
                    <ModComponent key={index} mod={mod} toggleFunction={updateModSoftWhitelist}/>
                ))}
            </div>
        </div>
    )
}
