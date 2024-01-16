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
      if (file.type !== "application/java-archive") {
        alert(file.name + " is not a .jar file!")
      } else {
        res.push(new Mod(file, algorithm))
      }
    })
    setMods(res)
  }

  function calculateGroupChecksum() {
    let checksums: string[] = []
    let processing: boolean = false
    mods.forEach((mod) => {
      if (!mod.softWhitelist && !processing) {
        if (mod.checksum === undefined) {
          processing = true;
        } else {
          checksums.push(mod.checksum)
        }
      }
    })
    if (processing) {
      alert("Not all mods have finished processing! Try again later.")
      return
    }
    let sortedChecksums: string[] = checksums.sort()
     md5(sortedChecksums.join("|")).then((result) => {
       setCombinedChecksum(result)
     })
  }

  return (
      <main className="bg-black text-white min-h-screen flex flex-col xl:grid xl:grid-cols-5 xl:grid-rows-1 p-12">
        <div className="xl:col-span-1 flex flex-col pb-4 xl:pr-4 xl:pb-0 items-center justify-start">
          <div className="w-full">
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
          </div>
          <div className="w-full flex flex-col space-y-4 mt-8">
            <div className={"h-20 w-full relative bg-white rounded-2xl flex items-center justify-center"}>
              <p className={"absolute text-black text-center"}>Click to select mods / Drag mods here!</p>
              <input className="w-full h-full opacity-0 z-10" type="file" multiple={true} accept={"*,.jar"}
                     id="files" name="files"
                     onChange={() => updateMods()}/>
            </div>
            <select className="text-black rounded-2xl h-10 pl-4 pr-10" id="algorithm" name="algorithm"
                    onChange={() => updateMods()}>
              <option value="0">MD5</option>
              <option value="1">SHA1</option>
              <option value="2">SHA256</option>
            </select>
            <input onClick={() => calculateGroupChecksum()}
                   className="bg-white text-black rounded-2xl h-10 cursor-pointer" type="submit"/>
          </div>
        </div>
        <div className="xl:col-span-4 border-t-4 xl:border-l-4 xl:border-t-0 border-white pt-4 xl:pl-4 xl:pt-0 flex flex-col space-y-5">
          <div
              className="w-full h-24 border-white border-4 rounded-3xl p-3 pl-8 pr-8 flex flex-row items-center space-x-3">
            <h2 className="text-xl sm:text-2xl bold mr-4">Combined<br/>checksum:</h2>
            <p onClick={() => copyText(combinedChecksum)} className="underline cursor-pointer truncate"
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
