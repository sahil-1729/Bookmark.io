export const revalidate = 0
export const fetchCache = 'force-no-store'
export const dynamic = 'force-dynamic';

import BookmarkSidebar from "@/components/sidebar/bookmark-sidebar";
import DialogForm from "@/components/dialog-form";
import DeleteBookmarkBtn from "@/components/delBookmarkBtn";
import Navbar from "@/components/navBar";
import DialogLogin from "@/components/dialog-login-again";
import { Suspense } from "react";
import { fetchBookmark } from "@/types";
import GetBookmark from "@/server-actions/getBookmark";
import ToggleVisit from "@/components/toggleVisit";
import { Button } from "@/components/ui/button";
import DialogEditBookmark from "@/components/dialogEditBookmark";
import Link from "next/link";


export default async function Timeline() {

  var bookmarks: fetchBookmark[] | null = []
  bookmarks = await GetBookmark()

  // console.log('timeline called')

  return (    // <BookmarkProvider >
    <div className=" border-black stroke-border flex flex-row ">
      <Suspense fallback={<p>Loading...</p>}>
        <BookmarkSidebar />
      </Suspense>
      <main className="border-white border-0 px-2 w-full h-full my-14 mx-4 sm:mx-0 sm:my-16">
        <Navbar />

        {
          bookmarks.length > 0 ?
            bookmarks.map((val: fetchBookmark, key: number) => {
              const temp = val.link.substr(0, 100) + "...";
              val.link = val.link.length > 100 ? temp : val.link;
              return (
                <div key={val.id} className="bg-background p-4 border-primary border rounded-md flex flex-col gap-4 mx-4 mb-4 md:mb-8 ">
                  <div className="flex justify-between gap-4 sm:gap-8">
                    <a href={val.id} target="_blank" className="scroll-m-20 text-2xl font-semibold tracking-tight break-all lg:text-4xl">{val.metadata}</a>
                    <div key={val.id} className="flex flex-row gap-4 ">
                      <DialogEditBookmark bookmark={val} />
                      <DeleteBookmarkBtn bookmarkId={val.id} />
                    </div>
                  </div>
                  <a href={val.link} target="_blank" className="text-sm font-medium leading-none break-all">{val.link}</a>

                  <Link href={`/category/${val.categories}`}>
                    <Button key={val.id} size="sm" className="max-w-max border-lg text-primary-foreground border-primary">{val.categories}</Button>
                  </Link>
                  <div className="flex justify-between items-center">

                    <div className="flex flex-wrap gap-4">
                      {val.labels ? val.labels.map((value, key) =>
                        <div key={key} className="border-2 bg-secondary text-secondary-foreground px-2 py-1 max-w-max rounded-lg text-xs sm:text-base">
                          {value.text}
                        </div>
                      ) : ""}
                    </div>
                    <ToggleVisit bookmarkId={val.id} visited={val.visited ? val.visited : false} />
                  </div>
                </div>
              )
            })
            :
            <div className="bg-background p-4 border-primary border rounded-md flex flex-col gap-4 mx-4 mb-4 md:mb-8 ">
              <h5 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
                Looks like nothing here ...
              </h5>
            </div>
        }

        <DialogForm />
      </main>
      <DialogLogin />
    </div>
    // </BookmarkProvider>
  );
}

