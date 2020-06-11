import createReducer from '../lib/createReducer';
import * as types from '../actions/types';
const initialState = {
  cartFlag: false,
  stockFlagVeggies: false,
  stockFlagSauces: false,
  stockFlagFruits: false,
  stockFlagFreshCut: false,
  orderModal: false,
  stock: []
};

export const orders = createReducer(initialState, {
  [types.SET_ORDERS](state, action) {
    return {
      ...state,
      orders: action.orders
    }
  },

  [types.SET_SLIDER](state, action) {
    return {
      ...state,
      slider: action.slider
    }
  },

  [types.SET_CART](state, action) {
    return {
      ...state,
      cartFlag: action.cartFlag
    }
  },

  [types.SET_STOCK_VEGGIES](state, action) {
    return {
      ...state,
      stockFlagVeggies: action.stockFlagVeggies
    }
  },

  [types.SET_STOCK_FRESH_CUT](state, action) {
    return {
      ...state,
      stockFlagFreshCut: action.stockFlagFreshCut
    }
  },

  [types.SET_STOCK_FRUITS](state, action) {
    return {
      ...state,
      stockFlagFruits: action.stockFlagFruits
    }
  },

  [types.SET_STOCK_EXOTIC](state, action) {
    return {
      ...state,
      stockFlagExotic: action.stockFlagExotic
    }
  },

  [types.SET_STOCKS](state, action) {
    return {
      ...state,
      stock: action.stock
    }
  },

  [types.SET_SUBMIT_ORDER_RESP](state, action) {
    return {
      ...state,
      submitOrderResp: action.submitOrderResp
    }
  },

  [types.SET_ORDER_ITEMS](state, action) {
    return {
      ...state,
      orderItems: action.orderItems
    }
  },

  [types.SET_ORDER_MODAL](state, action) {
    return {
      ...state,
      orderModal: action.orderModal
    }
  },
  [types.SET_FINAL_ORDER](state, action) {
    return {
      ...state,
      finalOrder: action.finalOrder
    }
  },
  [types.SET_NOTIFICATIONS](state, action) {
    return {
      ...state,
      notifications: action.notifications
    }
  },
  [types.HOME_LOADING](state, action) {
    return {
      ...state,
      homeloading: action.homeloading
    }
  },
  [types.ORDER_LOADING](state, action) {
    return {
      ...state,
      orderLoading: action.orderLoading
    }
  },
  [types.NOTIFICATION_LOADING](state, action) {
    return {
      ...state,
      notificationLoading: action.notificationLoading
    }
  },
  [types.SET_PROMO_CODE](state, action) {
    return {
      ...state,
      promoCode: action.promoCode
    }
  },
  [types.SET_SUBMIT_CART_LOADING](state, action) {
    return {
      ...state,
      submitCartLoading: action.submitCartLoading
    }
  },
});