'use client'
import { Sidebar } from "../components/sidebar";
import { Button } from "@/components/ui/button"
// import { CirclePlus } from 'lucide-react';
// import { ProfileForm } from "@/components/form";
import DialogForm from "@/components/dialog-form";
import { ModeToggle } from "@/components/theme-toggle";

export default function Home() {
  return (
    <div className=" border-black stroke-border flex flex-row ">
      <Sidebar />
      <main className="border-white border-0 px-2 w-full h-full my-14 mx-4 sm:mx-0 sm:my-16">
        <ModeToggle />
        <p>paragraph</p>
        <DialogForm />
      </main>
    </div>


  );
}
