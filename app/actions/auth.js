import * as types from './types';
import Api from '../lib/requests/api';

function setSignupError({ error }) {
  return {
    type: types.SET_SIGNUP_ERROR,
    error,
  }
}

function setCurrentUser({ currentUser }) {
  return {
    type: types.SET_CURRENT_USER,
    currentUser,
  }
}

function setError(value) {
  return {
    type: types.SET_ERROR,
    error: value,
  }
}

function setIsAuthenticated(value) {
  return {
    type: types.SET_AUTHENTICATED,
    isAuthenticated: value,
  }
}


function signUpDetail(value) {
  console.log(value)
}

function currentUser(userDetail) {
  console.log(userDetail)
  return {
    type: types.USER_DETAIL,
    userDetail
  }
}

function forgetPasswordDetail(value) {
  return {
    type: types.FORGET_PASSWORD,
    forgetPassword: value
  }
}

function isSetLogout(value) {
  return {
    type: types.SET_LOGOUT,
    logoutFlag: value
  }
}

function resetPasswordDetail(value) {
  return {
    type: types.RESET_PASSWORD,
    resetPassword: value
  }
}

function setIsLoading(value) {
  return {
    type: types.AUTH_LOADING,
    authLoader: value
  }
}

function setIsSignUpLoading(value){
  return {
    type: types.AUTH_SIGNUP_LOADING,
    signUpLoader: value
  }
}
// export function signUp(params, navigation, dropdown) {
//   return (dispatch) => {
//     dispatch(setIsLoading(true));
//     return Api.post('/signup.php', params).then(resp => {
//       if (resp.success === false) {
//         dropdown.alertWithType('error', 'Error', `${resp.server_data}`);
//       } else if (resp.success === true) {
//         dropdown.alertWithType('success', 'Success', `${resp.server_data}`);
//         dispatch(signUpDetail(resp.serve_data))
//         dispatch(setIsLoading(false));
//         // setTimeout(()=>{
//         // navigation.navigate('LoginScreen')
//         // },1000)
//       }
//     }).catch((ex) => {
//       dropdown.alertWithType('warn', 'Warning', 'Please fill fields properly');
//       dispatch(setIsLoading(false));
//     });
//   }
// }


export function signUp(params, navigation, dropdown) {
  return (dispatch) => {
    dispatch(setIsSignUpLoading(true));
    console.log('true')
    return Api.post('/signup.php', params).then((resp) => {
      if (resp.success === false) {
        dropdown.alertWithType('error', 'Error', `${resp.server_data}`);
      } else if (resp.success === true) {
        dropdown.alertWithType('success', 'Success', `${resp.server_data}`);
        dispatch(signUpDetail(resp.serve_data))
        // setTimeout(()=>{
        // navigation.navigate('LoginScreen')
        // },1000)
      }
      dispatch(setError(null));
      console.log('false');
      dispatch(setIsSignUpLoading(false));
    }).catch((err) => {
      dispatch(setError(err.errors));
      dropdown.alertWithType('warn', 'Warning', 'Please fill fields properly');
      dispatch(setIsSignUpLoading(false));
    });
  }
}

export function login(params, navigation, dropdown) {
  return (dispatch) => {
    dispatch(setIsLoading(true));
    return Api.post('/login.php', params).then((resp) => {
      if (resp.success === false) {
        dropdown.alertWithType('error', 'Error', `Invalid Email or Password`);
      } else if (resp.success === true) {
        dropdown.alertWithType('success', 'Success', `Successfully logged In`);
        dispatch(currentUser({ currentUser: resp.server_data }));
        setTimeout(() => {
          navigation.navigate('bottomTabs')
        }, 1000)
      }
      dispatch(setError(null));
      dispatch(setIsLoading(false));
    }).catch((err) => {
      dispatch(setError(err.errors));
      dropdown.alertWithType('warn', 'Warning', 'Please fill fields properly');
      dispatch(setIsLoading(false));
    });
  }
}

export function forgetPassword(params, dropdown) {
  return dispatch => Api.post('/sendcode.php', params).then((resp) => {
    console.log("SUCCESS");
    if (resp.success === true) {
      dispatch(forgetPasswordDetail(resp.server_data));
      dropdown.alertWithType('success', 'Success', `${resp.server_data}`);
    } else if (resp.success === false) {
      dropdown.alertWithType('error', 'Error', `${resp.server_data}`);
    } else {
      dropdown.alertWithType('warn', 'Warning', `Enter valid Email`);

    }
    dispatch(setError(null));
  }).catch((err) => {
    dispatch(setError(err.errors));
    dropdown.alertWithType('warn', 'Warning', `Enter valid Email`);

  });
}

export function resetPassword(params, dropdown) {
  return dispatch => Api.post('/passwordrecover.php', params).then((resp) => {
    if (resp.success === true) {
      dispatch(resetPasswordDetail(resp.server_data));
      dispatch(setError(null));
      dropdown.alertWithType('success', 'Success', `${resp.server_data}`);
    } else if (resp.success === false) {
      dropdown.alertWithType('error', 'Error', `${resp.server_data}`);
    } else {
      dropdown.alertWithType('warn', 'Warning', `Enter valid Email`);

    }

  }).catch((err) => {
    dispatch(setError(err.errors));
  });
}


export function setLogout() {
  return (dispatch) => {
    dispatch(isSetLogout(true));
  }
}

