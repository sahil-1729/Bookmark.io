'use server'
import { Sidebar } from "@/components/sidebar";
import DialogForm from "@/components/dialog-form";
import Card from "@/components/card";
import Navbar from "@/components/nav-bar";
import DialogLogin from "@/components/dialog-login-again";
import FormDialog from "@/components/form";
export default async function Timeline() {

  return (
    // <BookmarkProvider >
    <div className=" border-black stroke-border flex flex-row ">
      <Sidebar />
      <main className="border-white border-0 px-2 w-full h-full my-14 mx-4 sm:mx-0 sm:my-16">
        <Navbar />
        <Card />
        <DialogForm />
      </main>
      <DialogLogin />
    </div>
    // </BookmarkProvider>
  );
}

