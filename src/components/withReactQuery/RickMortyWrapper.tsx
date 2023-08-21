import React from "react";
import { QueryClient } from "@tanstack/react-query";
import RickMortys from "./RickMortys";
import { dehydrate } from "@tanstack/query-core";
import { GET_RICKMORTYS_KEY, getRickMortys } from "./getRickMortys";
import Hydrate from "./Hydrate";

const RickMortyWrapper = async () => {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery(GET_RICKMORTYS_KEY, getRickMortys);
  const dehydratedState = dehydrate(queryClient);
  return (
    <Hydrate state={dehydratedState}>
      <RickMortys />
    </Hydrate>
  );
};

export default RickMortyWrapper;
