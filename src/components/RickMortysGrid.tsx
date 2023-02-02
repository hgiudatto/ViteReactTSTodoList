import React, { useState, useEffect } from "react";
import {
  getCharacters,
  ApiResponse,
  Info,
  Character,
  CharacterFilter,
} from "rickmortyapi";
import { RickMorty } from "../types/types.d";

type Props = {};

const RickMortysGrid = (props: Props) => {
  const [rickAndMortys, setRickAndMortys] = useState<ApiResponse<
    Info<Character[]>
  > | null>(null);

  const fetchRickMortyChars = async (
    pageNumber: CharacterFilter
  ): Promise<ApiResponse<Info<Character[]>>> => {
    // TODO: 20230203 - Obtener los characters desde RickMortyRetriever.fetchRickMortyChars
    const moreCharacters = await getCharacters(pageNumber);
    setRickAndMortys(moreCharacters);
    return moreCharacters;
  };

  useEffect(() => {
    let pageNum: CharacterFilter = { page: 1 };
    const rickMortys = fetchRickMortyChars(pageNum);
    rickMortys.then((res) =>
      res.data.results?.map((rm) => {
        console.log([{ rm }]);
      })
    );
  }, []);

  return (
    <div>
      <ul>
        {rickAndMortys &&
          rickAndMortys.data.results?.map((rm) => {
            return <li>{rm.name}</li>;
          })}
      </ul>
    </div>
  );
};

export default RickMortysGrid;
