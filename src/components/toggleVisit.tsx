'use client'

import { Toggle } from "./ui/toggle"
import { BookOpenCheck } from "lucide-react"
import UpdateVisited from "@/server-actions/updateVisited"
import { useState } from "react"
import clsx from "clsx"
import { useRouter } from "next/navigation"

interface props {
    bookmarkId: string,
    visited: boolean
}

export default function ToggleVisit({ bookmarkId, visited }: props) {

    const router = useRouter()

    const updateVisitedWithId = UpdateVisited.bind(null)
    const [border, setBorder] = useState(visited)


    return <Toggle key={bookmarkId} className={clsx('flex items-center', {
        'border-primary border-2': border
    })} defaultPressed={visited ? visited : false}
        onPressedChange={(pressed) => {
            setBorder(pressed)
            updateVisitedWithId({ bookmarkId: bookmarkId, visited: pressed })
            // console.log(pressed)
            router.refresh()
        }} >
        <p>
            visited
        </p>
        &nbsp; <BookOpenCheck />
    </Toggle>
}