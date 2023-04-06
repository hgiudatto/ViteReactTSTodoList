import fetch from "node-fetch";

(async () => {
  const response = await fetch("https://api.github.com/users/hgiudatto/repos");
  const body = response.text();

  console.log(body);
})();
