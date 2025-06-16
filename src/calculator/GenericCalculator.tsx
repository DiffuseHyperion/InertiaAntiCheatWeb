import UpdateModFilesButton from "./UpdateModFilesButton.tsx"
import {Link} from "react-router-dom"
import * as React from "react"
import {type ChangeEvent} from "react"

export default function GenericCalculator({instructions, updateModFiles, additionalSelects, children}: {
    instructions: React.ReactNode
    updateModFiles: (event: ChangeEvent<HTMLInputElement>) => void
    additionalSelects: React.ReactNode | undefined
    children: React.ReactNode
}) {
    return (
        <div className="flex flex-col xl:grid xl:grid-cols-5 xl:grid-rows-1 min-h-screen">
            <div className={"xl:col-span-1 flex flex-col items-start justify-between p-8 max-h-screen gap-y-8"}>
                <div className="flex flex-col items-center justify-start w-full">
                    <div className="w-full">
                        <h1 className="text-4xl font-bold pb-3">Instructions</h1>
                        {instructions}
                    </div>
                    <div className="w-full flex flex-col space-y-4 mt-8">
                        <UpdateModFilesButton updateModFilesCallback={updateModFiles}/>
                        {additionalSelects}
                    </div>
                </div>
                <Link to={"/"} className={"font-bold hover:underline text-xl text-center xl:text-left w-full"}>Go
                    Back</Link>
            </div>
            <div
                className="xl:col-span-4 border-t-4 xl:border-l-4 xl:border-t-0 border-white flex flex-col items-center space-y-5 p-8">
                {children}
            </div>
        </div>
    )
}