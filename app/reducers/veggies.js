import createReducer from '../lib/createReducer';
import * as types from '../actions/types';

export const products = createReducer({}, {
  [types.SET_VEGGIES](state, action) {
    return {
      ...state,
      veggies: action.veggies
    }
  },
  [types.SET_FRUITS](state, action) {
    return {
      ...state,
      fruits: action.fruits
    }
  },
  [types.SET_EXOTIC](state, action) {
    return {
      ...state,
      exotic: action.exotic
    }
  },
  [types.SET_FRESH_CUT](state, action) {
    return {
      ...state,
      freshCut: action.freshCut
    }
  },
  [types.SET_BUNDLES](state, action) {
    return {
      ...state,
      bundles: action.bundles
    }
  },
  [types.PRODUCT_LOADER](state, action) {
    return {
      ...state,
      productLoading: action.productLoading
    }
  },
  

});