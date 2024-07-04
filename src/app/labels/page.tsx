"use client"

import { BookmarkProvider } from "@/context/app-context";
import { Sidebar } from "../../components/sidebar";
import { ModeToggle } from "@/components/theme-toggle";

export default function Home() {
    return (
        <BookmarkProvider>
            <div className=" border-black stroke-border flex flex-row ">
                <Sidebar />
                <main className="border-white border-0 px-2 w-full h-full my-14 mx-4 sm:mx-0 sm:my-16">
                    <div className="flex justify-end mx-4 mb-4 ">
                        <ModeToggle />
                    </div>
                    {/* <> */}
                    <div className="">hello</div>
                    <p>All Labels here</p>
                    {/* </> */}
                </main>
            </div>
        </BookmarkProvider>

    );
}
