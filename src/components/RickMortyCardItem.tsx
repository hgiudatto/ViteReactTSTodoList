import React from "react";
import { Character } from "rickmortyapi";

type Props = {
  rickMorty: Character | undefined;
};

const RickMortyCardItem = (props: Props) => {
  return (
    <div className="w-full rounded-lg shadow-md lg:max-w-sm">
      <img
        className="object-cover w-full h-48"
        src={props.rickMorty?.image}
        alt="image"
      />
      <div className="p-4">
        <h4 className="text-xl font-semibold tracking-tight text-blue-600">
          {props.rickMorty?.name}
        </h4>
        <h4 className="text-xl font-semibold tracking-tight text-blue-600">
          {props.rickMorty?.gender}
        </h4>
        <h4 className="text-xl font-semibold tracking-tight text-blue-600">
          {props.rickMorty?.species}
        </h4>
        <h4 className="text-xl font-semibold tracking-tight text-blue-600">
          {props.rickMorty?.status}
        </h4>
        <h4 className="text-xl font-semibold tracking-tight text-blue-600">
          {props.rickMorty?.location.name}
        </h4>
        <button className="px-4 py-2 text-sm text-blue-100 bg-blue-500 rounded shadow">
          Read more
        </button>
      </div>
    </div>
  );
};

export default RickMortyCardItem;
