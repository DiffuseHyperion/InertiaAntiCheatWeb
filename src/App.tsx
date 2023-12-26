import React, {useState} from 'react';
import ModComponent from "./ModComponent";
import {Algorithm} from "./Algorithm";
import Mod from "./Mod";
import {md5} from "hash-wasm";
import {copyText} from "./index";


function App() {
  const [mods, setMods] = useState<Mod[]>([])
  const [combinedChecksum, setCombinedChecksum] = useState<string>()

  function updateMods() {
    let res: Mod[] = []
    let rawFiles: File[] = Array.from((document.getElementById("files") as HTMLInputElement).files!)
    let algorithm: Algorithm = parseInt((document.getElementById("algorithm") as HTMLSelectElement).value!) as Algorithm
    rawFiles.forEach((file) => {
      res.push(new Mod(file, algorithm))
    })
    setMods(res)
  }

  function calculateGroupChecksum() {
    let checksums: string[] = []
    mods.forEach((mod) => {
      if (!mod.softWhitelist) {
        if (mod.checksum === undefined) {
          alert(mod.file.name + " is still processing! Try again later.")
          return
        }
        checksums.push(mod.checksum)
      }
    })
     md5(checksums.join()).then((result) => {
       setCombinedChecksum(result)
     })
  }

  return (
      <main className="bg-black text-white min-h-screen grid grid-cols-5 grid-rows-1 p-12">
        <div className="col-span-1 flex flex-col pr-4 justify-between">
          <div>
            <h1 className="text-4xl font-bold pb-3">Instructions</h1>
            <h2 className="text-2xl">If you are using the <span className="underline">individual</span> method:
            </h2>
            <ul className="list-disc ml-5 pb-2">
              <li>Select all mods you want blacklisted or whitelisted.</li>
              <li>Select algorithm that you are using.</li>
              <li>Copy the checksum into the respective lists.</li>
            </ul>
            <h2 className="text-2xl">If you are using the <span className="underline">group</span> method:</h2>
            <ul className="list-disc ml-5">
              <li>Select all mods that are part of your modpack, and mods you want to soft-whitelist.</li>
              <li>Select mods that should be soft-whitelisted.</li>
              <li>Select algorithm that you are using.</li>
              <li>Press submit!</li>
            </ul>
            <p className="mt-7 italic">ui not too responsive yet, will improve it later</p>
          </div>
          <div>
            <div className="w-full flex flex-col space-y-4">
              <input className="w-fit" type="file" id="files" name="files"
                     onChange={() => updateMods()} multiple/>
              <select className="text-black rounded-2xl h-10 pl-4 pr-10" id="algorithm" name="algorithm"
                      onChange={() => updateMods()}>
                <option value="0">MD5</option>
                <option value="1">SHA1</option>
                <option value="2">SHA256</option>
              </select>
              <input onClick={() => calculateGroupChecksum()} className="bg-white text-black rounded-2xl h-10 cursor-pointer" type="submit"/>
            </div>
          </div>
        </div>
        <div className="col-span-4 border-l-4 border-white pl-4 flex flex-col space-y-5">
          <div
              className="w-full h-24 border-white border-4 rounded-3xl p-3 pl-8 pr-8 flex flex-row items-center space-x-3">
            <h2 className="text-2xl bold">Combined checksum:</h2>
            <p onClick={() => copyText(combinedChecksum)} className="underline cursor-pointer"
               title="Click me to copy!">{combinedChecksum ? combinedChecksum : "Waiting..."}</p>
          </div>
          {mods.map((mod, index) => (
              <ModComponent key={index} mod={mod}/>
          ))}
        </div>
      </main>
  )
}

export default App;
