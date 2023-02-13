import React, { useState, useEffect } from "react";
import getHomeFetch from "../middlewares/RestApiNodeClient";
import TestRestApiNodeClientResponse from "../types/types";

type Props = {};

const TestRestApiNodeClient = (props: Props) => {
  const [homeMessage, setHomeMessage] = useState<any>();

  const fetchHome = () => {
    getHomeFetch().then((response: { data: any }) => {
      setHomeMessage(response.data);
    });
  };

  useEffect(() => {
    fetchHome();
    console.log(`homeMessage:`, { homeMessage });
  }, []);

  return (
    <div>
      <h3>{homeMessage}</h3>
    </div>
  );
};

export default TestRestApiNodeClient;
