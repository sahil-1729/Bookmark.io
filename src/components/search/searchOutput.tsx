// "use client"

import { dataChunk } from "@/app/api/search/route";
import Link from "next/link";
import { Button } from "../ui/button";

const ChatOutput = ({
    results,
}: {
    results: Array<dataChunk>;
}) => {

    return (
        <div className="mt-4">
            {
                results.length > 0 ?
                    results.map((val, key: number) => {
                        const temp = val.link.substr(0, 100) + "...";
                        val.link = val.link.length > 100 ? temp : val.link;
                        return (
                            <div key={val.id} className="bg-background p-4 border-primary border rounded-md flex flex-col gap-4 mx-4 mb-4 md:mb-8 ">
                                <div className="flex justify-between gap-4 sm:gap-8">
                                    {/* metadata  */}
                                    <a href={val.link} target="_blank" className="scroll-m-20 text-xl font-semibold tracking-tight break-all">
                                        {val.metadata}
                                    </a>

                                    {/* delete and edit btn  */}
                                    {/* <div key={val.id} className="flex flex-row gap-4">
                                            <DialogEditBookmark bookmark={val} />
                                            <DeleteBookmarkBtn bookmarkId={val.id} />
                                        </div> */}
                                </div>
                                {/* link  */}
                                <a href={val.link} target="_blank" className="text-sm font-medium leading-none break-all">{val.link}</a>
                                {/* category  */}
                                <Link href={`/category/${val.categories}`}>
                                    <Button key={val.id} size="sm" className="max-w-max border-lg border-primary text-primary-foreground text-xs sm:text-base">{val.categories}</Button>
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

                                    {/* <ToggleVisit bookmarkId={val.id} visited={val.visited ? val.visited : false} /> */}
                                </div>
                            </div>
                        )
                    })
                    :
                    <div>
                        Your search did not match any bookmarks
                    </div>
                // <div className="bg-background p-4 border-primary border rounded-md flex flex-col gap-4 mx-4 mb-4 md:mb-8 ">
                //     <h5 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
                //         Looks like nothing here ...
                //     </h5>
                // </div>
            }

        </div>
    );
};


export default ChatOutput;