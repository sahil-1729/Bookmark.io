'use client'
import { Sidebar } from "../components/sidebar";
import DialogForm from "@/components/dialog-form";
import { ModeToggle } from "@/components/theme-toggle";
import { useContext, useEffect, useState } from "react";
import { formInterface } from "@/types";
import Card from "@/components/card";
import { BookmarkContext, BookmarkProvider, useToggleContext } from "@/context/app-context";

export default function Home() {
  // const { bookmarks, setBookmarks } = useContext(BookmarkContext)

  return (
    // <BookmarkProvider >
    <div className=" border-black stroke-border flex flex-row ">
      <Sidebar />
      <main className="border-white border-0 px-2 w-full h-full my-14 mx-4 sm:mx-0 sm:my-16">
        <div className="flex justify-end mx-4 mb-4 ">
          <ModeToggle />
        </div>
        <Card />
        <DialogForm />
      </main>
    </div>
    // </BookmarkProvider>
  );
}
