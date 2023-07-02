import React, { useState, useContext } from "react";
import { places } from "../data";
import { getImageUrl } from "../utils/utils";
import { ImageContext } from "./ImageContext";

const ImageMgr = () => {
  const [isLarge, setisLarge] = useState(false);
  const imageSize = isLarge ? 150 : 100;

  return (
    <ImageContext.Provider value={imageSize}>
      <label>
        <input
          type="checkbox"
          checked={isLarge}
          onChange={(e) => {
            setisLarge(e.target.checked);
          }}
        />
        Use large images
      </label>
      <hr />
      <List />
    </ImageContext.Provider>
  );
};

export default ImageMgr;

function List() {
  const listItems = places.map((place) => (
    <li key={place.id}>
      <Place place={place} />
    </li>
  ));
  return <ul>{listItems}</ul>;
}

function Place({ place }) {
  return (
    <>
      <PlaceImage place={place} />
      <p>
        <b>{place.name}</b>
        {`: ${place.description}`}
      </p>
    </>
  );
}

function PlaceImage({ place }) {
  const imageSize = useContext(ImageContext);
  return (
    <img
      src={getImageUrl(place)}
      alt={place.name}
      width={imageSize}
      height={imageSize}
    />
  );
}
