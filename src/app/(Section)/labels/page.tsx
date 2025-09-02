
import BookmarkSidebar from "@/components/sidebar/bookmarkSidebar";
import DialogForm from "@/components/dialog-form";
import Navbar from "@/components/navBar";
import DialogLogin from "@/components/dialog-login-again";

export default function Home() {
    return (
        <div className=" border-black stroke-border flex flex-row ">
            <BookmarkSidebar />
            <main className="border-white border-0 px-2 w-full h-full my-14 mx-4 sm:mx-0 sm:my-16">
                <Navbar />
                <div className="">hello</div>
                <p>All Labels here</p>
                <DialogForm />
                <DialogLogin />
            </main>
        </div>

    );
}
