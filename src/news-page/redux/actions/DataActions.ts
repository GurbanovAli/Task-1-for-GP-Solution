import { GET_DATA, DataActionTypes } from '../types/DataTypes';
import { Data } from '../interfaces/Data';

export const getDataAction=(data: Data[]): DataActionTypes => {
  return {
    type: GET_DATA,
    payload: data
  };
};
