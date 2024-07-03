
import { Sidebar } from "../../components/sidebar";

export default function Home() {
    return (
        <div className=" border-black stroke-border flex flex-row ">
            <Sidebar />
            <main className="border-white border w-full h-full my-14 mx-4 sm:mx-0 sm:my-16">
                <div className="">hello</div>
                <p>All bookmarks inside groups here</p>
            </main>
        </div>
    );
}
