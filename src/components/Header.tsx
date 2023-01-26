import React, { useState, useEffect } from 'react'
import { getCharacters } from 'rickmortyapi'
import { RickMorty } from '../types.d'




interface HeaderProps {
    buttonText?: string
}

interface AppState {
    rickMorty: Array<RickMorty>
}

interface CharacterFilter {
    page: number
}

export default function Header({ buttonText }: HeaderProps) {
    const [count, setCount] = useState(0)
    const [rickMorty, setRickMorty] = useState<RickMorty | null>(null)

    // TODO: en useState invocar getCharacters
    const fetchRickMortyChars = async (pageNumber: CharacterFilter) => {
        const moreCharacters = await getCharacters(pageNumber)
        return moreCharacters
    }

    const increment = () => {
        setCount(count + 1)
        console.log(`Count: ${count}`);

    }

    useEffect(() => {
        let pageNum: CharacterFilter = { page: 1 }
        const rickMortys = fetchRickMortyChars(pageNum)
        rickMortys.then(res => res.data.results?.map((rm) => {
            let rickMorty: RickMorty = rm
            console.log([{
                rickMorty
            }]);

        }))
    }, [])


    return (
        <div>
            <h1>Header</h1>
            <button onClick={increment}>{buttonText || 'Click the button'}</button>
            <p>{count}</p>
        </div>
    )
}
