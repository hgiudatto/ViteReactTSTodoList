import React, { useState, useEffect, useCallback } from "react";

interface User {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  avatar: string;
}

const UserDetailCallback = ({ userId }, props: User) => {
  const [user, setUser] = useState<User>();
  const getUser = useCallback(async () => {
    const response = await fetch(
      `https://reqres.in/api/users/${userId}`
    );
    const json = await response.json();
    console.log(json.data);
    setUser(json.data);
  }, [userId]);
  useEffect(() => {
    getUser();
  }, [getUser]);

  return (
    <div>
      <p>{`${user?.last_name}, ${user?.first_name}`}</p>
    </div>
  );
};

export default UserDetailCallback;
