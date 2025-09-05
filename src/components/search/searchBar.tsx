

"use client";
import ChatOutput from "./searchOutput";
import { Button } from "@/components/ui/button";
import { ArrowUp, X } from "lucide-react";
import { Input } from "../ui/input";
import { useState } from "react";
import { Toggle } from "../ui/toggle";

export default function SearchBar() {
    const [input, setInput] = useState('');
    const [result, setResult] = useState([])
    const [filter, setFilter] = useState(false)

    const handleSubmit = async (e: any) => {

        try {
            e.preventDefault();
            const query = e.target.elements.searchQuery.value

            // console.log(e.target.elements.searchQuery.value)
            // make api call 
            const response = await fetch('/api/search', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ query: query, filter: filter })
            })

            if (!response.ok) {
                throw new Error("Failed to fetch results")
            }
            const result = await response.json()
            // console.log('recieved response ', result)
            // setInput('');
            setResult(result.data)
        } catch (error) {
            console.log(error)
        }
    };

    return (
        <main className="px-4">
            <h1 className="text-2xl font-semibold mb-4">Search Bookmarks</h1>

            <form onSubmit={handleSubmit} className="flex gap-2">
                <Input
                    className="p-4"
                    onChange={e => setInput(e.target.value)}
                    value={input}
                    placeholder="Ask me something..."
                    name="searchQuery"
                />
                {
                    input.length > 0 ?
                        <Button onClick={() => {
                            setInput('')
                        }}>
                            <X />
                        </Button> : ""
                }
                <Toggle className="text-nowrap" onClick={() => {
                    const value = !filter
                    setFilter(value)
                }}>Category | Labels</Toggle>
                <Button type="submit" >
                    <ArrowUp />
                    <span className="sr-only" >Submit</span>
                </Button>
            </form>

            <div className="space-y-4 mb-4 max-h-[80vh] overflow-y-auto">
                <ChatOutput results={result} />
            </div>
        </main>
    );
}