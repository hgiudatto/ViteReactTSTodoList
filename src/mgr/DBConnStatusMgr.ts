import { Direction, DBConnStatus } from "../types";

let dbConnStatus: DBConnStatus;

dbConnStatus = {
  disconnected: "DISCONNECTED",
  connected: "CONNECTED",
  connecting: "CONNECTING",
  disconnecting: "DISCONNECTING",
  uninitialized: "UNINITIALIZED",
  unknown: "UNKNOWN",
};

export const statusRetriever = (connState: number): string => {
  let connStatus: string = "";

  switch (connState) {
    case 0:
      connStatus = dbConnStatus.disconnected;
      break;
    case 1:
      connStatus = dbConnStatus.connected;
      break;
    case 2:
      connStatus = dbConnStatus.connecting;
      break;
    case 3:
      connStatus = dbConnStatus.disconnecting;
      break;
    case 99:
      connStatus = dbConnStatus.uninitialized;
      break;
    default:
      connStatus = dbConnStatus.unknown;
      break;
  }

  return connStatus;
};
