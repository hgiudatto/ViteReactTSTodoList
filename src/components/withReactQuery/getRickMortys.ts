import { RickMorty } from "../../types/types.js";

const sleep = (ms: number) => {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
};

export const getRickMortys = async () => {
  const data: RickMorty[] = [];
  const rickMortyNames = [
    "Blue Diplomat",
    "Abradolf Lincler",
    "Lucy",
    "Bova",
  ];
  for (let i = 0; i < rickMortyNames.length; i++) {
    const name = rickMortyNames[i];

    const res: any = await fetch(
      `https://rickandmortyapi.com/api/character/?name=${name}`
    );
    const rickMortyDetail = await res.json();
    await sleep(500);
    const rickMorty: RickMorty = {
      id: rickMortyDetail.results[0].id,
      name: rickMortyDetail.results[0].name,
      status: rickMortyDetail.results[0].status,
      species: rickMortyDetail.results[0].species,
      type: rickMortyDetail.results[0].type,
      gender: rickMortyDetail.results[0].gender,
      origin: rickMortyDetail.results[0].origin?.name,
      image: rickMortyDetail.results[0].image,
      location: {
        name: "",
        url: "",
      },
      episode: [],
      url: "",
      created: "",
    };
    data.push(rickMorty);
  }

  console.log("Query Completed");
  return data;
};

export const GET_RICKMORTYS_KEY = ["GET_RICKMORTYS"];
