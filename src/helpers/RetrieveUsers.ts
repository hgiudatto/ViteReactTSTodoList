const getUsers = async () => {
  const res = await fetch("https://reqres.in/api/users", {
    method: "GET",
  });
  const json = await res.json();
  return json.data;
};

export default getUsers;
