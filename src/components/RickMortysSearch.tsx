import { useEffect, useState } from "react";
import {
  getCharacters,
  ApiResponse,
  Info,
  Character,
  CharacterFilter,
  getCharacter,
  CharacterLocation,
} from "rickmortyapi";
import React from "react";
import SearchBarInput from "../shared/searchBar";
import RickMortyCardItem from "./RickMortyCardItem";

const RickMorty = ({ rickMorty }) => {
  // TODO: example 4 -> https://larainfo.com/blogs/react-tailwind-css-cards-example
  return (
    <div
      key={rickMorty.id}
      className="flex flex-col items-center m-4"
    >
      <img src={rickMorty.image} className="h-24" />
      <div className="text-xl font-semibold mt-2">
        {rickMorty.name}
      </div>{" "}
      -
      <div className="text-xl font-semibold mt-2">
        Gender: {rickMorty.gender}
      </div>{" "}
      -
      <span className="text-lg text-gray-400 font-bold">
        Species: {rickMorty.species}
      </span>{" "}
      -
      <span className="text-lg text-gray-400 font-bold">
        Status: {rickMorty.status}
      </span>{" "}
      -
      <span className="text-lg text-gray-400 font-bold">
        Location: {rickMorty.location.name}
      </span>
    </div>
  );
};

const searchRickMortyCharacter = async (
  value: CharacterFilter
): Promise<Character> => {
  console.log(`Searching for character name: ${value.name}`);
  let name2Search = value.name;
  const rickMortyChars = await getCharacters(value);
  rickMortyChars.data.results?.map((rm) => {
    console.log(
      `Character name: ${rm.name}, gender: ${rm.gender}, created: ${rm.created}`
    );
  });
  const foundChar: Character = {
    id: rickMortyChars.data.results?.at(0)?.id as number,
    name: rickMortyChars.data.results?.at(0)?.name as string,
    status: rickMortyChars.data.results?.at(0)?.status as
      | "Dead"
      | "Alive"
      | "unknown",
    species: rickMortyChars.data.results?.at(0)?.species as string,
    type: rickMortyChars.data.results?.at(0)?.type as string,
    gender: rickMortyChars.data.results?.at(0)?.gender as
      | "Female"
      | "Male"
      | "Genderless"
      | "unknown",
    origin: rickMortyChars.data.results?.at(0)
      ?.origin as CharacterLocation,
    location: rickMortyChars.data.results?.at(0)
      ?.location as CharacterLocation,
    image: rickMortyChars.data.results?.at(0)?.image as string,
    episode: rickMortyChars.data.results?.at(0)?.episode as string[],
    url: rickMortyChars.data.results?.at(0)?.url as string,
    created: rickMortyChars.data.results?.at(0)?.created as string,
  };

  console.log(
    `Found character id: ${foundChar.id}, name: ${foundChar.name}`
  );
  return foundChar;
};

export default function useRickMortysSearch(value: string, delay) {
  console.log(`useRickMortysSearch: ${value}`);

  const [rickMortySearchValue, setRickMortySearchValue] =
    useState(value);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setRickMortySearchValue(value);
    }, delay);

    return () => clearTimeout(timeoutId);
  }, [value]);

  return rickMortySearchValue;
}

export function RickMortysSearch() {
  // TODO react-stop-doing-this/src/component/debounce.jsx
  const [value, setValue] = useState("");
  const [rickMorty, setRickMorty] = useState<Character>();

  const rickMortySearchValue = useRickMortysSearch(value, 300);
  console.log(`useRickMortysSearch: ${rickMortySearchValue}`);

  /* const fetchSomeRickMortyChar = async (value) => {
    const rickMortyChar = await getCharacter(value);
    setRickMortys(rickMortyChar);
  }; */

  const searchCharacters = async (value: string) => {
    console.log(`Name that we're looking for: ${value}`);

    const characterFound = await searchRickMortyCharacter({
      name: value,
    });
    if (characterFound) {
      console.log(
        `Found character id: ${characterFound.id}, name: ${characterFound.name}`
      );
      setRickMorty(characterFound);
    }
  };

  const handleSearchInputChange = (e: {
    target: { value: string };
  }) => {
    const value = e.target.value;
    console.log(`Character searching for: ${value}`);

    setValue(value);
  };

  /* useEffect(() => {
    searchCharacters("");
  }, []); */

  /* useEffect(() => {
    fetchSomeRickMortyChar(value);
  }, [value]); */

  useEffect(() => {
    console.log("Value: ", rickMortySearchValue);
    searchCharacters(rickMortySearchValue);
  }, [rickMortySearchValue]);

  return (
    <div className="h-full flex flex-col w-full items-center p-12">
      <form className="flex justify-center w-1/2 mb-12">
        <SearchBarInput
          value={value}
          onChange={handleSearchInputChange}
        />
      </form>
      <h3 className="font-bold text-3xl">Found Users</h3>
      <br />
      <div className="flex flex-wrap items-center justify-center w-full">
        {rickMorty && (
          <div className="p-6 max-w-sm mx-auto bg-white rounded-xl shadow-lg flex items-center space-x-4">
            {/* <div className="shrink-0">
              <img
                className="h-12 w-12"
                src="/img/logo.svg"
                alt="ChitChat Logo"
              />
            </div> */}
            <div>
              <div className="text-xl font-medium text-blue-600">
                ChitChat
              </div>
              <p className="text-slate-500">Character found!!</p>
            </div>
          </div>
        )}
        {rickMorty && <RickMorty rickMorty={rickMorty} />}
        {/*         <RickMortyCardItem rickMorty={rickMorty} />
         */}{" "}
      </div>
    </div>
  );
}
