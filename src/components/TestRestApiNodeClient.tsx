import React, { useState, useEffect } from "react";
import getHomeFetch from "../middlewares/RestApiNodeClient";
import TestRestApiNodeClientResponse from "../types/types";

type Props = {};

const TestRestApiNodeClient = (props: Props) => {
  const [homeMessage, setHomeMessage] = useState<any>();

  const fetchHome = async () => {
    setHomeMessage(await getHomeFetch());
  };

  useEffect(() => {
    fetchHome();
  }, []);

  return (
    <div className="col-md-3 text-center p-5">
      <p>{homeMessage?.msg}</p>
    </div>
  );
};

export default TestRestApiNodeClient;
