import Storage from "./storage";
import { resetPassword } from "../../actions/auth";

class Api {
  static async headers() {
    return {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    }
  }

  static setStorage(resp) {
    // Storage.storeData('currentUser', resp.login_data)
  }

  static clearStorage() {
    Storage.removeData('access-token');
    Storage.removeData('currentUser');
    Storage.storeData('isAuthenticated', false);
  }

  static setAuth(resp) {
    console.log(resp)
    if(resp.email){
    Storage.storeData('currentUser', resp);
    Storage.storeData('section',[]);
    Storage.storeData('isAuthenticated', true);
    }
  }

  static get(route) {
    return this.xhr(route, null, 'GET');
  }

  static put(route, params) {
    return this.xhr(route, params, 'PUT')
  }

  static post(route, params) {
    return this.xhr(route, params, 'POST')
  }

  static delete(route) {
    return this.xhr(route, null, 'DELETE')
  }

  static putMultiForm(route, parama) {
    return this.xhrMultiForm(route, parama, 'PUT')
  }

  static async xhr(route, params, verb) {
    // IN HOST PLACE YOUR REQUEST URL
    // const host = 'http://192.168.100.21:3000/api/v1';
    // const host = 'https://magnusmage.pk/testapp';
    const host = 'https://vbapp.magnusmage.com';
    const url = `${host}${route}`;
    let options = Object.assign({method: verb}, params ? {body: JSON.stringify(params)} : null);
    options.headers = await Api.headers();
    console.log(url, params)
    return fetch(url, options).then(resp => {
      let json = resp.json();
      if (resp.ok) {
        if (route === '/auth/sign_out') {
          this.clearStorage();
        } else {
          this.setStorage(resp)
        }
        return json
      }
      return json.then(err => {throw err});

    }).then(json => {
      if (route === '/login.php'){
        this.setAuth(json.server_data);
      }
      return json;
    });
  }
}

export default Api
