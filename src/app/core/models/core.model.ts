export enum SERVICE_END_POINT_TYPE {
  AUTH,
  SAPI,
}

export enum STORAGE {
  SESSION,
  LOCAL,
  MEMORY,
  COOKIE,
  WINDOW,
}

export interface IRes {
  message: string;
  code: number;
}
