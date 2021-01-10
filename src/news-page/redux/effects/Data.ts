import { getDataAction } from '../actions/DataActions';
import { Dispatch } from 'redux';
import { DataActionTypes } from '../types/DataTypes';

export const getData = () => {
  return function (dispatch: Dispatch<DataActionTypes>) {
    const DATA_URL = 'data.json';
    fetch(DATA_URL, {
      method: 'GET'
    })
      .then(res => res.json())
      .then(data => {
        dispatch(getDataAction(data));
        return data;
      });
  };
};
