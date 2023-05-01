import React from "react";
import { useEffect, useState, CSSProperties } from "react";
import {
  getCharacters,
  ApiResponse,
  Info,
  Character,
  CharacterFilter,
  getCharacter,
  CharacterLocation,
} from "rickmortyapi";
import { useParams } from "react-router-dom";
import ClipLoader from "react-spinners/ClipLoader";

const override: CSSProperties = {
  display: "block",
  margin: "0 auto",
  borderColor: "red",
};

type Props = {};

const RickMortyGridDetail = (props: Props) => {
  const [rickMorty, setRickMorty] = useState<Character | null>();
  const params = useParams();
  console.log(params);

  const searchRickMortyCharacter = async (
    value: string
  ): Promise<Character> => {
    const rickMortyChar = await getCharacter(+value);
    console.log(
      `Character name: ${rickMortyChar.data.name}, gender: ${rickMortyChar.data.gender}, created: ${rickMortyChar.data.created}`
    );
    const foundChar: Character = {
      id: rickMortyChar.data.id,
      name: rickMortyChar.data.name,
      status: rickMortyChar.data.status as
        | "Dead"
        | "Alive"
        | "unknown",
      species: rickMortyChar.data.species as string,
      type: rickMortyChar.data.type as string,
      gender: rickMortyChar.data.gender as
        | "Female"
        | "Male"
        | "Genderless"
        | "unknown",
      origin: rickMortyChar.data.origin as CharacterLocation,
      location: rickMortyChar.data.location as CharacterLocation,
      image: rickMortyChar.data.image as string,
      episode: rickMortyChar.data.episode as string[],
      url: rickMortyChar.data.url as string,
      created: rickMortyChar.data.created as string,
    };
    console.log(
      `Found character id: ${foundChar.id}, name: ${foundChar.name}`
    );
    return foundChar;
  };

  const searchCharacter = async (idParam: string) => {
    if (idParam) {
      const characterFound = await searchRickMortyCharacter(idParam);
      if (characterFound) {
        console.log(
          `Found character id: ${characterFound.id}, name: ${characterFound.name}`
        );
        setRickMorty(characterFound);
      } else {
        setRickMorty(null);
      }
    }
  };

  useEffect(() => {
    let ignore = false;
    searchCharacter(`${params.id}`);
    return () => {
      ignore = true;
    };
  }, [params.id]);

  return (
    <div className="flex flex-wrap items-center justify-center w-full">
      {rickMorty ? (
        <div
          key={rickMorty.id}
          className="flex flex-col items-center m-4"
        >
          <img src={rickMorty?.image} className="h-24" />
          <div className="text-xl font-semibold mt-2">
            {rickMorty.name}
          </div>{" "}
          -
          <div className="text-xl font-semibold mt-2">
            Gender: {rickMorty?.gender}
          </div>{" "}
          -
          <span className="text-lg text-gray-400 font-bold">
            Species: {rickMorty?.species}
          </span>{" "}
          -
          <span className="text-lg text-gray-400 font-bold">
            Status: {rickMorty?.status}
          </span>{" "}
          -
          <span className="text-lg text-gray-400 font-bold">
            Location: {rickMorty?.location?.name}
          </span>
        </div>
      ) : (
        <div className="sweet-loading">
          <ClipLoader
            color={"#ffffff"}
            loading={true}
            cssOverride={override}
            size={150}
            aria-label="Loading Spinner"
            data-testid="loader"
          />
        </div>
      )}
    </div>
  );
};

export default RickMortyGridDetail;
