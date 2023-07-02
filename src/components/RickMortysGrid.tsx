import React, { useState, useEffect } from "react";
import {
  getCharacters,
  ApiResponse,
  Info,
  Character,
  CharacterFilter,
  getCharacter,
} from "rickmortyapi";
import { Link } from "react-router-dom";

type Props = {};

const RickMortysGrid = (props: Props) => {
  const [showPage, setShowPage] = useState(1);
  const [value, setValue] = useState(0);
  const [rickAndMortys, setRickAndMortys] = useState<ApiResponse<
    Info<Character[]>
  > | null>(null);
  const [rickMortyChar, setRickMortyChar] =
    useState<ApiResponse<Character>>();

  const fetchRickMortyChars = async (
    pageNumber: CharacterFilter
  ): Promise<ApiResponse<Info<Character[]>>> => {
    // TODO: 20230203 - Obtener los characters desde RickMortyRetriever.fetchRickMortyChars
    const moreCharacters = await getCharacters(pageNumber);
    setRickAndMortys(moreCharacters);
    return moreCharacters;
  };

  const handleSearchInputChange = (e) => {
    const value = e.target.value;
    setValue(value);
  };

  const incrementPage = () => {
    console.log(`page: ${showPage}`);
    setShowPage((showPage) => showPage + 1);
  };

  useEffect(() => {
    console.log(`showPage: ${showPage}`);
    let pageNum: CharacterFilter = { page: showPage };
    console.log(`Rendering characters from page: `, pageNum);
    const rickMortys = fetchRickMortyChars(pageNum);
    rickMortys.then((res) =>
      res.data.results?.map((rm) => {
        console.log([{ rm }]);
      })
    );
  }, [showPage]);

  return (
    <div>
      <div>
        <button onClick={incrementPage}>Show page</button>
        <p>{showPage}</p>
      </div>
      <ul>
        {rickAndMortys &&
          rickAndMortys.data.results?.map((rm) => {
            return (
              <div key={rm.id} className="col-md-3 text-center p-5">
                <Link to={`/grid/${rm.id}`}>
                  <img className="w-100" src={rm.image} alt="" />
                  <p>{rm.name}</p>
                </Link>
              </div>
            );
          })}
      </ul>
    </div>
  );
};

export default RickMortysGrid;
