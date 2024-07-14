'use client'

import { Toggle } from "./ui/toggle"
import { BookOpenCheck } from "lucide-react"
import UpdateVisited from "@/server-actions/updateVisited"
import { useState } from "react"
import clsx from "clsx"

interface props {
    id: string,
    visited: boolean
}

export default function ToggleVisit({ id, visited }: props) {

    const updateVisitedWithId = UpdateVisited.bind(null)
    const [border, setBorder] = useState(visited)


    return <Toggle className={clsx('flex items-center', {
        'border-primary border-2': border
    })} defaultPressed={visited ? visited : false} onPressedChange={(pressed) => {
        setBorder(pressed)
        updateVisitedWithId({ bookmarkId: id, visited: pressed })
        // console.log(pressed)
    }} >
        <div>
            visited
        </div>
        &nbsp; <BookOpenCheck /></Toggle>
}