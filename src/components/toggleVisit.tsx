'use client'

import { Toggle } from "./ui/toggle"
import { BookOpenCheck } from "lucide-react"
import UpdateVisited from "@/server-actions/updateVisited"

interface props {
    id: string,
    visited: boolean
}

export default function ToggleVisit({ id, visited }: props) {

    const updateVisitedWithId = UpdateVisited.bind(null)



    return <Toggle defaultPressed={visited ? visited : false} onPressedChange={(pressed) => {
        updateVisitedWithId({ bookmarkId: id, visited: pressed })
        // console.log(pressed)
    }} > visited &nbsp; <BookOpenCheck /></Toggle>
}