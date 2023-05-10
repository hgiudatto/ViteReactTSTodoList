// import TestRestApiNodeClientResponse from "../types/types";

const getHomeFetch = (): any => {
  return fetch("http://localhost:3001/home")
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      return data;
    })
    .catch((err) => {
      console.log(`Error fetching http://localhost:3001/home`, err.message);
    });
};

/* const getHome = async (): Promise<TestRestApiNodeClientResponse> => {
  return new Promise((resolve, reject) => {
    let client = new Client();
    client
      .get("http://localhost:3001/home", (data: any, response: any) => {
        if (response && response.statusCode === 200) {
          const jsonData = JSON.stringify(data);
          const resultsJSON = JSON.parse(jsonData);
          return resolve({ msg: resultsJSON.msg });
        }
      })
      .on("error", (err: any) => {
        console.log("Something went wrong on the client", err);
        reject(err);
      });
  });
}; */

export default getHomeFetch;
