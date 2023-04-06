export interface RickMorty {
  id: string;
  name: string;
  status: string;
  species: string;
  type: string;
  gender: string;
  origin: {
    name: string;
    url: string;
  };
  location: {
    name: string;
    url: string;
  };
  image: string;
  episode: [
    string,
    string
    // ...
  ];
  url: string;
  created: string;
}

declare module "testRestApiNodeClientResponse" {
  interface TestRestApiNodeClientResponse {
    msg: string;
  }
  export = TestRestApiNodeClientResponse;
}

declare module "direction" {
  enum Direction {
    Up = "UP",
    Down = "DOWN",
    Left = "LEFT",
    Right = "RIGHT",
  }
  export default Direction;
}
