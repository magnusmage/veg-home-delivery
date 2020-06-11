import React, {Component} from 'react';
import {StyleSheet, Text, View, ImageBackground, Image, TouchableOpacity} from "react-native";

class HomeScreen extends Component {
  constructor(props) {
    super(props);
  }

  onLoginPress = () => {
    this.props.navigation.navigate('OrderScreen')
  };

  render() {
    return (
      <View style={{flex: 1}}>
        <ImageBackground source={require('../common/bg.png')} style={styles.backgroundImage}>
          <View style={styles.container}>
            <View style={{flex: 0.9}}>
              <View style={styles.logoContainer}>
                <Image source={require('../common/iconpng.png')} style={styles.imageSize} />
              </View>
            </View>
            <View style={{flex: 0.5}}>
              <View style={styles.inputContainer}>
                <TouchableOpacity onPress={this.onLoginPress}>
                  <View style={[styles.input, {backgroundColor: '#b9f442'}]}>
                    <Text style={styles.textView}>Log In</Text>
                  </View>
                </TouchableOpacity>
              </View>
            </View>
            <View style={{flex: 0.7}}>
            </View>
          </View>
        </ImageBackground>
      </View>
    );
  };
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  logoContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputContainer: {
    flex: 0.2,
    marginVertical: '4%',
    alignItems: 'center',
  },
  textView: {
    color: '#FFFFFF',
  },
  input: {
    height: 40,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#b9f442',
    alignItems: 'center',
    justifyContent: 'center',
    width: 250,
  },
  imageSize:{
    height:135,
    width:120
  },
  backgroundImage: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
});


export default HomeScreen