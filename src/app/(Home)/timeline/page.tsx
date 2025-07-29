
import BookmarkSidebar from "@/components/sidebar/bookmark-sidebar";
import DialogForm from "@/components/dialog-form";
import Card from "@/components/card";
import Navbar from "@/components/nav-bar";
import DialogLogin from "@/components/dialog-login-again";
import { Suspense } from "react";
import { fetchBookmark } from "@/types";
import getBookmark from "@/server-actions/getBookmark";


export default async function Timeline({ searchParams }: { searchParams: { message: string } }) {

  var bookmarks: fetchBookmark[] | null = []
  bookmarks = await getBookmark()

  return (    // <BookmarkProvider >
    <div className=" border-black stroke-border flex flex-row ">
      <Suspense fallback={<p>Loading...</p>}>
        <BookmarkSidebar />
      </Suspense>
      <main className="border-white border-0 px-2 w-full h-full my-14 mx-4 sm:mx-0 sm:my-16">
        <Navbar />

        <Card bookmarks={bookmarks} />
        <DialogForm />
      </main>
      <DialogLogin />
    </div>
    // </BookmarkProvider>
  );
}

