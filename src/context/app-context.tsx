"use client"

import { formInterface } from "@/types";
import { createContext, useContext, useState } from "react";

interface BookmarkContextInterface {
    bookmarks: formInterface[] | [];
    setBookmarks: React.Dispatch<React.SetStateAction<formInterface[]>>;
}
interface props {
    children: React.ReactNode
}
// const [bookmark, setBookmark] = useState<formInterface[]>()

// export const BookmarkContext = createContext<BookmarkContextInterface>({bookmark,setBookmark}) 

export const BookmarkContext = createContext<BookmarkContextInterface | null>(null)


// BookmarkProvider ko only once to be applied, also only in layout.tsx, bc if you put more than once as i applied on search and labels page, every time i add the new bookmark, e.g if added 2 bookmarks in search page, while switching to labels page the list goes to 0, and bookmarks get added one by one in labels page(while adding in labels page)
export const BookmarkProvider = ({ children }: props) => {
    const [bookmarks, setBookmarks] = useState<formInterface[]>([]);
    return (
        <BookmarkContext.Provider value={{ bookmarks, setBookmarks }}>
            {children}
        </BookmarkContext.Provider>
    );
};

export const useToggleContext = () => {

    const val = useContext(BookmarkContext)
    if (!val) {
        console.log('context not found')
    }
    return val
}