import {
  getCharacters,
  ApiResponse,
  Info,
  Character,
  CharacterFilter,
} from "rickmortyapi";
import RickMorty from "../types/types.d";

interface RickMortyProps {
  rm: RickMorty;
}

const RickMortyCard = ({ rm }: RickMortyProps) => {
  return <li>{rm.name}</li>;
};

export default RickMortyCard;
