import React, { useState, useEffect } from 'react'
import { getCharacters, ApiResponse, Info, Character } from 'rickmortyapi'
import { RickMorty } from '../types/types.d'

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
    const [rickAndMortys, setRickAndMortys] = useState<ApiResponse<Info<Character[]>> | null>(null)

    const fetchRickMortyChars = async (pageNumber: CharacterFilter): Promise<ApiResponse<Info<Character[]>>> => {
        const moreCharacters = await getCharacters(pageNumber)
        setRickAndMortys(moreCharacters)
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
            console.log([{ rm }]);
        }))
    }, [])


    return (
        <div>
            // TODO: List RickAndMortys
            <h1>Header</h1>
            <button onClick={increment}>{buttonText || 'Click the button'}</button>
            <p>{count}</p>
        </div>
    )
}
