import * as types from './types';
import Api from '../lib/requests/api';


function setOrders(value) {
  return {
    type: types.SET_ORDERS,
    orders: value,
  }
}

function setSlider(value) {
  return {
    type: types.SET_SLIDER,
    slider: value,
  }
}

function setCart(value) {
  return {
    type: types.SET_CART,
    cartFlag: value,
  }
}

function setStocks(value) {
  return {
    type: types.SET_STOCKS,
    stock: value,
  }
}

function setStockFreshCut(value) {
  return {
    type: types.SET_STOCK_FRESH_CUT,
    stockFlagFreshCut: value,
  }
}

function setStockExotic(value) {
  return {
    type: types.SET_STOCK_EXOTIC,
    stockFlagExotic: value,
  }
}

function setStockFruits(value) {
  return {
    type: types.SET_STOCK_FRUITS,
    stockFlagFruits: value,
  }
}

function setStockVeggies(value) {
  return {
    type: types.SET_STOCK_VEGGIES,
    stockFlagVeggies: value,
  }
}

function setSubmitOrderResp(value) {
  return {
    type: types.SET_SUBMIT_ORDER_RESP,
    submitOrderResp: value,
  }
}


function setIsLoading(value) {
  return {
    type: types.HOME_LOADING,
    homeloading: value,
  }
}

function setorderItems(value) {
  return {
    type: types.SET_ORDER_ITEMS,
    orderItems: value,
  }
}

function setOrderModal(value) {
  return {
    type: types.SET_ORDER_MODAL,
    orderModal: value,
  }
}

function finalOrder(value) {
  return {
    type: types.SET_FINAL_ORDER,
    finalOrder: value
  }
}

function setNotifications(value) {
  return {
    type: types.SET_NOTIFICATIONS,
    notifications: value
  }
}

function setOrderLoading(value) {
  return {
    type: types.ORDER_LOADING,
    orderLoading: value
  }
}
function setNotificationLoading(value) {
  return {
    type: types.NOTIFICATION_LOADING,
    notificationLoading: value
  }
}

function setPromoCode(value) {
  return {
    type: types.SET_PROMO_CODE,
    promoCode: value
  }
}

function setSubmitCartLoading(value) {
  return {
    type: types.SET_SUBMIT_CART_LOADING,
    submitCartLoading: value
  }
}

export function getOrder(params) {
  return (dispatch) => {
    dispatch(setOrderLoading(true));
    return Api.post('/getOrders.php', params).then(resp => {
      dispatch(setOrders(resp.server_data));
      dispatch(setOrderLoading(false));
    }).catch((ex) => {
      console.log(error)
    });
  }
}


export function getSlider(params) {
  return (dispatch) => {
    dispatch(setIsLoading(true));
    return Api.post('/getslider.php', params).then(resp => {
      dispatch(setSlider(resp.server_data));
      dispatch(setIsLoading(false));
    }).catch((ex) => {
      dispatch(setIsLoading(true));
      console.log(error)
    });
  }
}

export function submitOrder(params, dropdown, navigation) {
  return (dispatch) => {
    dispatch(setSubmitCartLoading(true));
    return Api.post('/submitcartnew.php', params).then(resp => {
      dispatch(setSubmitOrderResp(resp));
      if (resp.server_data == 'failed to register order') {
        dropdown.alertWithType('error', 'Error', `${resp.server_data}`);
      } else {
        dropdown.alertWithType('success', 'Success', `${resp.server_data}`);
        setTimeout(() => {
          navigation.navigate('bottomTabs')
        }, 1000)
      }
      dispatch(setSubmitCartLoading(false));
    }).catch((ex) => {
      console.log(error)
    });
  }
}

export function getOrdeItems(params) {
  return (dispatch) => {
    return Api.post('/getOrderItems.php', params).then(resp => {
      dispatch(setorderItems(resp));
      dispatch(openOrderModal(true))
    }).catch((ex) => {
      console.log(error)
    });
  }
}

export function getNotifications(params) {
  return (dispatch) => {
    dispatch(setNotificationLoading(true));
    return Api.post('/gettotalnot.php', params).then(resp => {
      dispatch(setNotifications(resp.server_data));
      dispatch(setNotificationLoading(false));
    }).catch((ex) => {
      console.log(error)
    });
  }
}

export function changeNotificationStatus(id, email) {
  return (dispatch) => {
    return Api.put('/delnot.php', { id, email }).then(resp => {
      dispatch(getNotifications({ email }));
    }).catch((ex) => {
      console.log(error)
    });
  }
}

export function getPromo(code) {
  return (dispatch) => {
    return Api.put('/validatePromo.php', code).then(resp => {
      dispatch(setPromoCode(resp.server_data));
    }).catch((ex) => {
      console.log(error)
    });
  }
}


export function openCart(value) {
  return (dispatch) => {
    dispatch(setCart(value));
  }
}

export function openOrderModal(value) {
  return (dispatch) => {
    dispatch(setOrderModal(value));
  }
}

export function openStockVeggies(value) {
  return (dispatch) => {
    dispatch(setStockVeggies(value));
  }
}

export function openStockFruits(value) {
  return (dispatch) => {
    dispatch(setStockFruits(value));
  }
}

export function openStockFreshCut(value) {
  return (dispatch) => {
    dispatch(setStockFreshCut(value));
  }
}

export function openStockExotic(value) {
  return (dispatch) => {
    dispatch(setStockExotic(value));
  }
}

export function setStockItems(value) {
  return (dispatch) => {
    dispatch(setStocks(value));
  }
}

export function setFinalOrder(value, navigation) {
  return (dispatch) => {
    dispatch(finalOrder(value));
    navigation.navigate('SubmitOrderScreen');
  }
}
