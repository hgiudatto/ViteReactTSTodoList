import {
  getCharacters,
  ApiResponse,
  Info,
  Character,
  CharacterFilter,
} from "rickmortyapi";
import { RickMorty } from "../types/types.d";

const fetchRickMortyChars = async (
  pageNumber: CharacterFilter
): Promise<ApiResponse<Info<Character[]>>> => {
  return await getCharacters(pageNumber);
};

export default fetchRickMortyChars;
