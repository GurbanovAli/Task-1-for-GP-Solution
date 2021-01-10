import {
  GET_DATA,
  GetDataStateType,
  DataActionTypes
} from '../types/DataTypes';

const initialStateGetData: GetDataStateType = {
  data: []
};

export const getDataReducer = (
  state = initialStateGetData,
  action: DataActionTypes
): GetDataStateType => {
  switch (action.type) {
    case GET_DATA:
      return {
        ...state,
        data: action.payload
      };
    default:
      return state;
  }
};
