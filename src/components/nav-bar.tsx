
// import { useState, useEffect } from "react";
import { ModeToggle } from "./theme-toggle";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { GetUserName, SignOut } from "./User";

export default async function Navbar() {

    let name = ""

    // const getUser = async () => {
    const response: string | number = await GetUserName()
    if (response) {
        name = response
    }
    // }
    // getUser()

    return (<div className="flex justify-end mx-4 mb-4 gap-2 items-center">
        {name.length > 0 &&
            <Button asChild>
                <div>
                    {/* <Badge></Badge> */}
                    Hey, &nbsp; <span>{name}</span>
                </div>
            </Button>
        }
        <ModeToggle />
        <form action={SignOut}>
            <Button>
                Logout
            </Button>
        </form>

    </div>)
}