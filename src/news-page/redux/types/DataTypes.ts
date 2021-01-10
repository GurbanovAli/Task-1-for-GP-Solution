import { Data } from '../interfaces/Data';

export const GET_DATA = 'GET_DATA';

export interface GetDataStateType {
  data: Data[];
}

interface GetDataActionType {
  type: typeof GET_DATA;
  payload: Data[];
}
export type DataActionTypes = GetDataActionType;
