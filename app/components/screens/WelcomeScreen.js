import React, {Component} from 'react';
import {
  ImageBackground,
  StyleSheet,
  Text,
  View,
} from "react-native";


class WelcomeScreen extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={styles.container}>
        <ImageBackground style={styles.bg_image} source={require('../../common/images/splashScreen.png')}>
            <View style={{flex:1, justifyContent:'center', alignItems: 'center'}}>
              <Text style={{color:'yellow', marginTop: '40%'}}>
                Welcome you have sucessfully logged in
              </Text>
            </View>
        </ImageBackground>
      </View>
    );
  };
}

export default WelcomeScreen

const styles = StyleSheet.create({
  formContainer: {
    flex: 0.3,
    alignItems: 'center',
  },
  InnerView: {
    marginVertical: 4,
  },
  bg_image: {
    flex: 1,
    width: '100%',
    height: '100%'
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputContainer: {
    flex: 0.2,
    backgroundColor: 'yellow',
    marginVertical: '4%',
    alignItems: 'center',
  },
  input: {
    height: 40,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    width: 250,
  },
  input2: {
    height: 40,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#FFFFFF',
    backgroundColor:'#437f90',
    alignItems: 'center',
    justifyContent: 'center',
    width: 250,
  },
  input3: {
    height: 40,
    borderRadius: 4,
    borderWidth: 0.5,
    borderColor: '#FFFFFF',
    backgroundColor:'#ffd100',
    alignItems: 'center',
    justifyContent: 'center',
    width: 250,
  },
  textView: {
    color: '#FFFFFF',
  },
});