import React, { useState, useEffect } from "react";
import { getCharacters, ApiResponse, Info, Character } from "rickmortyapi";
// import fetch from "node-fetch";
import { RickMorty } from "../types/types.d";

interface HeaderProps {
  buttonText?: string;
  title?: string;
}

interface AppState {
  rickMorty: Array<RickMorty>;
}

interface CharacterFilter {
  page: number;
}

export default function Header({ buttonText, title }: HeaderProps) {
  const [count, setCount] = useState(0);
  const [rickAndMortys, setRickAndMortys] = useState<ApiResponse<
    Info<Character[]>
  > | null>(null);

  const fetchRickMortyCharsByPage = async (
    pageNumber: CharacterFilter
  ): Promise<ApiResponse<Info<Character[]>>> => {
    const moreCharacters = await getCharacters(pageNumber);
    setRickAndMortys(moreCharacters);
    return moreCharacters;
  };

  /* const fetchRickMortyChars = async (): Promise<
    ApiResponse<Info<Character[]>>
  > => {
    const response = await fetch("/rickMortyChars");
    const data = await response.json();
    return data;
  }; */

  const increment = () => {
    setCount(count + 1);
    console.table(`Count: ${count}`);
  };

  /* useEffect(() => {
    const rms = fetchRickMortyChars();
    rms.then((res) =>
      res.data.results?.map((rm) => {
        console.log([{ rm }]);
      })
    );
  }, []); */

  useEffect(() => {
    let pageNum: CharacterFilter = { page: 1 };
    const rickMortys = fetchRickMortyCharsByPage(pageNum);
    rickMortys.then((res) =>
      res.data.results?.map((rm) => {
        console.table([{ rm }]);
      })
    );
  }, [count]);

  return (
    <div>
      <h1>{title || "Some text"}</h1>
      <button onClick={increment}>
        {buttonText || "Click the button"}
      </button>
      <p>{count}</p>
    </div>
  );
}
