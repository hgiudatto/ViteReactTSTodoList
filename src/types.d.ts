export interface Sub {
  nick: string;
  avatar: string;
  subMonths: number;
  description?: string;
}

export interface Direction {
  Up: string;
  Down: string;
  Left: string;
  Right: string;
}

export interface DBConnStatus {
  disconnected: string;
  connected: string;
  connecting: string;
  disconnecting: string;
  uninitialized: string;
  unknown: string;
}
