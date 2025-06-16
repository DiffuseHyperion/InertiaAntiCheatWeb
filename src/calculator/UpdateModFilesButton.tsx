import type {ChangeEvent} from "react"

export default function UpdateModFilesButton({updateModFilesCallback}: {
    updateModFilesCallback: (event: ChangeEvent<HTMLInputElement>) => void
}) {
    return (
        <div className="w-full flex flex-col space-y-4 mt-8">
            <div className={"h-20 w-full relative bg-white rounded-2xl flex items-center justify-center"}>
                <p className={"m-4 absolute text-black text-center"}>Click to select mods / Drag mods
                    here!</p>
                <input className="w-full h-full opacity-0 z-10 cursor-pointer" type="file" multiple={true}
                       accept={"*,.jar"}
                       name="files"
                       onChange={updateModFilesCallback}/>
            </div>
        </div>
    )
}