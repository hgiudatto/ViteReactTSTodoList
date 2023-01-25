import React, { useState } from 'react'
import { getCharacters } from 'rickmortyapi'

interface HeaderProps {
    buttonText?: string
}

interface RickMorty {
    name: string
    status: string
    species: string
    gender: string
    image: string
    url: string
    created: string
}

export default function Header({ buttonText }: HeaderProps) {
    const [count, setCount] = useState(0)
    const [rickMorty, setRickMorty] = useState<RickMorty | null>(null)

    // TODO: en useState invocar getCharacters

    const increment = () => {
        setCount(count + 1)
        console.log(`Count: ${count}`);

    }

    return (
        <div>
            <h1>Header</h1>
            <button onClick={increment}>{buttonText || 'Click the button'}</button>
            <p>{count}</p>
        </div>
    )
}
