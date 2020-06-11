import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, SafeAreaView, AsyncStorage, Alert } from 'react-native';
import { Provider } from 'react-redux';
import { applyMiddleware, compose, createStore } from 'redux';
import thunkMiddleware from 'redux-thunk';
import Routes from './app/config/Routes';
import reducer from './app/reducers';
// import firebase from 'react-native-firebase';

function configureStore(initialState) {
  const enhancer = compose(
    applyMiddleware(
      thunkMiddleware,
    ),
  );
  return createStore(reducer, initialState, enhancer);
}

const store = configureStore({});

export default class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      store: store,
    }
  }


  render() {
    return (
      <Provider store={this.state.store}>
        <SafeAreaView style={{ flex: 1 }}>
          <Routes />
        </SafeAreaView>
      </Provider>
    );
  }
}