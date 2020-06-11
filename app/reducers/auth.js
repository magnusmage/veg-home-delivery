import createReducer from '../lib/createReducer';
import * as types from '../actions/types';

export const auth = createReducer({}, {
  [types.SET_CURRENT_USER](state, action) {
    return {
      ...state,
      currentUser: action.currentUser
    }
  },

  [types.SET_AUTHENTICATED](state, action) {
    return {
      ...state,
      isAuthenticated: action.isAuthenticated
    }
  },

  [types.SET_LOADING](state, action) {
    return {
      ...state,
      isLoading: action.isLoading
    }
  },

  [types.SET_SIGNUP_ERROR](state, action) {
    return {
      ...state,
      SignupError: action.error
    }
  },
  [types.SET_ERROR](state, action) {
    return {
      ...state,
      error: action.error
    }
  },
  [types.USER_DETAIL](state, action) {
    return {
      ...state,
      userDetail: action.userDetail,
    };
  },
  [types.SET_FORGOT_PASSWORD_ERROR](state, action) {
    return {
      ...state,
      ForgotPasswordError: action.error
    }
  },
  [types.FORGET_PASSWORD](state, action) {
    return {
      ...state,
      ForgetPassword: action.forgetPassword
    }
  },
  [types.RESET_PASSWORD](state, action) {
    return {
      ...state,
      ForgetPassword: action.resetPassword
    }
  },
  [types.SET_LOGOUT](state, action) {
    return {
      ...state,
      logoutFlag: action.logoutFlag
    }
  },
  [types.AUTH_LOADING](state, action) {
    return {
      ...state,
      authLoader: action.authLoader
    }
  },
  [types.AUTH_SIGNUP_LOADING](state, action) {
    return {
      ...state,
      signUpLoader: action.signUpLoader
    }
  }

});