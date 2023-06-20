import React, { useState, useEffect, useContext } from "react";
import UserContext, { UserState } from "./store";

type Props = {};

const ConsumerComponent = () => {
  const user = useContext(UserContext);

  return (
    <div>
      <div>First: {user.first}</div>
      <div>Last: {user.last}</div>
    </div>
  );
};

const StoreUserContext = (props: Props) => {
  const [user, setUser] = useState<UserState>({
    first: "Morty",
    last: "Smith",
  });
  return (
    <UserContext.Provider value={user}>
      <ConsumerComponent />
      <button
        onClick={() => setUser({ first: "Summer", last: "Smith" })}
      >
        CHANGE CONTEXT
      </button>
    </UserContext.Provider>
  );
};

export default StoreUserContext;
