
import DialogForm from "@/components/dialog-form";
import BookmarkSidebar from "@/components/sidebar/bookmark-sidebar";
import Navbar from "@/components/navBar";
import DialogLogin from "@/components/dialog-login-again";
import DeleteBookmarkBtn from "@/components/delBookmarkBtn";
import DialogEditBookmark from "@/components/dialogEditBookmark";
import ToggleVisit from "@/components/toggleVisit";
import { Button } from "@/components/ui/button";
import GetBookmark from "@/server-actions/getBookmark";
import { fetchBookmark } from "@/types";
import { Folder } from "lucide-react";
import { redirect } from "next/navigation";
import Link from "next/link";

// export async function generateStaticParams() {
//     return [{ "id": 1 }]
// }

export default async function Category({
    params,
}: {
    params: Promise<{ slug: string }>
}) {
    const { slug } = await params
    const decodedSlug = decodeURIComponent(slug);

    var bookmarks: fetchBookmark[] | null = []
    const response = await GetBookmark()
    bookmarks = response.filter((val) => {
        // console.log(`|${val.categories}| |${decodedSlug}|`)
        return (val.categories === decodedSlug)
    }
    )

    if (bookmarks.length <= 0) {
        redirect('/timeline')
    }

    return (
        <div className=" border-black stroke-border flex flex-row ">
            <BookmarkSidebar />
            <main className="border-white border-0 px-2 w-full h-full my-14 mx-4 sm:mx-0 sm:my-16">
                <Navbar />
                <div className="flex flex-row place-items-center p-4 gap-4 mb-2">
                    <Folder size={48} />
                    <h1 className="sm:text-4xl  font-semibold text-3xl truncate">
                        Category : {decodedSlug}
                    </h1>
                </div>
                {
                    bookmarks.length > 0 ?
                        bookmarks.map((val: fetchBookmark, key: number) => {
                            const temp = val.link.substr(0, 100) + "...";
                            val.link = val.link.length > 100 ? temp : val.link;
                            return (
                                <div key={val.id} className="bg-background p-4 border-primary border rounded-md flex flex-col gap-4 mx-4 mb-4 md:mb-8 ">
                                    <div className="flex justify-between gap-4 sm:gap-8">
                                        <a href={val.link} target="_blank" className="scroll-m-20 text-2xl font-semibold tracking-tight break-all lg:text-4xl">{val.metadata}</a>
                                        <div key={val.id} className="flex flex-row gap-4">
                                            <DialogEditBookmark bookmark={val} />
                                            <DeleteBookmarkBtn bookmarkId={val.id} />
                                        </div>
                                    </div>
                                    <a href={val.link} target="_blank" className="text-sm font-medium leading-none break-all">{val.link}</a>
                                    <Link href={`/category/${val.categories}`}>
                                        <Button key={val.id} size="sm" className="max-w-max border-lg border-primary text-primary-foreground ">{val.categories}</Button>
                                    </Link>
                                    <div className="flex justify-between items-center">

                                        <div className="flex flex-wrap gap-4">
                                            {val.labels ? val.labels.map((value, key) => {
                                                const temp = value.text.substr(0, 10) + "...";
                                                value.text = value.text.length > 8 ? temp : value.text;

                                                return (<div key={key} className="bg-secondary text-secondary-foreground border px-2 py-1 max-w-max rounded-lg text-xs sm:text-base">
                                                    {value.text}
                                                </div>)
                                            }
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
                <DialogLogin />
            </main>
        </div>
    );
}
