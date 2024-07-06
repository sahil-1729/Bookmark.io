import { useState, useEffect } from "react";
import { ModeToggle } from "./theme-toggle";
import { Badge } from "./ui/badge";
import { GetUserName } from "./User";


export default function Navbar() {

    const [name, setName] = useState<string>("")

    useEffect(() => {
        const getUser = async () => {
            const response: string | number = await GetUserName()
            if (response) {
                setName(response)
            }
        }
        getUser()
    }, [])

    return (<div className="flex justify-end mx-4 mb-4 gap-2 items-center">
        {name.length > 0 && <div>
            <Badge>Hey, {name}</Badge>
        </div>}
        <ModeToggle />
    </div>)
}