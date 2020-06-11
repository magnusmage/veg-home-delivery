import * as types from './types';
import Api from '../lib/requests/api';

function setVeggies(value) {
  return {
    type: types.SET_VEGGIES,
    veggies: value,
  }
}

function setFruits(value) {
  return {
    type: types.SET_FRUITS,
    fruits: value,
  }
}

function setExotic(value) {
  return {
    type: types.SET_EXOTIC,
    exotic: value,
  }
}

function setFrestCut(value) {
  return {
    type: types.SET_FRESH_CUT,
    freshCut: value,
  }
}

function setBundles(value) {
  return {
    type: types.SET_BUNDLES,
    bundles: value,
  }
}

function setIsLoading(value) {
  return {
    type: types.PRODUCT_LOADER,
    productLoading: value,
  }
}

export function getVeggies(params, value, type) {
  const url = type === 'COMPANY' ? '/getProductCompany.php' : '/getProduct.php';
  return (dispatch) => {
    dispatch(setIsLoading(true));
    return Api.post(url, params).then(resp => {
      if (value === 'fruit') {
        dispatch(setFruits(resp.server_data));
      } else if (value === 'veggie') {
        dispatch(setVeggies(resp.server_data));
      } else if (value === 'exotic') {
        dispatch(setExotic(resp.server_data));
      } else if (value === 'freshCut') {
        dispatch(setFrestCut(resp.server_data));
      }
      dispatch(setIsLoading(false));
    }).catch((ex) => {
      console.log(error)
    });
  }
}

export function getBundles() {
  return (dispatch) => {
    return Api.post('/getBundle.php').then(resp => {
      dispatch(setBundles(resp.server_data))
    }).catch((ex) => {
      console.log(error)
    });
  }
}